/**
 * 小红书图片模板定义
 * 封面模板 8 套 + 内容模板 8 套
 * 大标题 · 撑满 · 吸引眼球
 */

// 字体常量
const FONTS = {
  sans: '"Noto Sans SC", -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Noto Serif SC", Georgia, "Songti SC", "SimSun", serif',
  xiaowei: '"ZCOOL XiaoWei", "Noto Serif SC", serif',
  qingke: '"ZCOOL QingKe HuangYou", "Noto Sans SC", sans-serif',
  mashan: '"Ma Shan Zheng", cursive',
  liujian: '"Liu Jian Mao Cao", cursive',
};

// 自动计算标题字号：根据字符数自适应，让标题撑满封面
// 画布 1080px 宽，可用约 920-960px，中文字符宽度约等于字号
function calcTitleSize(title, minSize, maxSize) {
  const len = title.length;
  // 短标题：超大字
  if (len <= 6) return maxSize;
  if (len <= 10) return Math.max(minSize, maxSize - (len - 6) * 4);
  if (len <= 16) return Math.max(minSize, maxSize - 20 - (len - 10) * 3);
  if (len <= 24) return Math.max(minSize, maxSize - 44 - (len - 16) * 2);
  if (len <= 32) return Math.max(minSize, maxSize - 60 - (len - 24) * 1.5);
  return minSize;
}

const XHS_TEMPLATES = {
  // ==================== 封面模板 ====================
  cover: [
    // ---- 1. 简约白 ----
    {
      id: 'minimal-clean',
      name: '简约白',
      render(title, articleInfo) {
        const page = createBasePage('#FFFFFF');
        const fs = calcTitleSize(title, 58, 110);

        page.appendChild(createEl('div', {
          style: `position:absolute;top:0;left:0;right:0;height:120px;background:linear-gradient(180deg, #f8f8f8 0%, transparent 100%);`
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:70px;left:60px;font-size:15px;font-weight:700;color:#FF2442;letter-spacing:3px;font-family:${FONTS.sans};`
        }, '📕 小红书'));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:190px;left:60px;width:60px;height:6px;background:#FF2442;border-radius:3px;`
        }));

        // 标题 - 撑满
        page.appendChild(createEl('div', {
          style: `position:absolute;top:230px;left:60px;right:60px;font-size:${fs}px;font-weight:900;color:#111;line-height:1.15;word-break:break-word;font-family:${FONTS.serif};letter-spacing:1px;`
        }, title));

        page.appendChild(buildStatsBar(articleInfo, {
          position: 'absolute', bottom: '100px', left: '80px',
          valueColor: '#FF2442', labelColor: '#aaa'
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:80px;left:80px;right:80px;height:1px;background:#eee;`
        }));

        return page;
      }
    },

    // ---- 2. 渐变醒目 ----
    {
      id: 'gradient-bold',
      name: '渐变醒目',
      render(title, articleInfo) {
        const page = createBasePage('linear-gradient(145deg, #FF416C 0%, #FF4B2B 40%, #FF8C42 100%)');
        const fs = calcTitleSize(title, 56, 100);

        page.appendChild(createEl('div', {
          style: `position:absolute;top:-120px;right:-100px;width:420px;height:420px;border-radius:50%;background:rgba(255,255,255,0.1);`
        }));
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:-80px;left:-80px;width:320px;height:320px;border-radius:50%;background:rgba(255,255,255,0.08);`
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:60px;left:70px;font-size:13px;color:rgba(255,255,255,0.6);letter-spacing:4px;font-weight:600;font-family:${FONTS.sans};`
        }, 'XIAOHONGSHU'));

        // 标题
        const titleWrap = createEl('div', {
          style: `position:absolute;top:50%;left:70px;right:70px;transform:translateY(-55%);`
        });
        titleWrap.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;color:#fff;line-height:1.15;word-break:break-word;text-shadow:0 3px 12px rgba(0,0,0,0.15);font-family:${FONTS.sans};letter-spacing:1px;`
        }, title));
        page.appendChild(titleWrap);

        page.appendChild(buildStatsBar(articleInfo, {
          position: 'absolute', bottom: '90px', left: '70px',
          valueColor: '#fff', labelColor: 'rgba(255,255,255,0.7)'
        }));

        return page;
      }
    },

    // ---- 3. 暗黑高级 ----
    {
      id: 'dark-premium',
      name: '暗黑高级',
      render(title, articleInfo) {
        const page = createBasePage('linear-gradient(170deg, #0c0c1d 0%, #1a1a2e 40%, #0f3460 100%)');
        const fs = calcTitleSize(title, 56, 100);

        page.appendChild(createEl('div', {
          style: `position:absolute;top:0;left:0;right:0;bottom:0;background-image:linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);background-size:80px 80px;`
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:20%;left:50%;transform:translate(-50%,-30%);width:500px;height:500px;border-radius:50%;background:radial-gradient(circle, rgba(255,184,0,0.12) 0%, transparent 60%);`
        }));

        const topBar = createEl('div', {
          style: `position:absolute;top:60px;left:80px;display:flex;align-items:center;gap:12px;`
        });
        topBar.appendChild(createEl('div', { style: 'width:8px;height:8px;border-radius:50%;background:#FFB800;' }));
        topBar.appendChild(createEl('div', {
          style: `font-size:12px;color:rgba(255,184,0,0.6);letter-spacing:4px;font-weight:600;font-family:${FONTS.sans};`
        }, 'PREMIUM'));
        page.appendChild(topBar);

        page.appendChild(createEl('div', {
          style: `position:absolute;top:180px;left:80px;width:50px;height:3px;background:linear-gradient(90deg, #FFB800, #FF6B35);border-radius:2px;`
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:210px;left:60px;right:60px;font-size:${fs}px;font-weight:900;color:#fff;line-height:1.15;word-break:break-word;font-family:${FONTS.serif};letter-spacing:1px;`
        }, title));

        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:200px;left:80px;right:80px;height:1px;background:linear-gradient(90deg, transparent, rgba(255,184,0,0.25), transparent);`
        }));

        const statsBar = createEl('div', {
          style: `position:absolute;bottom:110px;left:80px;right:80px;display:flex;gap:12px;justify-content:center;`
        });
        [
          { label: '字数', value: articleInfo.charCount },
          { label: '阅读', value: articleInfo.readingTime + 'min' },
          { label: '图片', value: articleInfo.imageCount + '张' }
        ].forEach(item => {
          const badge = createEl('div', {
            style: 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,184,0,0.15);border-radius:20px;padding:8px 20px;display:flex;align-items:center;gap:8px;'
          });
          badge.appendChild(createEl('span', { style: 'font-size:16px;font-weight:600;color:#FFB800;' }, String(item.value)));
          badge.appendChild(createEl('span', { style: 'font-size:11px;color:rgba(255,255,255,0.5);' }, item.label));
          statsBar.appendChild(badge);
        });
        page.appendChild(statsBar);

        return page;
      }
    },

    // ---- 4. 卡片杂志 ----
    {
      id: 'card-magazine',
      name: '卡片杂志',
      render(title, articleInfo) {
        const page = createBasePage('#EDE8E0');
        const fs = calcTitleSize(title, 52, 90);

        const card = createEl('div', {
          style: `position:absolute;top:80px;left:70px;right:70px;bottom:80px;background:#fff;border-radius:24px;box-shadow:0 24px 80px rgba(0,0,0,0.07);overflow:hidden;display:flex;flex-direction:column;`
        });

        card.appendChild(createEl('div', {
          style: 'height:10px;background:linear-gradient(90deg, #FF2442, #FF6B6B, #FFA726);flex-shrink:0;'
        }));

        const content = createEl('div', {
          style: 'flex:1;padding:40px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;'
        });

        content.appendChild(createEl('div', {
          style: `font-size:80px;color:#FF2442;opacity:0.12;font-family:Georgia,serif;line-height:1;margin-bottom:8px;`
        }, '"'));

        content.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;color:#1a1a1a;line-height:1.15;word-break:break-word;margin-bottom:36px;font-family:${FONTS.serif};letter-spacing:0.5px;`
        }, title));

        content.appendChild(createEl('div', {
          style: 'width:40px;height:3px;background:#FF2442;border-radius:2px;margin-bottom:30px;'
        }));

        const statsRow = createEl('div', { style: 'display:flex;gap:36px;justify-content:center;' });
        [
          { label: '字数', value: articleInfo.charCount },
          { label: '阅读', value: articleInfo.readingTime + '分钟' },
          { label: '图片', value: articleInfo.imageCount + '张' }
        ].forEach(item => {
          const stat = createEl('div', { style: 'text-align:center;' });
          stat.appendChild(createEl('div', { style: 'font-size:20px;font-weight:700;color:#FF2442;' }, String(item.value)));
          stat.appendChild(createEl('div', { style: 'font-size:11px;color:#aaa;margin-top:2px;' }, item.label));
          statsRow.appendChild(stat);
        });
        content.appendChild(statsRow);
        card.appendChild(content);
        page.appendChild(card);

        return page;
      }
    },

    // ---- 5. Claude 暖橙 ----
    {
      id: 'claude-warm',
      name: 'Claude 暖橙',
      render(title, articleInfo) {
        const page = createBasePage('#FAF7F2');
        const fs = calcTitleSize(title, 56, 100);

        page.appendChild(createEl('div', {
          style: `position:absolute;top:0;right:0;width:600px;height:600px;background:radial-gradient(circle, rgba(193,95,60,0.06) 0%, transparent 60%);`
        }));
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:0;left:0;width:500px;height:500px;background:radial-gradient(circle, rgba(232,168,124,0.06) 0%, transparent 60%);`
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:0;left:0;right:0;height:8px;background:linear-gradient(90deg, #C15F3C, #E8A87C);`
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:80px;left:80px;font-size:12px;color:#C15F3C;letter-spacing:4px;font-weight:600;font-family:${FONTS.sans};`
        }, '✦ NOTES'));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:130px;left:80px;right:80px;height:4px;background:linear-gradient(90deg, #C15F3C, #E8A87C, transparent);border-radius:2px;`
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:180px;left:60px;right:60px;font-size:${fs}px;font-weight:700;color:#2C1810;line-height:1.15;word-break:break-word;font-family:${FONTS.serif};letter-spacing:0.5px;`
        }, title));

        page.appendChild(buildStatsBar(articleInfo, {
          position: 'absolute', bottom: '100px', left: '80px',
          valueColor: '#C15F3C', labelColor: '#b5a08a'
        }));

        return page;
      }
    },

    // ---- 6. 金融时报 ----
    {
      id: 'ft-elegant',
      name: '金融时报',
      render(title, articleInfo) {
        const page = createBasePage('#FFF8EE');
        const fs = calcTitleSize(title, 50, 90);

        page.appendChild(createEl('div', {
          style: `position:absolute;top:0;left:0;right:0;height:6px;background:#990F3D;`
        }));

        page.appendChild(createEl('div', { style: 'position:absolute;top:60px;left:60px;right:60px;bottom:60px;border:2px solid #990F3D;' }));
        page.appendChild(createEl('div', { style: 'position:absolute;top:68px;left:68px;right:68px;bottom:68px;border:1px solid rgba(153,15,61,0.2);' }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:160px;left:300px;right:300px;height:1px;background:#990F3D;`
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:190px;left:90px;right:90px;font-size:${fs}px;font-weight:700;color:#33302E;line-height:1.15;word-break:break-word;text-align:center;font-family:${FONTS.serif};`
        }, title));

        const statsBar = createEl('div', {
          style: `position:absolute;bottom:120px;left:100px;right:100px;display:flex;justify-content:center;gap:50px;`
        });
        [
          { label: '字数', value: articleInfo.charCount },
          { label: '阅读', value: articleInfo.readingTime + '分钟' },
          { label: '图片', value: articleInfo.imageCount + '张' }
        ].forEach(item => {
          const stat = createEl('div', { style: 'text-align:center;' });
          stat.appendChild(createEl('div', { style: 'font-size:20px;font-weight:700;color:#990F3D;' }, String(item.value)));
          stat.appendChild(createEl('div', { style: 'font-size:11px;color:#8a7a6a;margin-top:2px;font-family:Georgia,serif;' }, item.label));
          statsBar.appendChild(stat);
        });
        page.appendChild(statsBar);

        return page;
      }
    },

    // ---- 7. 高迪·彩虹 ----
    {
      id: 'gaudi-rainbow',
      name: '高迪·彩虹',
      render(title, articleInfo) {
        const page = createBasePage('#FEFEFE');
        const fs = calcTitleSize(title, 54, 95);

        page.appendChild(createEl('div', {
          style: `position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg, rgba(255,107,107,0.06) 0%, rgba(255,217,61,0.06) 25%, rgba(107,207,127,0.06) 50%, rgba(78,205,196,0.06) 75%, rgba(91,134,229,0.06) 100%);`
        }));

        page.appendChild(createEl('div', { style: 'position:absolute;top:-80px;right:-80px;width:350px;height:350px;border-radius:50%;background:linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,217,61,0.2));' }));
        page.appendChild(createEl('div', { style: 'position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:linear-gradient(135deg, rgba(78,205,196,0.2), rgba(91,134,229,0.2));' }));

        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;height:8px;background:linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #5b86e5, #a55eea);'
        }));

        const card = createEl('div', {
          style: `position:absolute;top:50%;left:70px;right:70px;transform:translateY(-55%);background:rgba(255,255,255,0.75);backdrop-filter:blur(16px);border-radius:24px;padding:50px;box-shadow:0 8px 40px rgba(0,0,0,0.04);`
        });

        card.appendChild(createEl('div', {
          style: 'width:50px;height:4px;background:linear-gradient(90deg, #ff6b6b, #a55eea);border-radius:2px;margin-bottom:30px;'
        }));

        card.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;background:linear-gradient(135deg, #ff6b6b, #a55eea);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.15;word-break:break-word;font-family:${FONTS.sans};`
        }, title));
        page.appendChild(card);

        page.appendChild(buildStatsBar(articleInfo, {
          position: 'absolute', bottom: '90px', left: '70px',
          valueColor: '#5b86e5', labelColor: '#aaa'
        }));

        return page;
      }
    },

    // ---- 8. 书法雅韵 ----
    {
      id: 'calligraphy',
      name: '书法雅韵',
      render(title, articleInfo) {
        const page = createBasePage('#F7F3EB');
        const fs = calcTitleSize(title, 60, 110);

        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 20% 20%, rgba(0,0,0,0.02) 0%, transparent 50%);'
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:70px;right:80px;width:50px;height:50px;border:2px solid #C0392B;color:#C0392B;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;font-family:${FONTS.mashan};border-radius:4px;transform:rotate(-5deg);`
        }, '文'));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:120px;left:80px;width:2px;height:80px;background:linear-gradient(180deg, #8B4513, transparent);`
        }));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:240px;left:60px;right:60px;font-size:${fs}px;font-weight:400;color:#2C1810;line-height:1.2;word-break:break-word;font-family:${FONTS.xiaowei};letter-spacing:2px;`
        }, title));

        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:200px;left:80px;right:80px;height:1px;background:linear-gradient(90deg, transparent, rgba(0,0,0,0.15), transparent);`
        }));

        page.appendChild(buildStatsBar(articleInfo, {
          position: 'absolute', bottom: '100px', left: '80px',
          valueColor: '#8B4513', labelColor: '#b5a08a'
        }));

        return page;
      }
    }
  ],

  // ==================== 内容模板 ====================
  content: [
    {
      id: 'clean-default', name: '清新',
      colors: { bg: '#FFFFFF', text: '#333', heading: '#111', accent: '#FF2442', quoteBg: '#FFF5F5', quoteBorder: '#FF2442', codeBg: '#F5F5F7', codeText: '#E01F3B' },
      padding: '80px 70px 100px 70px',
      fontSizes: { h1: 38, h2: 32, h3: 27, p: 26, li: 26, quote: 24, code: 20 },
      lineHeight: 1.85, fontFamily: FONTS.sans, headingStyle: 'left-border'
    },
    {
      id: 'warm-paper', name: '暖纸',
      colors: { bg: '#FDF8F0', text: '#4A3728', heading: '#2C1810', accent: '#D4764E', quoteBg: '#F5EDE3', quoteBorder: '#D4764E', codeBg: '#F5EDE3', codeText: '#8B5E3C' },
      padding: '80px 70px 100px 70px',
      fontSizes: { h1: 38, h2: 32, h3: 27, p: 26, li: 26, quote: 24, code: 20 },
      lineHeight: 1.85, fontFamily: FONTS.serif, headingStyle: 'left-border'
    },
    {
      id: 'dark-pro', name: '暗黑',
      colors: { bg: '#1A1A2E', text: '#C8C8D0', heading: '#FFFFFF', accent: '#FFB800', quoteBg: 'rgba(255,255,255,0.04)', quoteBorder: '#FFB800', codeBg: 'rgba(255,255,255,0.06)', codeText: '#FFB800' },
      padding: '80px 70px 100px 70px',
      fontSizes: { h1: 38, h2: 32, h3: 27, p: 26, li: 26, quote: 24, code: 20 },
      lineHeight: 1.85, fontFamily: FONTS.sans, headingStyle: 'left-border'
    },
    {
      id: 'claude-warm', name: 'Claude 橙',
      colors: { bg: '#FAF7F2', text: '#3d3d3d', heading: '#1a1a1a', accent: '#C15F3C', quoteBg: 'rgba(193,95,60,0.05)', quoteBorder: '#C15F3C', codeBg: '#F0EEEC', codeText: '#C15F3C' },
      padding: '80px 70px 100px 70px',
      fontSizes: { h1: 38, h2: 32, h3: 27, p: 26, li: 26, quote: 24, code: 20 },
      lineHeight: 1.85, fontFamily: FONTS.serif, headingStyle: 'gradient'
    },
    {
      id: 'ft-elegant', name: '金融时报',
      colors: { bg: '#FFF8EE', text: '#33302E', heading: '#33302E', accent: '#990F3D', quoteBg: 'rgba(153,15,61,0.04)', quoteBorder: '#990F3D', codeBg: '#F0E6D8', codeText: '#990F3D' },
      padding: '80px 70px 100px 70px',
      fontSizes: { h1: 36, h2: 30, h3: 26, p: 24, li: 24, quote: 22, code: 20 },
      lineHeight: 1.85, fontFamily: FONTS.serif, headingStyle: 'bottom-border'
    },
    {
      id: 'latepost-red', name: '晚点红',
      colors: { bg: '#FFFFFF', text: '#333', heading: '#1a1a1a', accent: '#d32f2f', quoteBg: '#FFF5F5', quoteBorder: '#d32f2f', codeBg: '#f5f5f5', codeText: '#d32f2f' },
      padding: '80px 70px 100px 70px',
      fontSizes: { h1: 38, h2: 32, h3: 27, p: 26, li: 26, quote: 24, code: 20 },
      lineHeight: 1.85, fontFamily: FONTS.sans, headingStyle: 'bg-highlight'
    },
    {
      id: 'gaudi-colorful', name: '高迪·彩色',
      colors: { bg: '#FEFEFE', text: '#444', heading: '#1a1a1a', accent: '#5b86e5', quoteBg: 'rgba(78,205,196,0.06)', quoteBorder: '#4ecdc4', codeBg: '#f0f0f0', codeText: '#5b86e5' },
      padding: '80px 70px 100px 70px',
      fontSizes: { h1: 38, h2: 32, h3: 27, p: 26, li: 26, quote: 24, code: 20 },
      lineHeight: 1.85, fontFamily: FONTS.sans, headingStyle: 'gradient-rainbow'
    },
    {
      id: 'calligraphy', name: '书法',
      colors: { bg: '#F7F3EB', text: '#4A3728', heading: '#2C1810', accent: '#8B4513', quoteBg: '#EDE8DC', quoteBorder: '#8B4513', codeBg: '#EDE8DC', codeText: '#8B5E3C' },
      padding: '80px 70px 100px 70px',
      fontSizes: { h1: 38, h2: 32, h3: 27, p: 26, li: 26, quote: 24, code: 20 },
      lineHeight: 1.9, fontFamily: FONTS.xiaowei, headingStyle: 'left-border'
    }
  ]
};

// ==================== 辅助函数 ====================

function createBasePage(background) {
  const page = document.createElement('div');
  page.style.cssText = `
    width: 1080px;
    height: 1440px;
    position: relative;
    overflow: hidden;
    font-family: ${FONTS.sans};
    background: ${background};
  `;
  return page;
}

function createEl(tag, opts, textContent) {
  const el = document.createElement(tag);
  if (opts && opts.style) el.style.cssText = opts.style;
  if (textContent !== undefined) el.textContent = textContent;
  return el;
}

function buildStatsBar(articleInfo, opts) {
  const bar = createEl('div', {
    style: `position:${opts.position || 'relative'};bottom:${opts.bottom || 'auto'};left:${opts.left || 'auto'};display:flex;gap:40px;`
  });
  [
    { label: '字数', value: articleInfo.charCount },
    { label: '阅读', value: articleInfo.readingTime + '分钟' },
    { label: '图片', value: articleInfo.imageCount + '张' }
  ].forEach(item => {
    const stat = createEl('div', { style: 'text-align:center;' });
    stat.appendChild(createEl('div', {
      style: `font-size:24px;font-weight:700;color:${opts.valueColor || '#FF2442'};margin-bottom:4px;`
    }, String(item.value)));
    stat.appendChild(createEl('div', {
      style: `font-size:12px;color:${opts.labelColor || '#aaa'};`
    }, item.label));
    bar.appendChild(stat);
  });
  return bar;
}

function renderContentPage(templateId, contentElements, pageNum, totalPages) {
  const template = XHS_TEMPLATES.content.find(t => t.id === templateId) || XHS_TEMPLATES.content[0];
  const { colors, padding } = template;
  const page = createBasePage(colors.bg);

  const contentArea = createEl('div', {
    style: `position:absolute;top:0;left:0;right:0;bottom:0;padding:${padding};overflow:hidden;`
  });
  contentElements.forEach(el => contentArea.appendChild(el));
  page.appendChild(contentArea);

  page.appendChild(createEl('div', {
    style: `position:absolute;bottom:36px;right:70px;font-size:18px;color:${colors.text};opacity:0.3;font-weight:500;`
  }, `${pageNum} / ${totalPages}`));

  return page;
}

function createStyledBlock(templateId, block) {
  const template = XHS_TEMPLATES.content.find(t => t.id === templateId) || XHS_TEMPLATES.content[0];
  const { colors, fontSizes, lineHeight, headingStyle, fontFamily } = template;
  const ff = fontFamily || FONTS.sans;

  const el = document.createElement('div');

  const processHtml = (html) => {
    if (!html) return '';
    return html
      .replace(/<strong>(.*?)<\/strong>/g, `<span style="font-weight:700;color:${colors.accent};">$1</span>`)
      .replace(/<b>(.*?)<\/b>/g, `<span style="font-weight:700;color:${colors.accent};">$1</span>`)
      .replace(/<em>(.*?)<\/em>/g, `<span style="font-style:italic;">$1</span>`)
      .replace(/<code>(.*?)<\/code>/g, `<span style="font-family:"SF Mono",Monaco,Consolas,monospace;font-size:0.88em;padding:2px 6px;background:${colors.codeBg};color:${colors.codeText};border-radius:4px;">$1</span>`)
      .replace(/<a\s[^>]*>(.*?)<\/a>/g, `<span style="color:${colors.accent};text-decoration:underline;">$1</span>`);
  };

  switch (block.type) {
    case 'h1': {
      el.innerHTML = processHtml(block.html || escapeHtml(block.text));
      if (headingStyle === 'gradient') {
        el.style.cssText = `font-size:${fontSizes.h1}px;font-weight:700;color:${colors.heading};margin:32px 0 18px;line-height:1.35;padding-left:20px;border-left:5px solid ${colors.accent};font-family:${ff};`;
      } else if (headingStyle === 'bottom-border') {
        el.style.cssText = `font-size:${fontSizes.h1}px;font-weight:700;color:${colors.heading};margin:32px 0 18px;line-height:1.35;padding-bottom:10px;border-bottom:2px solid ${colors.accent};font-family:${ff};`;
      } else if (headingStyle === 'bg-highlight') {
        el.style.cssText = `font-size:${fontSizes.h1}px;font-weight:800;color:#fff;margin:32px 0 18px;line-height:1.35;padding:10px 18px;background:${colors.accent};border-radius:6px;font-family:${ff};`;
      } else if (headingStyle === 'gradient-rainbow') {
        el.style.cssText = `font-size:${fontSizes.h1}px;font-weight:800;background:linear-gradient(135deg, #ff6b6b, #a55eea);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:32px 0 18px;line-height:1.35;font-family:${ff};`;
      } else {
        el.style.cssText = `font-size:${fontSizes.h1}px;font-weight:800;color:${colors.heading};margin:32px 0 18px;line-height:1.35;padding-left:20px;border-left:5px solid ${colors.accent};font-family:${ff};`;
      }
      break;
    }
    case 'h2': {
      el.innerHTML = processHtml(block.html || escapeHtml(block.text));
      if (headingStyle === 'bg-highlight') {
        el.style.cssText = `font-size:${fontSizes.h2}px;font-weight:700;color:${colors.accent};margin:26px 0 14px;line-height:1.35;padding:6px 14px;background:${colors.accent}12;border-radius:4px;font-family:${ff};`;
      } else if (headingStyle === 'gradient-rainbow') {
        el.style.cssText = `font-size:${fontSizes.h2}px;font-weight:700;background:linear-gradient(135deg, #4ecdc4, #5b86e5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:26px 0 14px;line-height:1.35;font-family:${ff};`;
      } else if (headingStyle === 'bottom-border') {
        el.style.cssText = `font-size:${fontSizes.h2}px;font-weight:700;color:${colors.heading};margin:26px 0 14px;line-height:1.35;padding-bottom:6px;border-bottom:1px solid ${colors.accent}33;font-family:${ff};`;
      } else {
        el.style.cssText = `font-size:${fontSizes.h2}px;font-weight:700;color:${colors.heading};margin:26px 0 14px;line-height:1.35;padding-left:16px;border-left:4px solid ${colors.accent};font-family:${ff};`;
      }
      break;
    }
    case 'h3': {
      el.innerHTML = processHtml(block.html || escapeHtml(block.text));
      el.style.cssText = `font-size:${fontSizes.h3}px;font-weight:700;color:${colors.heading};margin:22px 0 10px;line-height:1.35;font-family:${ff};`;
      break;
    }
    case 'p': {
      el.innerHTML = processHtml(block.html || escapeHtml(block.text));
      el.style.cssText = `font-size:${fontSizes.p}px;color:${colors.text};margin:12px 0;line-height:${lineHeight};font-family:${ff};word-break:break-word;`;
      break;
    }
    case 'li': {
      el.innerHTML = processHtml(block.html || escapeHtml(block.text));
      el.style.cssText = `font-size:${fontSizes.li}px;color:${colors.text};margin:6px 0;padding-left:26px;line-height:${lineHeight};position:relative;font-family:${ff};word-break:break-word;`;
      const bullet = createEl('span', {
        style: `position:absolute;left:0;top:0;color:${colors.accent};font-weight:bold;font-size:${fontSizes.li}px;`
      }, '•');
      el.insertBefore(bullet, el.firstChild);
      break;
    }
    case 'quote': {
      el.innerHTML = processHtml(block.html || escapeHtml(block.text));
      el.style.cssText = `font-size:${fontSizes.quote}px;color:${colors.text};margin:14px 0;padding:14px 22px;line-height:${lineHeight};border-left:4px solid ${colors.quoteBorder};background:${colors.quoteBg};border-radius:0 10px 10px 0;font-family:${ff};word-break:break-word;`;
      break;
    }
    case 'code': {
      el.innerHTML = escapeHtml(block.text || '');
      el.style.cssText = `font-size:${fontSizes.code}px;font-family:"SF Mono",Monaco,"Cascadia Code",Consolas,monospace;color:${colors.codeText};margin:12px 0;padding:18px 22px;background:${colors.codeBg};border-radius:10px;line-height:1.6;white-space:pre-wrap;word-break:break-word;`;
      break;
    }
    case 'hr': {
      el.style.cssText = `height:1px;background:${colors.accent}22;margin:22px 0;border:none;`;
      break;
    }
    default: {
      el.innerHTML = processHtml(block.html || escapeHtml(block.text || ''));
      el.style.cssText = `font-size:${fontSizes.p}px;color:${colors.text};margin:12px 0;line-height:${lineHeight};font-family:${ff};word-break:break-word;`;
    }
  }

  return el;
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
