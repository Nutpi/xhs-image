/**
 * 小红书图片模板定义
 * 封面模板 8 套 + 内容模板 8 套
 * 大标题 · 垂直居中 · 填满封面
 */

const FONTS = {
  sans: '"Noto Sans SC", -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Noto Serif SC", Georgia, "Songti SC", "SimSun", serif',
  xiaowei: '"ZCOOL XiaoWei", "Noto Serif SC", serif',
  qingke: '"ZCOOL QingKe HuangYou", "Noto Sans SC", sans-serif',
  mashan: '"Ma Shan Zheng", cursive',
  liujian: '"Liu Jian Mao Cao", cursive',
};

/**
 * 根据标题字数计算字号
 * 画布 1080×1440，标题区约 920px 宽
 * 中文字符宽度 ≈ 字号，每行能放 920/字号 个字
 */
function calcTitleSize(title) {
  const len = title.length;
  if (len <= 4)  return 120;
  if (len <= 6)  return 105;
  if (len <= 8)  return 95;
  if (len <= 10) return 88;
  if (len <= 14) return 78;
  if (len <= 18) return 70;
  if (len <= 22) return 64;
  if (len <= 28) return 58;
  if (len <= 35) return 52;
  return 46;
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
        const fs = calcTitleSize(title);

        // 顶部淡色渐变
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;height:100px;background:linear-gradient(180deg, #f5f5f5 0%, transparent 100%);'
        }));

        // 小红书标记
        page.appendChild(createEl('div', {
          style: `position:absolute;top:60px;left:60px;font-size:14px;font-weight:700;color:#FF2442;letter-spacing:3px;font-family:${FONTS.sans};`
        }, '📕 小红书'));

        // ===== 垂直居中的标题块 =====
        const block = createEl('div', {
          style: `position:absolute;top:50%;left:60px;right:60px;transform:translateY(-55%);display:flex;flex-direction:column;`
        });

        // 红色装饰线
        block.appendChild(createEl('div', {
          style: 'width:60px;height:6px;background:#FF2442;border-radius:3px;margin-bottom:30px;'
        }));

        // 标题
        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;color:#111;line-height:1.15;word-break:break-word;font-family:${FONTS.serif};letter-spacing:1px;`
        }, title));

        // 统计 - 紧跟标题下方，有间距
        block.appendChild(createEl('div', {
          style: 'margin-top:40px;display:flex;gap:40px;'
        }));
        const statsContainer = createEl('div', { style: 'margin-top:40px;display:flex;gap:40px;' });
        statsContainer.appendChild(makeStatItem(String(articleInfo.charCount), '字数', '#FF2442'));
        statsContainer.appendChild(makeStatItem(articleInfo.readingTime + '分钟', '阅读', '#FF2442'));
        statsContainer.appendChild(makeStatItem(articleInfo.imageCount + '张', '图片', '#FF2442'));
        block.appendChild(statsContainer);

        page.appendChild(block);
        return page;
      }
    },

    // ---- 2. 渐变醒目 ----
    {
      id: 'gradient-bold',
      name: '渐变醒目',
      render(title, articleInfo) {
        const page = createBasePage('linear-gradient(145deg, #FF416C 0%, #FF4B2B 40%, #FF8C42 100%)');
        const fs = calcTitleSize(title);

        // 装饰圆
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:-120px;right:-100px;width:420px;height:420px;border-radius:50%;background:rgba(255,255,255,0.1);'
        }));
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:-80px;left:-80px;width:320px;height:320px;border-radius:50%;background:rgba(255,255,255,0.08);'
        }));

        // 标记
        page.appendChild(createEl('div', {
          style: `position:absolute;top:60px;left:60px;font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:4px;font-weight:600;font-family:${FONTS.sans};`
        }, 'XIAOHONGSHU'));

        // 垂直居中标题块
        const block = createEl('div', {
          style: 'position:absolute;top:50%;left:60px;right:60px;transform:translateY(-50%);'
        });
        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;color:#fff;line-height:1.15;word-break:break-word;text-shadow:0 3px 12px rgba(0,0,0,0.15);font-family:${FONTS.sans};letter-spacing:1px;`
        }, title));

        const statsContainer = createEl('div', { style: 'margin-top:40px;display:flex;gap:40px;' });
        statsContainer.appendChild(makeStatItem(String(articleInfo.charCount), '字数', '#fff'));
        statsContainer.appendChild(makeStatItem(articleInfo.readingTime + '分钟', '阅读', '#fff'));
        statsContainer.appendChild(makeStatItem(articleInfo.imageCount + '张', '图片', '#fff'));
        block.appendChild(statsContainer);
        page.appendChild(block);
        return page;
      }
    },

    // ---- 3. 暗黑高级 ----
    {
      id: 'dark-premium',
      name: '暗黑高级',
      render(title, articleInfo) {
        const page = createBasePage('linear-gradient(170deg, #0c0c1d 0%, #1a1a2e 40%, #0f3460 100%)');
        const fs = calcTitleSize(title);

        // 网格纹理
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;bottom:0;background-image:linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);background-size:80px 80px;'
        }));

        // 金色光晕
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:30%;left:50%;transform:translate(-50%,-30%);width:500px;height:500px;border-radius:50%;background:radial-gradient(circle, rgba(255,184,0,0.12) 0%, transparent 60%);'
        }));

        // 标记
        const topBar = createEl('div', { style: 'position:absolute;top:60px;left:60px;display:flex;align-items:center;gap:10px;' });
        topBar.appendChild(createEl('div', { style: 'width:8px;height:8px;border-radius:50%;background:#FFB800;' }));
        topBar.appendChild(createEl('div', { style: `font-size:11px;color:rgba(255,184,0,0.5);letter-spacing:4px;font-weight:600;font-family:${FONTS.sans};` }, 'PREMIUM'));
        page.appendChild(topBar);

        // 垂直居中标题块
        const block = createEl('div', {
          style: 'position:absolute;top:50%;left:60px;right:60px;transform:translateY(-50%);'
        });

        // 金色短线
        block.appendChild(createEl('div', {
          style: 'width:50px;height:3px;background:linear-gradient(90deg, #FFB800, #FF6B35);border-radius:2px;margin-bottom:28px;'
        }));

        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;color:#fff;line-height:1.15;word-break:break-word;font-family:${FONTS.serif};letter-spacing:1px;`
        }, title));

        // 底部统计徽章
        const statsContainer = createEl('div', { style: 'margin-top:36px;display:flex;gap:10px;justify-content:center;' });
        [
          { label: '字数', value: articleInfo.charCount },
          { label: '阅读', value: articleInfo.readingTime + 'min' },
          { label: '图片', value: articleInfo.imageCount + '张' }
        ].forEach(item => {
          const badge = createEl('div', {
            style: 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,184,0,0.15);border-radius:20px;padding:8px 18px;display:flex;align-items:center;gap:8px;'
          });
          badge.appendChild(createEl('span', { style: 'font-size:15px;font-weight:600;color:#FFB800;' }, String(item.value)));
          badge.appendChild(createEl('span', { style: 'font-size:11px;color:rgba(255,255,255,0.5);' }, item.label));
          statsContainer.appendChild(badge);
        });
        block.appendChild(statsContainer);
        page.appendChild(block);
        return page;
      }
    },

    // ---- 4. 卡片杂志 ----
    {
      id: 'card-magazine',
      name: '卡片杂志',
      render(title, articleInfo) {
        const page = createBasePage('#EDE8E0');
        const fs = calcTitleSize(title);
        // 卡片内字体稍小一点
        const cardFs = Math.max(46, fs - 10);

        const card = createEl('div', {
          style: 'position:absolute;top:80px;left:60px;right:60px;bottom:80px;background:#fff;border-radius:24px;box-shadow:0 24px 80px rgba(0,0,0,0.07);overflow:hidden;display:flex;flex-direction:column;'
        });

        // 顶部彩条
        card.appendChild(createEl('div', {
          style: 'height:10px;background:linear-gradient(90deg, #FF2442, #FF6B6B, #FFA726);flex-shrink:0;'
        }));

        // 内容区 - 垂直居中
        const content = createEl('div', {
          style: 'flex:1;padding:40px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;'
        });

        content.appendChild(createEl('div', {
          style: `font-size:80px;color:#FF2442;opacity:0.1;font-family:Georgia,serif;line-height:1;margin-bottom:8px;`
        }, '“'));

        content.appendChild(createEl('div', {
          style: `font-size:${cardFs}px;font-weight:900;color:#1a1a1a;line-height:1.15;word-break:break-word;margin-bottom:30px;font-family:${FONTS.serif};letter-spacing:0.5px;`
        }, title));

        // 分隔线
        content.appendChild(createEl('div', {
          style: 'width:40px;height:3px;background:#FF2442;border-radius:2px;margin-bottom:24px;'
        }));

        // 统计
        const statsRow = createEl('div', { style: 'display:flex;gap:36px;justify-content:center;' });
        statsRow.appendChild(makeStatItem(String(articleInfo.charCount), '字数', '#FF2442'));
        statsRow.appendChild(makeStatItem(articleInfo.readingTime + '分钟', '阅读', '#FF2442'));
        statsRow.appendChild(makeStatItem(articleInfo.imageCount + '张', '图片', '#FF2442'));
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
        const fs = calcTitleSize(title);

        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;right:0;width:600px;height:600px;background:radial-gradient(circle, rgba(193,95,60,0.06) 0%, transparent 60%);'
        }));
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:0;left:0;width:500px;height:500px;background:radial-gradient(circle, rgba(232,168,124,0.06) 0%, transparent 60%);'
        }));

        // 顶条
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;height:8px;background:linear-gradient(90deg, #C15F3C, #E8A87C);'
        }));

        // 标记
        page.appendChild(createEl('div', {
          style: `position:absolute;top:60px;left:60px;font-size:12px;color:#C15F3C;letter-spacing:4px;font-weight:600;font-family:${FONTS.sans};`
        }, '✦ NOTES'));

        // 垂直居中标题块
        const block = createEl('div', {
          style: 'position:absolute;top:50%;left:60px;right:60px;transform:translateY(-50%);'
        });

        // 渐变线
        block.appendChild(createEl('div', {
          style: 'width:100%;height:4px;background:linear-gradient(90deg, #C15F3C, #E8A87C, transparent);border-radius:2px;margin-bottom:28px;'
        }));

        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:700;color:#2C1810;line-height:1.15;word-break:break-word;font-family:${FONTS.serif};letter-spacing:0.5px;`
        }, title));

        const statsContainer = createEl('div', { style: 'margin-top:36px;display:flex;gap:40px;' });
        statsContainer.appendChild(makeStatItem(String(articleInfo.charCount), '字数', '#C15F3C'));
        statsContainer.appendChild(makeStatItem(articleInfo.readingTime + '分钟', '阅读', '#C15F3C'));
        statsContainer.appendChild(makeStatItem(articleInfo.imageCount + '张', '图片', '#C15F3C'));
        block.appendChild(statsContainer);
        page.appendChild(block);
        return page;
      }
    },

    // ---- 6. 金融时报 ----
    {
      id: 'ft-elegant',
      name: '金融时报',
      render(title, articleInfo) {
        const page = createBasePage('#FFF8EE');
        const fs = calcTitleSize(title);

        // 顶条
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;height:6px;background:#990F3D;'
        }));

        // 双线框
        page.appendChild(createEl('div', { style: 'position:absolute;top:50px;left:50px;right:50px;bottom:50px;border:2px solid #990F3D;' }));
        page.appendChild(createEl('div', { style: 'position:absolute;top:58px;left:58px;right:58px;bottom:58px;border:1px solid rgba(153,15,61,0.2);' }));

        // 垂直居中标题块
        const block = createEl('div', {
          style: 'position:absolute;top:50%;left:100px;right:100px;transform:translateY(-50%);text-align:center;'
        });

        // 上装饰线
        block.appendChild(createEl('div', {
          style: 'margin:0 auto 20px;width:60%;height:1px;background:#990F3D;'
        }));

        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:700;color:#33302E;line-height:1.15;word-break:break-word;font-family:${FONTS.serif};`
        }, title));

        // 下装饰线
        block.appendChild(createEl('div', {
          style: 'margin:20px auto 0;width:60%;height:1px;background:#990F3D44;'
        }));

        const statsContainer = createEl('div', { style: 'margin-top:28px;display:flex;justify-content:center;gap:50px;' });
        statsContainer.appendChild(makeStatItem(String(articleInfo.charCount), '字数', '#990F3D'));
        statsContainer.appendChild(makeStatItem(articleInfo.readingTime + '分钟', '阅读', '#990F3D'));
        statsContainer.appendChild(makeStatItem(articleInfo.imageCount + '张', '图片', '#990F3D'));
        block.appendChild(statsContainer);
        page.appendChild(block);
        return page;
      }
    },

    // ---- 7. 高迪·彩虹 ----
    {
      id: 'gaudi-rainbow',
      name: '高迪·彩虹',
      render(title, articleInfo) {
        const page = createBasePage('#FEFEFE');
        const fs = calcTitleSize(title);

        // 彩色渐变背景
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg, rgba(255,107,107,0.06) 0%, rgba(255,217,61,0.06) 25%, rgba(107,207,127,0.06) 50%, rgba(78,205,196,0.06) 75%, rgba(91,134,229,0.06) 100%);'
        }));

        // 装饰圆
        page.appendChild(createEl('div', { style: 'position:absolute;top:-80px;right:-80px;width:350px;height:350px;border-radius:50%;background:linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,217,61,0.2));' }));
        page.appendChild(createEl('div', { style: 'position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:linear-gradient(135deg, rgba(78,205,196,0.2), rgba(91,134,229,0.2));' }));

        // 彩色顶条
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;height:8px;background:linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #5b86e5, #a55eea);'
        }));

        // 垂直居中标题卡片
        const card = createEl('div', {
          style: 'position:absolute;top:50%;left:60px;right:60px;transform:translateY(-50%);background:rgba(255,255,255,0.75);backdrop-filter:blur(16px);border-radius:24px;padding:44px;box-shadow:0 8px 40px rgba(0,0,0,0.04);'
        });

        card.appendChild(createEl('div', {
          style: 'width:50px;height:4px;background:linear-gradient(90deg, #ff6b6b, #a55eea);border-radius:2px;margin-bottom:28px;'
        }));

        card.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;background:linear-gradient(135deg, #ff6b6b, #a55eea);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.15;word-break:break-word;font-family:${FONTS.sans};`
        }, title));

        const statsContainer = createEl('div', { style: 'margin-top:32px;display:flex;gap:40px;' });
        statsContainer.appendChild(makeStatItem(String(articleInfo.charCount), '字数', '#5b86e5'));
        statsContainer.appendChild(makeStatItem(articleInfo.readingTime + '分钟', '阅读', '#5b86e5'));
        statsContainer.appendChild(makeStatItem(articleInfo.imageCount + '张', '图片', '#5b86e5'));
        card.appendChild(statsContainer);
        page.appendChild(card);
        return page;
      }
    },

    // ---- 8. 书法雅韵 ----
    {
      id: 'calligraphy',
      name: '书法雅韵',
      render(title, articleInfo) {
        const page = createBasePage('#F7F3EB');
        const fs = calcTitleSize(title);

        // 水墨装饰
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 20% 20%, rgba(0,0,0,0.02) 0%, transparent 50%);'
        }));

        // 印章
        page.appendChild(createEl('div', {
          style: `position:absolute;top:70px;right:60px;width:50px;height:50px;border:2px solid #C0392B;color:#C0392B;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;font-family:${FONTS.mashan};border-radius:4px;transform:rotate(-5deg);`
        }, '文'));

        // 竖线装饰
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:120px;left:60px;width:2px;height:80px;background:linear-gradient(180deg, #8B4513, transparent);'
        }));

        // 垂直居中标题块
        const block = createEl('div', {
          style: 'position:absolute;top:50%;left:60px;right:60px;transform:translateY(-50%);'
        });

        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:400;color:#2C1810;line-height:1.2;word-break:break-word;font-family:${FONTS.xiaowei};letter-spacing:2px;`
        }, title));

        const statsContainer = createEl('div', { style: 'margin-top:36px;display:flex;gap:40px;' });
        statsContainer.appendChild(makeStatItem(String(articleInfo.charCount), '字数', '#8B4513'));
        statsContainer.appendChild(makeStatItem(articleInfo.readingTime + '分钟', '阅读', '#8B4513'));
        statsContainer.appendChild(makeStatItem(articleInfo.imageCount + '张', '图片', '#8B4513'));
        block.appendChild(statsContainer);
        page.appendChild(block);
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
  page.style.cssText = `width:1080px;height:1440px;position:relative;overflow:hidden;font-family:${FONTS.sans};background:${background};`;
  return page;
}

function createEl(tag, opts, textContent) {
  const el = document.createElement(tag);
  if (opts && opts.style) el.style.cssText = opts.style;
  if (textContent !== undefined) el.textContent = textContent;
  return el;
}

function makeStatItem(value, label, color) {
  const stat = createEl('div', { style: 'text-align:center;' });
  stat.appendChild(createEl('div', { style: `font-size:22px;font-weight:700;color:${color};margin-bottom:2px;` }, value));
  stat.appendChild(createEl('div', { style: `font-size:11px;color:${color}88;` }, label));
  return stat;
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
      .replace(/<em>(.*?)<\/em>/g, '<span style="font-style:italic;">$1</span>')
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
      const bullet = createEl('span', { style: `position:absolute;left:0;top:0;color:${colors.accent};font-weight:bold;font-size:${fontSizes.li}px;` }, '•');
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
