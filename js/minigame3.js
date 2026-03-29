/* ============================
   ミニゲーム：大学の七不思議探検
   ～ 夜の研究棟で肝試し ～
   ============================ */

window.startMinigame = function(engine, onCompleteLabel) {
  const layer = document.getElementById('minigame-layer');
  layer.classList.remove('hidden');

  const state = {
    room: 'hallway',
    labClueFound: false,
    libraryClueFound: false,
    rooftopClueFound: false,
    allCluesFound: false,
    finalDoorOpen: false,
  };

  const bgm = new Audio('assets/bgm/nazotoki.ogg');
  bgm.loop = true;
  bgm.volume = 0.4;

  showNarration([
    '夜の研究棟ーー。',
    '「この棟には3つの不思議が隠されている。',
    '全ての不思議を見つけた者だけが、最後の部屋の秘密を知ることができる」',
    '涼介と二人で、七不思議を探せ！',
  ], () => {
    bgm.play().catch(() => {});
    showRoom('hallway');
  });

  function showNarration(lines, callback) {
    layer.innerHTML = '';
    const div = document.createElement('div');
    div.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;padding:20px;cursor:pointer;';
    const textDiv = document.createElement('div');
    textDiv.style.cssText = 'color:#fff;font-size:18px;line-height:2;text-align:center;max-width:600px;white-space:pre-wrap;';
    textDiv.textContent = lines.join('\n');
    const hint = document.createElement('p');
    hint.style.cssText = 'color:rgba(255,255,255,0.4);font-size:14px;margin-top:24px;';
    hint.textContent = '（クリックで続く）';
    textDiv.appendChild(hint);
    div.appendChild(textDiv);
    div.addEventListener('click', () => { callback(); });
    layer.appendChild(div);
  }

  function showRoom(room) {
    layer.innerHTML = '';
    state.room = room;

    const bgMap = {
      hallway: 'assets/bg/kyoshitsu_yoru.jpg',
      lab: 'assets/bg/hokenshitsu.png',
      library: 'assets/bg/tosyokan.png',
      rooftop: 'assets/bg/okujo.png',
      secret: 'assets/bg/chika.png',
    };

    const bgImg = document.createElement('img');
    bgImg.src = bgMap[room];
    bgImg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(0.6);';
    layer.appendChild(bgImg);

    // 場所名表示
    const roomNames = { hallway: '廊下', lab: '実験室', library: '図書室', rooftop: '屋上', secret: '秘密の部屋' };
    const nameTag = document.createElement('div');
    nameTag.style.cssText = 'position:absolute;top:10px;right:10px;color:#fff;font-size:14px;background:rgba(0,0,0,0.6);padding:4px 12px;border-radius:4px;z-index:5;';
    nameTag.textContent = roomNames[room];
    layer.appendChild(nameTag);

    // 手がかりカウンター
    const clueCount = [state.labClueFound, state.libraryClueFound, state.rooftopClueFound].filter(Boolean).length;
    const counter = document.createElement('div');
    counter.style.cssText = 'position:absolute;top:10px;left:10px;color:#ffdd57;font-size:14px;background:rgba(0,0,0,0.6);padding:4px 12px;border-radius:4px;z-index:5;';
    counter.textContent = `不思議発見: ${clueCount}/3`;
    layer.appendChild(counter);

    if (room === 'hallway') setupHallway();
    else if (room === 'lab') setupLab();
    else if (room === 'library') setupLibrary();
    else if (room === 'rooftop') setupRooftop();
    else if (room === 'secret') setupSecret();
  }

  function addClickArea(x, y, w, h, label, onClick) {
    const area = document.createElement('div');
    area.className = 'mg-clickable';
    area.style.cssText = `left:${x}%;top:${y}%;width:${w}%;height:${h}%;position:absolute;background:rgba(255,255,200,0.12);border:1.5px solid rgba(255,255,200,0.3);border-radius:4px;`;
    const labelEl = document.createElement('span');
    labelEl.style.cssText = 'position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);color:#fff;font-size:12px;background:rgba(0,0,0,0.7);padding:3px 10px;border-radius:3px;white-space:nowrap;';
    labelEl.textContent = label;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      labelEl.style.opacity = '1';
    } else {
      labelEl.style.opacity = '0';
      area.addEventListener('mouseenter', () => { labelEl.style.opacity = '1'; area.style.background = 'rgba(255,255,200,0.25)'; });
      area.addEventListener('mouseleave', () => { labelEl.style.opacity = '0'; area.style.background = 'rgba(255,255,200,0.12)'; });
    }
    area.appendChild(labelEl);
    area.addEventListener('click', onClick);
    layer.appendChild(area);
  }

  function showDialog(text, callback) {
    const dialog = document.createElement('div');
    dialog.style.cssText = 'position:absolute;bottom:5%;left:3%;right:3%;background:linear-gradient(135deg,rgba(50,60,80,0.92),rgba(70,85,110,0.92));border:1px solid rgba(140,170,220,0.4);border-radius:4px;padding:16px 20px;color:#fff;font-size:16px;line-height:1.7;cursor:pointer;z-index:10;white-space:pre-wrap;';
    dialog.textContent = text;
    dialog.addEventListener('click', (e) => {
      e.stopPropagation();
      dialog.remove();
      if (callback) callback();
    });
    layer.appendChild(dialog);
  }

  function setupHallway() {
    // 実験室へ
    addClickArea(10, 20, 20, 40, '実験室', () => { showRoom('lab'); });
    // 図書室へ
    addClickArea(40, 20, 20, 40, '図書室', () => { showRoom('library'); });
    // 屋上へ
    addClickArea(70, 20, 20, 40, '屋上への階段', () => { showRoom('rooftop'); });

    // 秘密の扉（3つ全部見つけた後）
    const clueCount = [state.labClueFound, state.libraryClueFound, state.rooftopClueFound].filter(Boolean).length;
    if (clueCount >= 3) {
      addClickArea(35, 70, 30, 20, '光る扉', () => {
        const se = new Audio('assets/voice/key.ogg');
        se.play().catch(() => {});
        showDialog('3つの不思議の力で、隠された扉が開いた！', () => {
          showRoom('secret');
        });
      });
    }
  }

  function setupLab() {
    addClickArea(15, 25, 20, 30, '試験管', () => {
      showDialog('色とりどりの試験管が並んでいる。\n一つだけ、暗闇で光っている・・・！');
    });

    addClickArea(45, 20, 25, 35, '実験ノート', () => {
      if (!state.labClueFound) {
        state.labClueFound = true;
        const se = new Audio('assets/voice/ok.ogg');
        se.play().catch(() => {});
        showDialog('【不思議その1を発見！】\n実験ノートの最後のページに「この大学を建てた人は、ある花が好きだった」と書いてある。\nその花の名前は「桜」。', () => {
          showRoom('lab');
        });
      } else {
        showDialog('実験ノートだ。もう読んだ。');
      }
    });

    addClickArea(75, 30, 15, 25, '人体模型', () => {
      showDialog('おおはし「きゃーーー！！」\n涼介「大丈夫、ただの模型だよ。」\nおおはし「わ、分かってるし！」');
    });

    addClickArea(2, 40, 12, 30, '戻る', () => { showRoom('hallway'); });
  }

  function setupLibrary() {
    addClickArea(20, 15, 20, 40, '古い本棚', () => {
      if (!state.libraryClueFound) {
        state.libraryClueFound = true;
        const se = new Audio('assets/voice/ok.ogg');
        se.play().catch(() => {});
        showDialog('【不思議その2を発見！】\n本棚の奥から古い手紙が落ちてきた。\n「この場所で出会った二人は、必ず結ばれる」\n・・・って書いてある。ほんとかな。', () => {
          showDialog('涼介「へえ、ロマンチックな伝説だね。」\nおおはし「（ド、ドキドキ・・・！）」', () => {
            showRoom('library');
          });
        });
      } else {
        showDialog('古い本棚だ。もう調べた。');
      }
    });

    addClickArea(55, 20, 20, 35, '机の落書き', () => {
      showDialog('机に落書きがある。\n「20XX年 R.T ♡ A.O」\n・・・Rはリョウスケ？Aはアリサ？\nまさかね。');
    });

    addClickArea(80, 15, 15, 35, '怪しい本棚', () => {
      // 青鬼トラップ
      const aooni = document.createElement('div');
      aooni.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:20;';
      const img = document.createElement('img');
      img.src = 'assets/chara/aooni.png';
      img.style.cssText = 'max-width:50%;max-height:60%;';
      aooni.appendChild(img);
      const seBang = new Audio('assets/bgm/aooni.ogg');
      seBang.volume = 0.7;
      seBang.play().catch(() => {});
      layer.appendChild(aooni);
      setTimeout(() => {
        aooni.remove();
        showDialog('おおはし「ぎゃーーー！！！」\n涼介「落ち着いて！ただの置物だよ！」\nおおはし「もう帰りたい・・・」\n涼介「大丈夫、手つないであげるから。」\nおおはし「（！！！ラッキー！！！）」');
      }, 2000);
    });

    addClickArea(2, 40, 12, 30, '戻る', () => { showRoom('hallway'); });
  }

  function setupRooftop() {
    addClickArea(30, 20, 30, 30, '望遠鏡', () => {
      if (!state.rooftopClueFound) {
        state.rooftopClueFound = true;
        const se = new Audio('assets/voice/ok.ogg');
        se.play().catch(() => {});
        showDialog('【不思議その3を発見！】\n望遠鏡を覗くと、星座の中に文字が浮かんでいる。\n「勇気を出して、想いを伝えよ」\n・・・誰へのメッセージだろう。', () => {
          showDialog('涼介「星がきれいだね。望遠鏡越しだと、もっと。」\nおおはし「うん・・・きれい。」\n（二人の距離が、少し縮まった気がした）', () => {
            showRoom('rooftop');
          });
        });
      } else {
        showDialog('望遠鏡だ。星がきれい。');
      }
    });

    addClickArea(70, 30, 20, 25, '夜景', () => {
      showDialog('キャンパスの夜景が一望できる。\n涼介「いい景色だね。」\nおおはし「うん、来てよかった。」');
    });

    addClickArea(2, 40, 12, 30, '戻る', () => { showRoom('hallway'); });
  }

  function setupSecret() {
    addClickArea(30, 25, 35, 40, '光る石碑', () => {
      showNarration([
        '石碑にはこう刻まれていた。',
        '',
        '「この場所にたどり着いた二人へ。',
        '　不思議を探す勇気があるなら、',
        '　想いを伝える勇気もあるはず。',
        '　大切な人に、素直になれ。」',
        '',
        'おおはし「・・・なんか、ジーンときた。」',
        '涼介「・・・うん、僕も。」',
      ], () => {
        // ミニゲーム完了
        bgm.pause();
        layer.classList.add('hidden');
        layer.innerHTML = '';
        if (onCompleteLabel) {
          engine.jumpTo(onCompleteLabel);
        } else {
          engine.next();
        }
      });
    });

    addClickArea(2, 40, 12, 30, '戻る', () => { showRoom('hallway'); });
  }
};
