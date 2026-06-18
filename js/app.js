/**
 * 小红书图片生成器 - Vue 3 主应用
 */

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      // 编辑器
      markdownInput: '',
      // 模板选择
      selectedCoverTemplate: 'minimal-clean',
      selectedContentTemplate: 'clean-default',
      // 生成状态
      generating: false,
      images: [],
      // 水印署名
      authorName: '',
      showWatermark: true,
      // 模板列表
      coverTemplates: [],
      contentTemplates: [],
      // Turndown 服务
      turndownService: null,
      // Toast 提示
      toast: {
        show: false,
        message: '',
        type: 'success'
      },
      toastTimer: null
    };
  },

  computed: {
    charCount() {
      if (!this.markdownInput) return 0;
      return this.markdownInput.replace(/\s/g, '').length;
    }
  },

  mounted() {
    // 加载模板列表
    if (typeof XHS_TEMPLATES !== 'undefined') {
      this.coverTemplates = XHS_TEMPLATES.cover;
      this.contentTemplates = XHS_TEMPLATES.content;
    }

    // 初始化 Turndown（富文本粘贴）
    this.initTurndownService();

    // 从 localStorage 恢复
    const saved = localStorage.getItem('xhs-markdown-input');
    if (saved) {
      this.markdownInput = saved;
    }
    const savedCover = localStorage.getItem('xhs-cover-template');
    const savedContent = localStorage.getItem('xhs-content-template');
    if (savedCover) this.selectedCoverTemplate = savedCover;
    if (savedContent) this.selectedContentTemplate = savedContent;

    // 恢复水印设置
    const savedAuthor = localStorage.getItem('xhs-author-name');
    if (savedAuthor) this.authorName = savedAuthor;
    const savedWatermark = localStorage.getItem('xhs-show-watermark');
    if (savedWatermark !== null) this.showWatermark = savedWatermark === 'true';
  },

  watch: {
    markdownInput(val) {
      localStorage.setItem('xhs-markdown-input', val);
      if (!val.trim()) {
        // 内容清空：清除旧图片，不生成
        this.images = [];
        return;
      }
      // 内容变化（防抖 800ms，比设置项更宽松，避免打字中途频繁触发）
      this.scheduleRegenerate(800);
    },
    selectedCoverTemplate(val) {
      localStorage.setItem('xhs-cover-template', val);
      this.scheduleRegenerate();
    },
    selectedContentTemplate(val) {
      localStorage.setItem('xhs-content-template', val);
      this.scheduleRegenerate();
    },
    authorName(val) {
      localStorage.setItem('xhs-author-name', val);
      this.scheduleRegenerate();
    },
    showWatermark(val) {
      localStorage.setItem('xhs-show-watermark', val);
      this.scheduleRegenerate();
    }
  },

  methods: {
    // ==================== 自动重新生成 ====================

    // 防抖重新生成：输入昵称、切换模板会频繁触发，需收敛到最后一次
    scheduleRegenerate(delay = 500) {
      clearTimeout(this._regenTimer);
      this._regenTimer = setTimeout(() => this.performRegenerate(), delay);
    },

    performRegenerate() {
      // 只要左侧有内容，水印/开关/模板变化就自动生成或更新（无需先点"生成图片"）
      if (!this.markdownInput.trim()) {
        this._regenPending = false;
        return;
      }
      if (this.generating) {
        // 正在生成中：排队，等当前生成结束后再跑一次，确保用上最新值（水印/模板）
        this._regenPending = true;
        return;
      }
      this._regenPending = false;
      this.generateImages();
    },

    // ==================== 富文本粘贴 ====================

    initTurndownService() {
      if (typeof TurndownService === 'undefined') {
        console.warn('Turndown 库未加载，智能粘贴功能将不可用');
        return;
      }

      this.turndownService = new TurndownService({
        headingStyle: 'atx',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined'
      });

      // 表格支持
      this.turndownService.addRule('table', {
        filter: 'table',
        replacement: (_content, node) => {
          const rows = Array.from(node.querySelectorAll('tr'));
          if (rows.length === 0) return '';
          let markdown = '\n\n';
          let headerProcessed = false;
          rows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll('td, th'));
            const cellContents = cells.map(cell => cell.textContent.replace(/\n/g, ' ').trim());
            if (cellContents.length > 0) {
              markdown += '| ' + cellContents.join(' | ') + ' |\n';
              if (index === 0 || (!headerProcessed && row.querySelector('th'))) {
                markdown += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
                headerProcessed = true;
              }
            }
          });
          return markdown + '\n';
        }
      });
    },

    async handleSmartPaste(event) {
      const clipboardData = event.clipboardData || event.originalEvent?.clipboardData;
      if (!clipboardData) return;

      // 检查是否有图片文件
      if (clipboardData.files && clipboardData.files.length > 0) {
        const file = clipboardData.files[0];
        if (file && file.type && file.type.startsWith('image/')) {
          // 图片暂不处理，使用默认行为
          return;
        }
      }

      // 检查 items 中的图片
      const items = clipboardData.items;
      if (items) {
        for (let item of items) {
          if (item.kind === 'file' && item.type && item.type.indexOf('image') !== -1) {
            return; // 图片暂不处理
          }
        }
      }

      const htmlData = clipboardData.getData('text/html');
      const textData = clipboardData.getData('text/plain');

      // 检测 IDE 格式（VS Code 等）
      if (this.isIDEFormattedHTML(htmlData, textData) && textData && this.isMarkdown(textData)) {
        return; // 使用默认粘贴
      }

      // 处理 HTML 富文本
      if (htmlData && htmlData.trim() !== '' && this.turndownService) {
        const hasPreTag = /<pre[\s>]/.test(htmlData);
        const hasCodeTag = /<code[\s>]/.test(htmlData);
        const isMainlyCode = (hasPreTag || hasCodeTag) && !htmlData.includes('<p') && !htmlData.includes('<div');

        if (isMainlyCode) {
          return; // 代码直接粘贴
        }

        event.preventDefault();

        try {
          let markdown = this.turndownService.turndown(htmlData);
          markdown = markdown.replace(/\n{3,}/g, '\n\n');

          const textarea = event.target;
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const value = textarea.value;

          this.markdownInput = value.substring(0, start) + markdown + value.substring(end);

          this.$nextTick(() => {
            textarea.selectionStart = textarea.selectionEnd = start + markdown.length;
            textarea.focus();
          });

          this.showToast('✨ 已智能转换为 Markdown', 'success');
        } catch (error) {
          // 转换失败，插入纯文本
          event.preventDefault();
          const textarea = event.target;
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          this.markdownInput = textarea.value.substring(0, start) + textData + textarea.value.substring(end);
          this.$nextTick(() => {
            textarea.selectionStart = textarea.selectionEnd = start + textData.length;
            textarea.focus();
          });
        }
      }
    },

    isMarkdown(text) {
      if (!text) return false;
      const patterns = [
        /^#{1,6}\s+/m,
        /\*\*[^*]+\*\*/,
        /\*[^*\n]+\*/,
        /\[[^\]]+\]\([^)]+\)/,
        /^[\*\-\+]\s+/m,
        /^\d+\.\s+/m,
        /^>\s+/m,
        /`[^`]+`/,
        /```[\s\S]*?```/,
        /^---+$/m
      ];
      return patterns.filter(p => p.test(text)).length >= 2;
    },

    isIDEFormattedHTML(htmlData, textData) {
      if (!htmlData || !textData) return false;
      const ideSignatures = [
        /<meta\s+charset=['"]utf-8['"]/i,
        /style=["'][^"']*font-family:\s*['"]?(?:Consolas|Monaco|Menlo|Courier)/i,
      ];
      let matchCount = 0;
      for (const sig of ideSignatures) {
        if (sig.test(htmlData)) matchCount++;
      }
      const hasDivSpan = /<(?:div|span)[\s>]/.test(htmlData);
      const hasSemanticTags = /<(?:p|h[1-6]|strong|em|ul|ol|li|blockquote)[\s>]/i.test(htmlData);
      if (hasDivSpan && !hasSemanticTags) matchCount++;
      return matchCount >= 2;
    },

    // ==================== 生成与下载 ====================

    onInput() {
      // 内容变化时的处理
    },

    async generateImages() {
      if (!this.markdownInput.trim()) {
        this.showToast('请先输入内容', 'error');
        return;
      }
      if (typeof XHSGenerator === 'undefined') {
        this.showToast('生成器模块未加载', 'error');
        return;
      }

      this.generating = true;
      this.images = [];

      try {
        const images = await XHSGenerator.generate(
          this.markdownInput,
          this.selectedCoverTemplate,
          this.selectedContentTemplate,
          (_current, _total) => {},
          { watermark: this.showWatermark ? this.authorName.trim() : '' }
        );
        this.images = images;
        this.showToast(`成功生成 ${images.length} 张图片`, 'success');
      } catch (error) {
        console.error('生成图片失败:', error);
        this.showToast('生成失败: ' + error.message, 'error');
      } finally {
        this.generating = false;
        // 处理生成期间被触发的重新生成（拿到最新的水印/模板）
        if (this._regenPending) {
          this._regenPending = false;
          this.performRegenerate();
        }
      }
    },

    downloadImage(image, index) {
      XHSGenerator.downloadImage(image, index, this.images.length);
      this.showToast(`下载第 ${index + 1} 张图片`, 'success');
    },

    async downloadAllImages() {
      if (this.images.length === 0) {
        this.showToast('没有图片可下载', 'error');
        return;
      }
      const m = this.markdownInput.match(/^#\s+(.+)$/m);
      const title = m ? m[1].trim() : '小红书图片';
      this.showToast('正在打包为 ZIP...', 'success');
      try {
        await XHSGenerator.downloadAsZip(this.images, title);
        this.showToast('下载完成', 'success');
      } catch (error) {
        this.showToast('下载失败: ' + error.message, 'error');
      }
    },

    showToast(message, type = 'success') {
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toast = { show: true, message, type };
      this.toastTimer = setTimeout(() => {
        this.toast.show = false;
      }, 2500);
    }
  }
});

app.mount('#app');
