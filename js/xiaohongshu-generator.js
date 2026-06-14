/**
 * 小红书图片生成器 - 核心逻辑
 * 负责 Markdown 解析、分页、截图、下载
 */

const XHSGenerator = {
  // 图片尺寸常量
  WIDTH: 1080,
  HEIGHT: 1440,
  SCALE: 2,

  /**
   * 主入口：生成所有图片
   * @param {string} markdown - Markdown 原始文本
   * @param {string} coverTemplateId - 封面模板 ID
   * @param {string} contentTemplateId - 内容模板 ID
   * @param {function} onProgress - 进度回调 (current, total)
   * @returns {Promise<Array<{dataUrl: string, pageNumber: number, totalPages: number}>>}
   */
  async generate(markdown, coverTemplateId, contentTemplateId, onProgress) {
    if (!markdown || !markdown.trim()) {
      throw new Error('内容为空');
    }

    // 1. 解析 Markdown 为块级元素
    const blocks = this.parseMarkdownToBlocks(markdown);
    if (blocks.length === 0) {
      throw new Error('内容为空，无法生成图片');
    }

    // 2. 提取标题和正文
    const { title, remainingBlocks } = this.extractTitle(blocks);

    // 3. 计算文章信息
    const articleInfo = this.calculateArticleInfo(markdown, title);

    // 4. 创建离屏渲染容器
    const offscreen = this.createOffscreenContainer();
    document.body.appendChild(offscreen);

    try {
      const images = [];

      // 5. 生成封面
      const coverTemplate = XHS_TEMPLATES.cover.find(t => t.id === coverTemplateId) ||
                            XHS_TEMPLATES.cover[0];
      const coverElement = coverTemplate.render(title, articleInfo);
      offscreen.appendChild(coverElement);

      // 等待渲染
      await this.wait(200);

      const coverCanvas = await this.captureElement(coverElement);
      images.push({
        dataUrl: coverCanvas.toDataURL('image/png'),
        pageNumber: 0,
        totalPages: 0 // 后面更新
      });
      offscreen.removeChild(coverElement);

      // 6. 内容分页
      if (remainingBlocks.length > 0) {
        const pages = this.paginateContent(remainingBlocks, contentTemplateId, offscreen);

        // 7. 生成每页图片
        for (let i = 0; i < pages.length; i++) {
          const pageElement = renderContentPage(
            contentTemplateId,
            pages[i],
            i + 1,
            pages.length
          );
          offscreen.appendChild(pageElement);
          await this.wait(150);

          const canvas = await this.captureElement(pageElement);
          images.push({
            dataUrl: canvas.toDataURL('image/png'),
            pageNumber: i + 1,
            totalPages: pages.length
          });
          offscreen.removeChild(pageElement);

          if (onProgress) {
            onProgress(i + 1, pages.length);
          }
        }
      }

      // 更新总页数信息
      const totalPages = images.length;
      images.forEach(img => { img.totalPages = totalPages; });

      return images;

    } finally {
      // 清理离屏容器
      document.body.removeChild(offscreen);
    }
  },

  /**
   * 解析 Markdown 为块级结构
   * 保留 HTML 格式（粗体、斜体、代码等）
   */
  parseMarkdownToBlocks(markdown) {
    const md = window.markdownit({
      html: true,
      breaks: true,
      linkify: true
    });

    const html = md.render(markdown);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const blocks = [];
    const bodyChildren = doc.body.children;

    for (let i = 0; i < bodyChildren.length; i++) {
      const el = bodyChildren[i];

      if (el.tagName === 'H1') {
        blocks.push({ type: 'h1', html: el.innerHTML, text: el.textContent });
      } else if (el.tagName === 'H2') {
        blocks.push({ type: 'h2', html: el.innerHTML, text: el.textContent });
      } else if (el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'H5' || el.tagName === 'H6') {
        blocks.push({ type: 'h3', html: el.innerHTML, text: el.textContent });
      } else if (el.tagName === 'P') {
        if (el.textContent.trim()) {
          blocks.push({ type: 'p', html: el.innerHTML, text: el.textContent });
        }
      } else if (el.tagName === 'UL' || el.tagName === 'OL') {
        // 将列表拆分为单独的列表项
        const items = el.children;
        for (let j = 0; j < items.length; j++) {
          if (items[j].tagName === 'LI') {
            blocks.push({ type: 'li', html: items[j].innerHTML, text: items[j].textContent });
          }
        }
      } else if (el.tagName === 'BLOCKQUOTE') {
        blocks.push({ type: 'quote', html: el.innerHTML, text: el.textContent });
      } else if (el.tagName === 'PRE') {
        const codeEl = el.querySelector('code');
        const codeContent = codeEl ? codeEl.textContent : el.textContent;
        blocks.push({ type: 'code', html: escapeHtml(codeContent), text: codeContent });
      } else if (el.tagName === 'HR') {
        blocks.push({ type: 'hr' });
      } else if (el.tagName === 'TABLE') {
        // 表格转为简化文本
        blocks.push({ type: 'p', html: el.outerHTML, text: el.textContent });
      } else if (el.textContent && el.textContent.trim()) {
        blocks.push({ type: 'p', html: el.innerHTML, text: el.textContent });
      }
    }

    return blocks;
  },

  /**
   * 提取标题（第一个 H1）
   */
  extractTitle(blocks) {
    let title = '未命名文章';
    const remainingBlocks = [];

    let titleExtracted = false;
    for (const block of blocks) {
      if (!titleExtracted && block.type === 'h1') {
        title = block.text || '未命名文章';
        titleExtracted = true;
        continue;
      }
      remainingBlocks.push(block);
    }

    return { title, remainingBlocks };
  },

  /**
   * 计算文章统计信息
   */
  calculateArticleInfo(markdown, title) {
    // 去除 markdown 标记，计算纯文本字数
    const plainText = markdown
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/[-*+]\s+/gm, '')
      .replace(/>\s+/gm, '')
      .replace(/---/g, '')
      .replace(/\s+/g, '');

    const charCount = plainText.length;
    const readingTime = Math.max(1, Math.ceil(charCount / 400));

    // 统计图片数量
    const imageMatches = markdown.match(/!\[.*?\]\(.*?\)/g);
    const imageCount = imageMatches ? imageMatches.length : 0;

    return { charCount, readingTime, imageCount };
  },

  /**
   * 创建离屏渲染容器
   */
  createOffscreenContainer() {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: 1080px;
      pointer-events: none;
      z-index: -1;
    `;
    return container;
  },

  /**
   * 智能分页算法
   * @param {Array} blocks - 内容块数组
   * @param {string} templateId - 内容模板 ID
   * @param {HTMLElement} offscreen - 离屏容器
   * @returns {Array<Array<HTMLElement>>} 分页后的元素数组
   */
  paginateContent(blocks, templateId, offscreen) {
    const template = XHS_TEMPLATES.content.find(t => t.id === templateId) ||
                     XHS_TEMPLATES.content[0];

    // 计算可用内容高度（增加底部安全边距，防止最后一行被裁切）
    const topPadding = 80;
    const bottomPadding = 130;
    const safetyMargin = 20;
    const pageHeight = this.HEIGHT - topPadding - bottomPadding - safetyMargin;

    // 创建测量容器
    const measureContainer = document.createElement('div');
    measureContainer.style.cssText = `
      width: ${this.WIDTH}px;
      padding: ${template.padding};
      position: absolute;
      visibility: hidden;
    `;
    offscreen.appendChild(measureContainer);

    // 为每个 block 创建样式化元素并测量高度（含 margin）
    const elementsWithHeight = blocks.map(block => {
      const el = createStyledBlock(templateId, block);
      measureContainer.appendChild(el);
      const height = el.offsetHeight;
      const cs = window.getComputedStyle(el);
      const marginTop = parseFloat(cs.marginTop) || 0;
      const marginBottom = parseFloat(cs.marginBottom) || 0;
      const outerHeight = height + marginTop + marginBottom;
      measureContainer.removeChild(el);
      return { block, element: el, height: outerHeight, marginTop, marginBottom };
    });

    // 清理测量容器
    offscreen.removeChild(measureContainer);

    // 分页逻辑
    const pages = [];
    let currentPage = [];
    let currentHeight = 0;

    for (let i = 0; i < elementsWithHeight.length; i++) {
      const { block, element, height } = elementsWithHeight[i];
      const wouldExceed = currentHeight + height > pageHeight;

      if (wouldExceed && currentPage.length > 0) {
        // 检查是否是标题孤立问题：
        // 如果当前块是标题且下一块存在，把标题推到下一页
        const isHeading = ['h1', 'h2', 'h3'].includes(block.type);
        const isLastInPage = currentPage.length > 0;
        const hasContentAfter = i + 1 < elementsWithHeight.length &&
                                !['h1', 'h2', 'h3'].includes(elementsWithHeight[i + 1].block.type);

        // 先保存当前页
        pages.push(currentPage.map(item => item.element));
        currentPage = [];
        currentHeight = 0;
      }

      currentPage.push({ block, element, height });
      currentHeight += height;
    }

    // 最后一页
    if (currentPage.length > 0) {
      pages.push(currentPage.map(item => item.element));
    }

    return pages;
  },

  /**
   * 使用 html2canvas 截图
   */
  async captureElement(element) {
    if (typeof html2canvas === 'undefined') {
      throw new Error('html2canvas 库未加载');
    }

    // 等待字体加载完成
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(element, {
      scale: this.SCALE,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      width: this.WIDTH,
      height: this.HEIGHT,
      windowWidth: this.WIDTH,
      windowHeight: this.HEIGHT,
      logging: false
    });

    return canvas;
  },

  /**
   * 下载单张图片
   */
  downloadImage(image, index, total) {
    const link = document.createElement('a');
    link.download = index === 0
      ? `小红书-封面.png`
      : `小红书-第${index}页-共${total - 1}页.png`;
    link.href = image.dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  /**
   * 批量下载所有图片
   */
  async downloadAllImages(images) {
    for (let i = 0; i < images.length; i++) {
      this.downloadImage(images[i], i, images.length);
      // 延时避免浏览器阻止
      await this.wait(400);
    }
  },

  /**
   * 等待
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

// 转义 HTML 辅助函数（如果模板文件未加载）
if (typeof escapeHtml === 'undefined') {
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
