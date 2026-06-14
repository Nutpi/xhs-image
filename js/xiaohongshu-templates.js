/**
 * 小红书图片模板定义
 * 封面模板 12 套 + 内容模板 16 套
 * 文字完全覆盖封面 · 真正的小红书视觉风格
 */

const FONTS = {
  sans: '"Noto Sans SC", -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Noto Serif SC", Georgia, "Songti SC", "SimSun", serif',
  xiaowei: '"ZCOOL XiaoWei", "Noto Serif SC", serif',
  mashan: '"Ma Shan Zheng", cursive',
};

/**
 * 根据标题字数智能计算字号
 * 目标：让文字尽可能撑满 1080×1440 的封面
 * 策略：从大字号开始尝试，找到不超过目标高度的最大字号
 */
function calcTitleSize(title) {
  const len = title.length;
  const availWidth = 940;   // 1080 - 70*2
  const maxTextHeight = 1050; // 文字区最大高度（留底部给统计）

  let bestFs = 56;
  for (let fs = 200; fs >= 50; fs -= 4) {
    const charsPerLine = Math.floor(availWidth / fs);
    if (charsPerLine < 2) continue;
    const lines = Math.ceil(len / charsPerLine);
    const height = lines * fs * 1.3;
    if (height <= maxTextHeight) {
      bestFs = fs;
      break;
    }
  }
  return bestFs;
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

        // 顶部红线区
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;height:6px;background:#FF2442;'
        }));

        // 四角装饰括号
        const cornerStyle = 'position:absolute;width:40px;height:40px;border-color:#ddd;border-style:solid;border-width:0;';
        page.appendChild(createEl('div', { style: cornerStyle + 'top:80px;left:70px;border-top-width:2px;border-left-width:2px;' }));
        page.appendChild(createEl('div', { style: cornerStyle + 'top:80px;right:70px;border-top-width:2px;border-right-width:2px;' }));
        page.appendChild(createEl('div', { style: cornerStyle + 'bottom:80px;left:70px;border-bottom-width:2px;border-left-width:2px;' }));
        page.appendChild(createEl('div', { style: cornerStyle + 'bottom:80px;right:70px;border-bottom-width:2px;border-right-width:2px;' }));

        // 顶部标签
        const tagArea = createEl('div', {
          style: `position:absolute;top:100px;left:110px;display:flex;align-items:center;gap:10px;`
        });
        tagArea.appendChild(createEl('div', {
          style: `padding:4px 16px;background:#FF2442;color:#fff;font-size:14px;font-weight:600;border-radius:3px;font-family:${FONTS.sans};`
        }, '笔记'));
        tagArea.appendChild(createEl('div', {
          style: `font-size:13px;color:#ccc;font-family:${FONTS.sans};`
        }, 'NOTE'));
        page.appendChild(tagArea);

        // 标题区
        const block = createEl('div', {
          style: `position:absolute;top:170px;left:110px;right:110px;bottom:160px;display:flex;flex-direction:column;justify-content:center;`
        });
        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;color:#111;line-height:1.3;word-break:break-word;font-family:${FONTS.serif};letter-spacing:1px;`
        }, title));

        // 装饰分隔线
        block.appendChild(createEl('div', {
          style: 'margin-top:30px;width:60px;height:3px;background:#FF2442;border-radius:2px;'
        }));

        // 底部统计
        block.appendChild(createEl('div', {
          style: `padding-top:16px;display:flex;gap:24px;font-size:15px;color:#bbb;font-family:${FONTS.sans};`
        }, `${articleInfo.charCount}字 · ${articleInfo.readingTime}分钟阅读`));

        page.appendChild(block);

        // 底部装饰文字
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:40px;left:110px;right:110px;display:flex;justify-content:space-between;align-items:center;`
        }, ''));
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:42px;left:110px;font-size:13px;color:#e0e0e0;font-family:${FONTS.sans};letter-spacing:4px;`
        }, 'XIAOHONGSHU'));

        return page;
      }
    },

    // ---- 2. 渐变醒目 ----
    {
      id: 'gradient-bold',
      name: '渐变醒目',
      darkBg: true,
      render(title, articleInfo) {
        const page = createBasePage('linear-gradient(145deg, #FF416C 0%, #FF4B2B 50%, #FF8C42 100%)');
        const fs = calcTitleSize(title);

        // 装饰圆
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:-120px;right:-100px;width:450px;height:450px;border-radius:50%;background:rgba(255,255,255,0.07);'
        }));
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:-60px;right:-40px;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,0.05);'
        }));
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:-80px;left:-80px;width:350px;height:350px;border-radius:50%;background:rgba(255,255,255,0.06);'
        }));
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:-20px;left:-20px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.04);'
        }));

        // 斜线装饰
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:100px;right:80px;width:120px;height:2px;background:rgba(255,255,255,0.2);transform:rotate(-45deg);'
        }));
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:120px;right:60px;width:80px;height:2px;background:rgba(255,255,255,0.15);transform:rotate(-45deg);'
        }));

        // 顶部徽章
        page.appendChild(createEl('div', {
          style: `position:absolute;top:80px;left:70px;padding:6px 20px;border:1.5px solid rgba(255,255,255,0.4);border-radius:20px;color:rgba(255,255,255,0.9);font-size:14px;font-weight:600;font-family:${FONTS.sans};letter-spacing:2px;`
        }, '✦ HOT'));

        // 标题区
        const block = createEl('div', {
          style: `position:absolute;top:160px;left:70px;right:70px;bottom:140px;display:flex;flex-direction:column;justify-content:center;`
        });
        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;color:#fff;line-height:1.3;word-break:break-word;text-shadow:0 4px 20px rgba(0,0,0,0.15);font-family:${FONTS.sans};letter-spacing:2px;`
        }, title));

        // 分隔
        const gradDivider = createEl('div', {
          style: 'margin-top:28px;display:flex;align-items:center;gap:12px;'
        });
        gradDivider.appendChild(createEl('div', {
          style: 'width:50px;height:2px;background:rgba(255,255,255,0.4);border-radius:1px;'
        }));
        block.appendChild(gradDivider);
        block.appendChild(createEl('div', {
          style: `margin-top:14px;display:flex;gap:20px;font-size:15px;color:rgba(255,255,255,0.65);`
        }, `${articleInfo.charCount}字 · 约${articleInfo.readingTime}分钟`));

        page.appendChild(block);

        // 底部装饰条
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:50px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:center;'
        }));
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:50px;left:70px;font-size:12px;color:rgba(255,255,255,0.3);font-family:${FONTS.sans};letter-spacing:3px;`
        }, 'RECOMMENDED'));

        return page;
      }
    },

    // ---- 3. 暗黑高级 ----
    {
      id: 'dark-premium',
      name: '暗黑高级',
      darkBg: true,
      render(title, articleInfo) {
        const page = createBasePage('linear-gradient(170deg, #0c0c1d 0%, #1a1a2e 50%, #0f3460 100%)');
        const fs = calcTitleSize(title);

        // 网格背景
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;bottom:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);background-size:80px 80px;'
        }));

        // 金色光晕
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:30%;left:50%;transform:translate(-50%,-30%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle, rgba(255,184,0,0.08) 0%, transparent 60%);'
        }));

        // 顶部金色横线 + 标签
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:80px;left:70px;right:70px;height:1px;background:linear-gradient(90deg, transparent, rgba(255,184,0,0.3), transparent);'
        }));
        page.appendChild(createEl('div', {
          style: `position:absolute;top:68px;left:70px;padding:3px 14px;border:1px solid rgba(255,184,0,0.4);color:rgba(255,184,0,0.7);font-size:12px;font-weight:600;letter-spacing:3px;font-family:${FONTS.sans};`
        }, 'PREMIUM'));

        // 金色角标
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:78px;right:70px;width:8px;height:8px;background:#FFB800;border-radius:50%;box-shadow:0 0 12px rgba(255,184,0,0.5);'
        }));

        // 标题区
        const block = createEl('div', {
          style: `position:absolute;top:140px;left:70px;right:70px;bottom:140px;display:flex;flex-direction:column;justify-content:center;`
        });

        // 金色引号装饰
        block.appendChild(createEl('div', {
          style: `font-size:80px;color:rgba(255,184,0,0.15);line-height:1;font-family:Georgia,serif;margin-bottom:-20px;`
        }, '“'));

        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;color:#fff;line-height:1.3;word-break:break-word;font-family:${FONTS.serif};letter-spacing:1px;`
        }, title));

        // 金色分隔线
        block.appendChild(createEl('div', {
          style: 'margin-top:28px;width:80px;height:2px;background:linear-gradient(90deg, #FFB800, transparent);'
        }));

        // 统计
        const statsLine = createEl('div', {
          style: 'padding-top:14px;display:flex;gap:20px;font-size:14px;color:rgba(255,184,0,0.45);font-family:${FONTS.sans};'
        });
        statsLine.textContent = `${articleInfo.charCount}字 · ${articleInfo.readingTime}min · ${articleInfo.imageCount}图`;
        block.appendChild(statsLine);

        page.appendChild(block);

        // 底部金色横线
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:80px;left:70px;right:70px;height:1px;background:linear-gradient(90deg, transparent, rgba(255,184,0,0.3), transparent);'
        }));

        return page;
      }
    },

    // ---- 4. 卡片杂志 ----
    {
      id: 'card-magazine',
      name: '卡片杂志',
      render(title, articleInfo) {
        const page = createBasePage('#EDE8E0');
        const fs = Math.max(46, calcTitleSize(title) - 12);

        // 大卡片
        const card = createEl('div', {
          style: 'position:absolute;top:50px;left:50px;right:50px;bottom:50px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.08);overflow:hidden;display:flex;flex-direction:column;'
        });

        // 彩条
        card.appendChild(createEl('div', { style: 'height:8px;background:linear-gradient(90deg, #FF2442, #FF6B6B, #FFA726);flex-shrink:0;' }));

        // 顶部区域 - 标签 + 日期
        const headerArea = createEl('div', {
          style: `padding:24px 50px 0;display:flex;justify-content:space-between;align-items:center;`
        });
        const tagGroup = createEl('div', { style: 'display:flex;gap:8px;' });
        tagGroup.appendChild(createEl('div', {
          style: `padding:3px 12px;background:#FF244210;color:#FF2442;font-size:12px;font-weight:600;border-radius:4px;font-family:${FONTS.sans};`
        }, '精选'));
        tagGroup.appendChild(createEl('div', {
          style: `padding:3px 12px;background:#f5f5f5;color:#999;font-size:12px;border-radius:4px;font-family:${FONTS.sans};`
        }, '原创'));
        headerArea.appendChild(tagGroup);
        headerArea.appendChild(createEl('div', {
          style: `font-size:12px;color:#ccc;font-family:${FONTS.sans};`
        }, 'TODAY'));
        card.appendChild(headerArea);

        // 分隔线
        card.appendChild(createEl('div', {
          style: 'margin:16px 50px 0;height:1px;background:#f0f0f0;'
        }));

        // 内容区
        const contentArea = createEl('div', {
          style: 'flex:1;padding:30px 50px 0;display:flex;flex-direction:column;justify-content:center;'
        });
        contentArea.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;color:#1a1a1a;line-height:1.3;word-break:break-word;font-family:${FONTS.serif};letter-spacing:0.5px;`
        }, title));
        card.appendChild(contentArea);

        // 底部统计条
        const footerBar = createEl('div', {
          style: 'padding:16px 50px;border-top:1px solid #f5f5f5;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;'
        });
        footerBar.appendChild(createEl('div', {
          style: `font-size:13px;color:#bbb;font-family:${FONTS.sans};`
        }, `${articleInfo.charCount}字 · ${articleInfo.readingTime}分钟阅读`));
        footerBar.appendChild(createEl('div', {
          style: `font-size:12px;color:#ddd;font-family:${FONTS.sans};letter-spacing:2px;`
        }, 'XHS'));
        card.appendChild(footerBar);

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

        // 顶部渐变条
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;height:8px;background:linear-gradient(90deg, #C15F3C, #E8A87C);'
        }));

        // 右上角暖色水彩圆
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:-80px;right:-60px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle, rgba(193,95,60,0.06) 0%, transparent 60%);'
        }));
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:-100px;left:-80px;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle, rgba(232,168,124,0.06) 0%, transparent 60%);'
        }));

        // 左侧竖线装饰
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:80px;left:70px;width:3px;height:40px;background:linear-gradient(180deg, #C15F3C, #E8A87C);border-radius:2px;'
        }));

        // 顶部标签
        page.appendChild(createEl('div', {
          style: `position:absolute;top:84px;left:88px;font-size:14px;font-weight:600;color:#C15F3C;font-family:${FONTS.sans};letter-spacing:2px;`
        }, 'CLAUDE'));

        // 右上角小装饰
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:90px;right:70px;display:flex;gap:6px;'
        }, ''));
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:88px;right:78px;width:24px;height:24px;border-radius:50%;border:1.5px solid rgba(193,95,60,0.2);'
        }));
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:92px;right:84px;width:16px;height:16px;border-radius:50%;border:1.5px solid rgba(193,95,60,0.15);'
        }));

        // 标题区
        const block = createEl('div', {
          style: `position:absolute;top:160px;left:70px;right:70px;bottom:120px;display:flex;flex-direction:column;justify-content:center;`
        });
        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:700;color:#2C1810;line-height:1.3;word-break:break-word;font-family:${FONTS.serif};letter-spacing:0.5px;`
        }, title));

        // 暖色分隔线
        const warmDivider = createEl('div', {
          style: 'margin-top:28px;display:flex;align-items:center;gap:8px;'
        });
        warmDivider.appendChild(createEl('div', {
          style: 'width:40px;height:2px;background:#C15F3C;border-radius:1px;'
        }));
        warmDivider.appendChild(createEl('div', {
          style: 'width:8px;height:2px;background:#E8A87C;border-radius:1px;'
        }));
        block.appendChild(warmDivider);

        // 统计
        block.appendChild(createEl('div', {
          style: 'padding-top:14px;font-size:15px;color:#bba89a;font-family:${FONTS.sans};'
        }, `${articleInfo.charCount}字 · ${articleInfo.readingTime}分钟阅读`));

        page.appendChild(block);

        // 底部装饰
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:50px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:center;`
        }));
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:50px;left:70px;font-size:12px;color:#d5ccc3;font-family:${FONTS.sans};letter-spacing:2px;`
        }, 'WARM & COZY'));

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

        // 酒红顶条
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;height:6px;background:#990F3D;'
        }));

        // 双线框
        page.appendChild(createEl('div', { style: 'position:absolute;top:40px;left:40px;right:40px;bottom:40px;border:2px solid #990F3D;' }));
        page.appendChild(createEl('div', { style: 'position:absolute;top:48px;left:48px;right:48px;bottom:48px;border:1px solid rgba(153,15,61,0.15);' }));

        // 报头区域
        const masthead = createEl('div', {
          style: `position:absolute;top:65px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(153,15,61,0.15);padding-bottom:12px;`
        });
        masthead.appendChild(createEl('div', {
          style: `font-size:20px;font-weight:700;color:#990F3D;font-family:Georgia,serif;letter-spacing:3px;`
        }, 'FINANCIAL TIMES'));
        masthead.appendChild(createEl('div', {
          style: `font-size:11px;color:#990F3D80;font-family:Georgia,serif;`
        }, 'EST. 2024'));
        page.appendChild(masthead);

        // 装饰菱形
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:62px;left:50%;transform:translateX(-50%) rotate(45deg);width:8px;height:8px;background:#990F3D;margin-top:-4px;'
        }));

        // 标题区
        const block = createEl('div', {
          style: `position:absolute;top:140px;left:90px;right:90px;bottom:120px;display:flex;flex-direction:column;justify-content:center;text-align:center;`
        });
        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:700;color:#33302E;line-height:1.3;word-break:break-word;font-family:${FONTS.serif};`
        }, title));

        // 装饰分隔线
        block.appendChild(createEl('div', {
          style: 'margin:24px auto 0;width:120px;height:1px;background:linear-gradient(90deg, transparent, #990F3D40, transparent);'
        }));

        block.appendChild(createEl('div', {
          style: 'padding-top:12px;font-size:14px;color:#8a7a6a;font-family:Georgia,serif;'
        }, `${articleInfo.charCount}字 · ${articleInfo.readingTime}分钟阅读`));

        page.appendChild(block);

        // 底部装饰
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:65px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(153,15,61,0.15);padding-top:12px;`
        }));
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:68px;left:80px;font-size:11px;color:#990F3D50;font-family:Georgia,serif;letter-spacing:2px;`
        }, 'OPINION'));
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:68px;right:80px;font-size:11px;color:#990F3D50;font-family:Georgia,serif;`
        }, `Vol. ${articleInfo.charCount}`));

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
          style: 'position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg, rgba(255,107,107,0.04) 0%, rgba(255,217,61,0.04) 25%, rgba(107,207,127,0.04) 50%, rgba(78,205,196,0.04) 75%, rgba(91,134,229,0.04) 100%);'
        }));

        // 装饰圆 - 更丰富
        page.appendChild(createEl('div', { style: 'position:absolute;top:-100px;right:-100px;width:420px;height:420px;border-radius:50%;background:linear-gradient(135deg, rgba(255,107,107,0.12), rgba(255,217,61,0.12));' }));
        page.appendChild(createEl('div', { style: 'position:absolute;bottom:-80px;left:-80px;width:350px;height:350px;border-radius:50%;background:linear-gradient(135deg, rgba(78,205,196,0.12), rgba(91,134,229,0.12));' }));
        page.appendChild(createEl('div', { style: 'position:absolute;top:40%;left:-40px;width:120px;height:120px;border-radius:50%;background:rgba(107,207,127,0.08);' }));

        // 彩条
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;height:8px;background:linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #5b86e5, #a55eea);'
        }));

        // 底部彩条
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:0;left:0;right:0;height:6px;background:linear-gradient(90deg, #a55eea, #5b86e5, #4ecdc4, #6bcf7f, #ffd93d, #ff6b6b);'
        }));

        // 顶部彩色标签
        const tagRow = createEl('div', {
          style: `position:absolute;top:80px;left:70px;display:flex;gap:8px;`
        });
        tagRow.appendChild(createEl('div', { style: 'width:12px;height:12px;border-radius:50%;background:#ff6b6b;' }));
        tagRow.appendChild(createEl('div', { style: 'width:12px;height:12px;border-radius:50%;background:#ffd93d;' }));
        tagRow.appendChild(createEl('div', { style: 'width:12px;height:12px;border-radius:50%;background:#6bcf7f;' }));
        tagRow.appendChild(createEl('div', { style: 'width:12px;height:12px;border-radius:50%;background:#4ecdc4;' }));
        tagRow.appendChild(createEl('div', { style: 'width:12px;height:12px;border-radius:50%;background:#5b86e5;' }));
        tagRow.appendChild(createEl('div', { style: 'width:12px;height:12px;border-radius:50%;background:#a55eea;' }));
        page.appendChild(tagRow);

        page.appendChild(createEl('div', {
          style: `position:absolute;top:80px;right:70px;font-size:13px;font-weight:600;color:#bbb;font-family:${FONTS.sans};`
        }, 'GAUDI'));

        // 标题区
        const block = createEl('div', {
          style: `position:absolute;top:140px;left:70px;right:70px;bottom:100px;display:flex;flex-direction:column;justify-content:center;`
        });

        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:900;background:linear-gradient(135deg, #ff6b6b, #a55eea);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.3;word-break:break-word;font-family:${FONTS.sans};`
        }, title));

        // 彩色分隔
        block.appendChild(createEl('div', {
          style: 'margin-top:24px;width:100%;height:3px;border-radius:2px;background:linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #5b86e5, #a55eea);'
        }));

        block.appendChild(createEl('div', {
          style: 'padding-top:14px;font-size:14px;color:#bbb;display:flex;gap:16px;'
        }, `${articleInfo.charCount}字 · ${articleInfo.readingTime}分钟阅读`));

        page.appendChild(block);

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

        // 纸纹纹理
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;bottom:0;background-image:repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(180,160,138,0.03) 40px, rgba(180,160,138,0.03) 41px);'
        }));

        // 水墨晕染效果
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:-50px;left:-50px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle, rgba(44,24,16,0.03) 0%, transparent 70%);'
        }));
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:-30px;right:-30px;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle, rgba(139,69,19,0.04) 0%, transparent 70%);'
        }));

        // 印章 - 更大更醒目
        page.appendChild(createEl('div', {
          style: `position:absolute;top:72px;right:70px;width:52px;height:52px;border:2.5px solid #C0392B;color:#C0392B;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;font-family:${FONTS.mashan};border-radius:3px;transform:rotate(-5deg);`
        }, '文'));

        // 左上角竖排装饰
        page.appendChild(createEl('div', {
          style: `position:absolute;top:80px;left:78px;writing-mode:vertical-rl;font-size:13px;color:rgba(139,69,19,0.25);font-family:${FONTS.xiaowei};letter-spacing:6px;`
        }, '笔墨纸砚'));

        // 顶部横线
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:66px;left:120px;right:140px;height:1px;background:linear-gradient(90deg, rgba(139,69,19,0.2), transparent);'
        }));

        // 标题区
        const block = createEl('div', {
          style: `position:absolute;top:150px;left:70px;right:70px;bottom:120px;display:flex;flex-direction:column;justify-content:center;`
        });

        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:400;color:#2C1810;line-height:1.35;word-break:break-word;font-family:${FONTS.xiaowei};letter-spacing:3px;`
        }, title));

        // 朱砂色分隔线
        block.appendChild(createEl('div', {
          style: 'margin-top:28px;width:60px;height:2px;background:#C0392B;border-radius:1px;'
        }));

        block.appendChild(createEl('div', {
          style: 'padding-top:14px;font-size:14px;color:#b5a08a;font-family:${FONTS.sans};'
        }, `${articleInfo.charCount}字 · ${articleInfo.readingTime}分钟阅读`));

        page.appendChild(block);

        // 底部装饰
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:50px;left:70px;right:70px;height:1px;background:linear-gradient(90deg, transparent, rgba(139,69,19,0.15), transparent);'
        }));
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:30px;left:50%;transform:translateX(-50%);font-size:11px;color:#d5cdc3;font-family:${FONTS.xiaowei};letter-spacing:6px;`
        }, '雅'));

        return page;
      }
    },

    // ---- 9. 禅意·空（原研哉风格）----
    {
      id: 'zen-emptiness',
      name: '禅意·空',
      render(title, articleInfo) {
        const page = createBasePage('#FFFFFF');
        const fs = Math.max(48, calcTitleSize(title) - 16);

        // 顶部金棕小圆点
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:95px;left:50%;transform:translateX(-50%);width:14px;height:14px;border-radius:50%;background:#B89B72;'
        }));

        // 标题区 - 大留白，居中
        const block = createEl('div', {
          style: `position:absolute;top:210px;left:95px;right:95px;bottom:250px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;`
        });
        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:300;color:#1a1a1a;line-height:1.7;word-break:break-word;font-family:${FONTS.xiaowei};letter-spacing:8px;`
        }, title));

        page.appendChild(block);

        // 细分隔线
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:155px;left:50%;transform:translateX(-50%);width:44px;height:1px;background:#c8b89c;'
        }));

        // 底部统计
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:95px;left:0;right:0;text-align:center;font-size:14px;color:#b0b0b0;font-family:${FONTS.sans};letter-spacing:4px;`
        }, `${articleInfo.charCount}字 · ${articleInfo.readingTime}分钟`));

        // 底部小圆点
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:50px;left:50%;transform:translateX(-50%);width:6px;height:6px;border-radius:50%;background:#c8b89c;'
        }));

        return page;
      }
    },

    // ---- 10. 和纸（Kami）----
    {
      id: 'washi-paper',
      name: '和纸',
      render(title, articleInfo) {
        const page = createBasePage('#F5F4ED');
        const fs = calcTitleSize(title);

        // 纸纹
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;bottom:0;background-image:repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(27,54,93,0.02) 50px, rgba(27,54,93,0.02) 51px);'
        }));

        // 左侧深蓝粗竖线
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:75px;left:70px;width:6px;bottom:75px;background:#1B365D;border-radius:3px;'
        }));

        // 右上角竖排小字
        page.appendChild(createEl('div', {
          style: `position:absolute;top:80px;right:75px;writing-mode:vertical-rl;font-size:13px;color:rgba(27,54,93,0.4);font-family:${FONTS.serif};letter-spacing:8px;`
        }, '和紙 WASHI'));

        // 标题区
        const block = createEl('div', {
          style: `position:absolute;top:50%;transform:translateY(-50%);left:115px;right:115px;display:flex;flex-direction:column;justify-content:center;`
        });
        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:500;color:#141413;line-height:1.35;word-break:break-word;font-family:${FONTS.serif};letter-spacing:2px;`
        }, title));

        // 深蓝分隔线
        block.appendChild(createEl('div', {
          style: 'margin-top:26px;width:50px;height:2px;background:#1B365D;border-radius:1px;'
        }));

        page.appendChild(block);

        // 底部统计
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:62px;left:115px;font-size:14px;color:#1B365D;opacity:0.6;font-family:${FONTS.sans};`
        }, `${articleInfo.charCount}字 · ${articleInfo.readingTime}分钟阅读`));

        return page;
      }
    },

    // ---- 11. 卫报（Guardian）----
    {
      id: 'guardian',
      name: '卫报',
      darkBg: true,
      render(title, articleInfo) {
        const page = createBasePage('#052962');
        const fs = calcTitleSize(title);

        // 顶部黄色条
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:0;left:0;right:0;height:70px;background:#FEC200;'
        }));

        // masthead
        page.appendChild(createEl('div', {
          style: `position:absolute;top:25px;left:70px;font-size:22px;font-weight:800;color:#052962;font-family:Georgia,serif;letter-spacing:1px;`
        }, 'The Guardian'));

        page.appendChild(createEl('div', {
          style: `position:absolute;top:30px;right:70px;font-size:13px;font-weight:700;color:#052962;font-family:${FONTS.sans};letter-spacing:2px;`
        }, 'OPINION'));

        // 红色小色块装饰
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:125px;left:70px;width:56px;height:56px;background:#C70000;border-radius:4px;'
        }));

        // 标题区
        const block = createEl('div', {
          style: `position:absolute;top:225px;left:70px;right:70px;bottom:160px;display:flex;flex-direction:column;justify-content:center;`
        });
        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:700;color:#fff;line-height:1.3;word-break:break-word;font-family:Georgia,serif;letter-spacing:-0.5px;`
        }, title));

        page.appendChild(block);

        // 底部黄线 + 统计
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:92px;left:70px;right:70px;height:2px;background:#FEC200;'
        }));
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:50px;left:70px;font-size:14px;color:#FEC200;font-family:${FONTS.sans};font-weight:600;`
        }, `${articleInfo.charCount}字 · ${articleInfo.readingTime}分钟阅读`));

        return page;
      }
    },

    // ---- 12. 纽约时报（NYT）----
    {
      id: 'nyt',
      name: '纽约时报',
      render(title, articleInfo) {
        const page = createBasePage('#FFFFFF');
        const fs = Math.max(50, calcTitleSize(title) - 10);

        // masthead
        page.appendChild(createEl('div', {
          style: `position:absolute;top:70px;left:0;right:0;text-align:center;font-size:24px;font-weight:700;color:#000;font-family:Georgia,serif;letter-spacing:2px;`
        }, 'The New York Times'));

        // masthead 下双线
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:116px;left:80px;right:80px;height:2px;background:#000;'
        }));
        page.appendChild(createEl('div', {
          style: 'position:absolute;top:121px;left:80px;right:80px;height:1px;background:#000;'
        }));

        // 小标签
        page.appendChild(createEl('div', {
          style: `position:absolute;top:155px;left:50%;transform:translateX(-50%);font-size:12px;font-style:italic;color:#666;font-family:Georgia,serif;letter-spacing:3px;text-transform:uppercase;`
        }, 'Special Feature'));

        // 标题区
        const block = createEl('div', {
          style: `position:absolute;top:220px;left:70px;right:70px;bottom:180px;display:flex;flex-direction:column;justify-content:center;`
        });
        block.appendChild(createEl('div', {
          style: `font-size:${fs}px;font-weight:700;color:#000;line-height:1.2;word-break:break-word;font-family:Georgia,serif;letter-spacing:-1px;`
        }, title));

        page.appendChild(block);

        // 底部细线
        page.appendChild(createEl('div', {
          style: 'position:absolute;bottom:92px;left:80px;right:80px;height:1px;background:#ccc;'
        }));

        // 底部统计
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:50px;left:80px;font-size:13px;color:#666;font-family:Georgia,serif;`
        }, `${articleInfo.charCount}字 · ${articleInfo.readingTime}分钟阅读`));
        page.appendChild(createEl('div', {
          style: `position:absolute;bottom:50px;right:80px;font-size:13px;color:#666;font-family:Georgia,serif;font-style:italic;`
        }, 'Today'));

        return page;
      }
    }
  ],

  // ==================== 内容模板 ====================
  content: [
    {
      id: 'clean-default', name: '清新',
      colors: { bg: '#FFFFFF', text: '#333', heading: '#111', accent: '#FF2442', quoteBg: '#FFF5F5', quoteBorder: '#FF2442', codeBg: '#F5F5F7', codeText: '#E01F3B' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.sans, headingStyle: 'left-border'
    },
    {
      id: 'warm-paper', name: '暖纸',
      colors: { bg: '#FDF8F0', text: '#4A3728', heading: '#2C1810', accent: '#D4764E', quoteBg: '#F5EDE3', quoteBorder: '#D4764E', codeBg: '#F5EDE3', codeText: '#8B5E3C' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.serif, headingStyle: 'left-border'
    },
    {
      id: 'dark-pro', name: '暗黑',
      colors: { bg: '#1A1A2E', text: '#C8C8D0', heading: '#FFFFFF', accent: '#FFB800', quoteBg: 'rgba(255,255,255,0.04)', quoteBorder: '#FFB800', codeBg: 'rgba(255,255,255,0.06)', codeText: '#FFB800' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.sans, headingStyle: 'left-border'
    },
    {
      id: 'claude-warm', name: 'Claude 橙',
      colors: { bg: '#FAF7F2', text: '#3d3d3d', heading: '#1a1a1a', accent: '#C15F3C', quoteBg: 'rgba(193,95,60,0.05)', quoteBorder: '#C15F3C', codeBg: '#F0EEEC', codeText: '#C15F3C' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.serif, headingStyle: 'gradient'
    },
    {
      id: 'ft-elegant', name: '金融时报',
      colors: { bg: '#FFF8EE', text: '#33302E', heading: '#33302E', accent: '#990F3D', quoteBg: 'rgba(153,15,61,0.04)', quoteBorder: '#990F3D', codeBg: '#F0E6D8', codeText: '#990F3D' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 42, h2: 36, h3: 30, p: 30, li: 30, quote: 28, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.serif, headingStyle: 'bottom-border'
    },
    {
      id: 'latepost-red', name: '晚点红',
      colors: { bg: '#FFFFFF', text: '#333', heading: '#1a1a1a', accent: '#d32f2f', quoteBg: '#FFF5F5', quoteBorder: '#d32f2f', codeBg: '#f5f5f5', codeText: '#d32f2f' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.sans, headingStyle: 'bg-highlight'
    },
    {
      id: 'gaudi-colorful', name: '高迪·彩色',
      colors: { bg: '#FEFEFE', text: '#444', heading: '#1a1a1a', accent: '#5b86e5', quoteBg: 'rgba(78,205,196,0.06)', quoteBorder: '#4ecdc4', codeBg: '#f0f0f0', codeText: '#5b86e5' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.sans, headingStyle: 'gradient-rainbow'
    },
    {
      id: 'calligraphy', name: '书法',
      colors: { bg: '#F7F3EB', text: '#4A3728', heading: '#2C1810', accent: '#8B4513', quoteBg: '#EDE8DC', quoteBorder: '#8B4513', codeBg: '#EDE8DC', codeText: '#8B5E3C' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.85, fontFamily: FONTS.xiaowei, headingStyle: 'left-border'
    },
    // ---- 禅意·空（原研哉风格，超大留白）----
    {
      id: 'zen-emptiness', name: '禅意·空',
      colors: { bg: '#FFFFFF', text: '#9a9a9a', heading: '#1a1a1a', accent: '#9c8a6e', quoteBg: 'transparent', quoteBorder: '#c8b89c', codeBg: '#faf9f7', codeText: '#9c8a6e' },
      padding: '110px 95px 150px 95px',
      fontSizes: { h1: 42, h2: 34, h3: 30, p: 30, li: 30, quote: 28, code: 24 },
      lineHeight: 2.0, fontFamily: FONTS.xiaowei, headingStyle: 'left-border'
    },
    // ---- 和纸（Kami，米黄底+深蓝）----
    {
      id: 'kami-paper', name: '和纸',
      colors: { bg: '#F5F4ED', text: '#141413', heading: '#141413', accent: '#1B365D', quoteBg: '#EDECE3', quoteBorder: '#1B365D', codeBg: '#EDECE3', codeText: '#1B365D' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.serif, headingStyle: 'left-border'
    },
    // ---- 清水混凝土（安藤忠雄，冷灰极简）----
    {
      id: 'concrete', name: '清水混凝土',
      colors: { bg: '#E8E6E2', text: '#4A4A4A', heading: '#1A1A1A', accent: '#5A5A5A', quoteBg: '#F3F1EE', quoteBorder: '#8A8A8A', codeBg: '#DFDCD7', codeText: '#3A3A3A' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.sans, headingStyle: 'bottom-border'
    },
    // ---- 卫报（Guardian，深蓝+黄+红）----
    {
      id: 'guardian', name: '卫报',
      colors: { bg: '#FFFFFF', text: '#121212', heading: '#052962', accent: '#C70000', quoteBg: '#FFF2C2', quoteBorder: '#C70000', codeBg: '#F2F2F2', codeText: '#052962' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.sans, headingStyle: 'bg-highlight'
    },
    // ---- 纽约时报（NYT，衬线大标题）----
    {
      id: 'nyt', name: '纽约时报',
      colors: { bg: '#FFFFFF', text: '#121212', heading: '#000000', accent: '#326891', quoteBg: '#F7F7F7', quoteBorder: '#121212', codeBg: '#F0F0F0', codeText: '#666666' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 46, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.8, fontFamily: FONTS.serif, headingStyle: 'bottom-border'
    },
    // ---- 编辑部（Hische，红色杂志）----
    {
      id: 'editorial', name: '编辑部',
      colors: { bg: '#FFFDF7', text: '#2C2C2C', heading: '#1A1A1A', accent: '#C9302C', quoteBg: 'transparent', quoteBorder: '#C9302C', codeBg: '#F5F2EC', codeText: '#C9302C' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.85, fontFamily: FONTS.serif, headingStyle: 'bottom-border'
    },
    // ---- 世界报（Le Monde，法式优雅）----
    {
      id: 'lemonde', name: '世界报',
      colors: { bg: '#FBF8F0', text: '#2C2C2C', heading: '#1A1A1A', accent: '#7A5C3E', quoteBg: 'transparent', quoteBorder: '#2C2C2C', codeBg: '#F2EFE8', codeText: '#2C2C2C' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.85, fontFamily: FONTS.serif, headingStyle: 'bottom-border'
    },
    // ---- 苹果极简（Apple，浅灰+蓝）----
    {
      id: 'apple-minimal', name: '苹果极简',
      colors: { bg: '#FBFBFD', text: '#515154', heading: '#1D1D1F', accent: '#0071E3', quoteBg: '#F5F5F7', quoteBorder: '#D2D2D7', codeBg: '#F5F5F7', codeText: '#1D1D1F' },
      padding: '80px 70px 120px 70px',
      fontSizes: { h1: 44, h2: 38, h3: 32, p: 33, li: 33, quote: 30, code: 26 },
      lineHeight: 1.75, fontFamily: FONTS.sans, headingStyle: 'left-border'
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
    style: `position:absolute;bottom:40px;right:70px;font-size:18px;color:${colors.text};opacity:0.3;font-weight:500;`
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

/**
 * 判断颜色是否偏深（用于水印文字配色自适应）
 */
function isColorDark(color) {
  if (!color || typeof color !== 'string' || color[0] !== '#') return false;
  let hex = color.length === 4
    ? color.slice(1).split('').map(c => c + c).join('')
    : color.slice(1);
  if (hex.length !== 6) return false;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  return luma < 150;
}

/**
 * 在页面左下角注入署名水印（横线 + @昵称）
 * @param {HTMLElement} page - 页面根元素
 * @param {string} text - 昵称（会自动加 @ 前缀）
 * @param {boolean} isDark - 背景是否偏深（决定字色）
 */
function addWatermark(page, text, isDark) {
  const name = (text || '').trim();
  if (!name) return;
  const label = name.startsWith('@') ? name : '@' + name;
  const textColor = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.42)';
  const lineColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.22)';

  const wm = createEl('div', {
    style: `position:absolute;left:70px;bottom:75px;display:flex;flex-direction:column;gap:7px;z-index:5;`
  });
  wm.appendChild(createEl('div', {
    style: `width:32px;height:2px;background:${lineColor};border-radius:1px;`
  }));
  wm.appendChild(createEl('div', {
    style: `font-size:15px;color:${textColor};font-family:${FONTS.sans};letter-spacing:0.5px;font-weight:500;`
  }, label));
  page.appendChild(wm);
}
