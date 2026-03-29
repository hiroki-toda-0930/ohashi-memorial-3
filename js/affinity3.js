/* ============================
   好感度シナリオ：涼介とのデート
   カフェ → 水族館 → 観覧車
   ============================ */

window.startAffinity3 = function(engine) {
  engine.affinityScore = 0;
  engine.showAffinity();
  engine.updateAffinity();

  const dateScenario = [
    // 場面①：カフェで待ち合わせ
    { label: 'date_start', type: 'bg', file: 'room.jpg' },
    { type: 'bgm', file: 'nakaniwa.ogg' },
    { type: 'chara', file: '02_yorokobu.png', pos: 'left' },
    { type: 'chara', file: 'kodama.png', pos: 'right' },
    { type: 'text', name: '涼介', text: '今日はゆっくりできるね。何飲む？' },
    { type: 'text', name: 'おおはし', text: '（カフェデートでの第一手は・・・）' },
    { type: 'choice', choices: [
      { text: '①同じものをお願いします♪（おそろい作戦）', affinity: 25, jump: 'date1_r1' },
      { text: '②先輩のおすすめで！（頼る作戦）', affinity: 20, jump: 'date1_r2' },
      { text: '③ブラックコーヒー（大人アピール）', affinity: 10, jump: 'date1_r3' },
      { text: '④抹茶ラテのホイップ多めで！（素直）', affinity: 15, jump: 'date1_r4' },
    ]},

    { label: 'date1_r1', type: 'text', name: '涼介', text: 'おそろいだ。なんか嬉しいね。' },
    { type: 'jump', target: 'date_scene2' },
    { label: 'date1_r2', type: 'text', name: '涼介', text: 'じゃあ特別ブレンドで。きっと気に入ると思う。' },
    { type: 'jump', target: 'date_scene2' },
    { label: 'date1_r3', type: 'text', name: '涼介', text: 'ブラック・・・大人だね。（でも顔がちょっと苦そう）' },
    { type: 'jump', target: 'date_scene2' },
    { label: 'date1_r4', type: 'text', name: '涼介', text: 'ホイップ多め、わかる！甘いもの好きなんだ。' },
    { type: 'jump', target: 'date_scene2' },

    // 場面②：水族館
    { label: 'date_scene2', type: 'bg', file: 'chika.png' },
    { type: 'text', name: '', text: '～ 水族館にて ～' },
    { type: 'text', name: '涼介', text: 'うわ、クラゲきれいだね。' },
    { type: 'text', name: 'おおはし', text: '（暗い館内で二人きり・・・距離を縮めるチャンス！）' },
    { type: 'choice', choices: [
      { text: '①ねえ、あの魚なんだろう？（自然に近づく）', affinity: 20, jump: 'date2_r1' },
      { text: '②はぐれないように・・・袖つかんでいい？', affinity: 25, jump: 'date2_r2' },
      { text: '③先輩、ペンギンに似てますね', affinity: 10, jump: 'date2_r3' },
      { text: '④じっくり解説を読み込む（知的アピール）', affinity: 15, jump: 'date2_r4' },
    ]},

    { label: 'date2_r1', type: 'text', name: '涼介', text: 'どれどれ・・・近いね。あ、これマンボウだよ。' },
    { type: 'jump', target: 'date_scene3' },
    { label: 'date2_r2', type: 'text', name: '涼介', text: '・・・うん、いいよ。はぐれないようにね。' },
    { type: 'jump', target: 'date_scene3' },
    { label: 'date2_r3', type: 'text', name: '涼介', text: 'ペンギン！？どこが！？' },
    { type: 'jump', target: 'date_scene3' },
    { label: 'date2_r4', type: 'text', name: '涼介', text: '真剣に読んでるね。意外と博識なんだ。' },
    { type: 'jump', target: 'date_scene3' },

    // 場面③：お土産ショップ
    { label: 'date_scene3', type: 'bg', file: 'ekimae_hiru.jpg' },
    { type: 'text', name: '', text: '～ お土産ショップ ～' },
    { type: 'text', name: 'おおはし', text: '見て、このぬいぐるみかわいい！' },
    { type: 'text', name: '涼介', text: '好きなの選んでいいよ。今日は俺のおごり。' },
    { type: 'text', name: 'おおはし', text: '（先輩がプレゼントしてくれるって！何を選ぶ？）' },
    { type: 'choice', choices: [
      { text: '①ペンギンのぬいぐるみ（さっきの伏線回収）', affinity: 25, jump: 'date3_r1' },
      { text: '②ペアのストラップ（攻めの一手）', affinity: 15, jump: 'date3_r2' },
      { text: '③いいよ、気持ちだけで嬉しい（遠慮）', affinity: 10, jump: 'date3_r3' },
      { text: '④一番高いやつ（欲望に忠実）', affinity: 20, jump: 'date3_r4' },
    ]},

    { label: 'date3_r1', type: 'text', name: '涼介', text: 'ペンギン・・・さっきの仕返し？でも可愛いね、これにしよう。' },
    { type: 'jump', target: 'date_scene4' },
    { label: 'date3_r2', type: 'text', name: '涼介', text: 'ペ、ペア？・・・いいよ、つけるよ。' },
    { type: 'jump', target: 'date_scene4' },
    { label: 'date3_r3', type: 'text', name: '涼介', text: '遠慮しないで。・・・じゃあ俺が選んでいい？' },
    { type: 'jump', target: 'date_scene4' },
    { label: 'date3_r4', type: 'text', name: '涼介', text: '正直でいいね！はいどうぞ。' },
    { type: 'jump', target: 'date_scene4' },

    // 場面④：観覧車（全て減点）
    { label: 'date_scene4', type: 'bg', file: 'yozora.jpg' },
    { type: 'text', name: '', text: '～ 観覧車にて ～' },
    { type: 'text', name: '涼介', text: '夜景がきれいだね。今日、楽しかった。' },
    { type: 'text', name: 'おおはし', text: '（二人きりの観覧車・・・言いたい言葉がある。でも・・・）' },
    { type: 'choice', choices: [
      { text: '①先輩、好きです', affinity: -20, jump: 'date4_r1' },
      { text: '②ずっと一緒にいたい', affinity: -25, jump: 'date4_r2' },
      { text: '③先輩のこと独占したい', affinity: -25, jump: 'date4_r3' },
      { text: '④I love you more than tennis', affinity: -30, jump: 'date4_r4' },
    ]},

    { label: 'date4_r1', type: 'text', name: '涼介', text: '・・・' },
    { type: 'jump', target: 'date_scene5' },
    { label: 'date4_r2', type: 'text', name: '涼介', text: '・・・' },
    { type: 'jump', target: 'date_scene5' },
    { label: 'date4_r3', type: 'text', name: '涼介', text: '・・・' },
    { type: 'jump', target: 'date_scene5' },
    { label: 'date4_r4', type: 'text', name: '涼介', text: '・・・' },
    { type: 'jump', target: 'date_scene5' },

    // 場面⑤：帰り道
    { label: 'date_scene5', type: 'bg', file: 'ekimae_yoru.jpg' },
    { type: 'text', name: 'おおはし', text: '今日は本当に楽しかったです。ありがとうございました！' },
    { type: 'text', name: '涼介', text: '俺の方こそ。おおはしといると、時間があっという間だよ。' },
    { type: 'text', name: 'おおはし', text: '（最後に、もう一言・・・）' },
    { type: 'choice', choices: [
      { text: '①また誘ってくださいね', affinity: 5, jump: 'date5_r1' },
      { text: '②次は私がプランニングします！', affinity: 5, jump: 'date5_r2' },
      { text: '③電車来るまで、もう少しだけ一緒にいて', affinity: 5, jump: 'date5_r3' },
      { text: '④今日の夜空、きれいですね', affinity: 80, jump: 'date5_r4' },
    ]},

    { label: 'date5_r1', type: 'text', name: '涼介', text: 'もちろん。今度は俺から誘うよ。' },
    { type: 'jump', target: 'date_result' },
    { label: 'date5_r2', type: 'text', name: '涼介', text: '楽しみにしてる！' },
    { type: 'jump', target: 'date_result' },
    { label: 'date5_r3', type: 'text', name: '涼介', text: '・・・うん、もちろん。' },
    { type: 'jump', target: 'date_result' },
    { label: 'date5_r4', type: 'text', name: '涼介', text: '・・・月がきれいだよ。おおはしの隣だと、特に。' },
    { type: 'text', name: 'おおはし', text: '心の声：・・・！！！それって・・・！！！' },
    { type: 'jump', target: 'date_result' },

    // 結果判定
    { label: 'date_result', type: 'if',
      condition: (vars, affinity) => affinity >= 80,
      jump: 'date_good',
      elseJump: 'date_bad'
    },

    // Good End
    { label: 'date_good', type: 'text', name: '涼介', text: '・・・また、こうして二人で出かけたいな。今度は、デートとして。' },
    { type: 'item', file: 'memory2.png' },
    { type: 'wait', duration: 2500 },
    { type: 'item_hide' },
    { type: 'jump', target: 'date_end' },

    // Bad End
    { label: 'date_bad', type: 'text', name: '涼介', text: '今日はありがとう。また練習で。じゃあね。' },
    { type: 'jump', target: 'date_rating' },

    // 女子力診断
    { label: 'date_rating', type: 'call', fn: (eng) => {
      const score = eng.affinityScore;
      let title = '';
      if (score <= 20) title = '恋愛偏差値30';
      else if (score <= 40) title = '恋愛初心者';
      else if (score <= 60) title = '恋愛中級者';
      else title = 'あと一歩で恋の達人';

      eng.overlay.classList.remove('hidden');
      eng.overlay.style.background = 'rgba(0,0,0,0.7)';
      eng.charaCenter.src = 'assets/chara/F.png';
      eng.charaCenter.classList.remove('hidden');
      eng.messageWindow.classList.remove('hidden');
      eng.nameBox.textContent = '語り部';
      eng.messageText.textContent = `恋愛力診断の結果を発表するぞ。\nお主の恋愛力は「${score}点、${title}」じゃ。`;
      eng.nextIndicator.style.visibility = 'visible';
      eng.waitingForClick = true;

      const waitHandler = (e) => {
        if (e.target.closest('.choice-btn')) return;
        document.getElementById('game-container').removeEventListener('click', waitHandler);
        eng.waitingForClick = false;
        eng.overlay.classList.add('hidden');
        eng.charaCenter.classList.add('hidden');

        eng.choiceLayer.classList.remove('hidden');
        eng.choiceLayer.innerHTML = '';

        const btn1 = document.createElement('button');
        btn1.className = 'choice-btn';
        btn1.textContent = 'デートをやり直す';
        btn1.addEventListener('click', (e) => {
          e.stopPropagation();
          eng.choiceLayer.classList.add('hidden');
          eng.affinityScore = 0;
          eng.updateAffinity();
          eng.loadScenario(dateScenario);
          eng.start();
        });

        const btn2 = document.createElement('button');
        btn2.className = 'choice-btn';
        btn2.textContent = '次に進む';
        btn2.addEventListener('click', (e) => {
          e.stopPropagation();
          eng.choiceLayer.classList.add('hidden');
          eng.hideAffinity();
          eng.bgmAudio.pause();
          eng.loadScenario(SCENARIO);
          eng.jumpTo('act3');
        });

        eng.choiceLayer.appendChild(btn1);
        eng.choiceLayer.appendChild(btn2);
      };
      document.getElementById('game-container').addEventListener('click', waitHandler);
    }, async: true },

    // Good End → 次へ
    { label: 'date_end', type: 'call', fn: (eng) => {
      eng.hideAffinity();
      eng.bgmAudio.pause();
      eng.charaLeft.classList.add('hidden');
      eng.charaRight.classList.add('hidden');
      eng.charaCenter.classList.add('hidden');
      eng.loadScenario(SCENARIO);
      eng.jumpTo('act3');
    }, async: true },
  ];

  engine.loadScenario(dateScenario);
  engine.start();
};
