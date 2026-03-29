/* ============================
   おおはしメモリアル3 ～咲いた、春～
   シナリオデータ
   ============================ */

const SCENARIO = [

  // ===== プロローグ：入学式 =====
  { label: 'start', type: 'bg', file: 'bg_base.png', transition: 'none' },

  { label: 'prologue', type: 'bg', file: 'title.jpg' },
  { type: 'overlay', color: 'rgba(0,0,0,0.6)' },
  { type: 'text', name: '', text: 'あの夏から半年ーー。\n旭丘高校を卒業したおおはしは、南山大学に進学した。\n高校最後の恋は、ほろ苦い結末を迎えたけれど、\nその経験が彼女を少しだけ、大人にさせた。' },
  { type: 'text', name: '', text: '桜が満開のキャンパス。\n新しい出会いと、新しい自分を見つける物語が、今はじまるーー。\n\nシリーズ累計500万DL突破の「おおはしメモリアル」待望の最新作。' },
  { type: 'overlay_hide' },

  // 入学式後のキャンパス
  { type: 'bgm', file: 'kyoshitsu.ogg' },
  { type: 'bg', file: 'nakaniwa.png' },
  { type: 'chara', file: '02_yorokobu.png', pos: 'center' },
  { type: 'text', name: 'おおはし', text: '入学式終わったー！いよいよ大学生だ！\n高校のときは色々あったけど・・・\n今日からは新しい私！キャンパスライフ、楽しむぞー！' },
  { type: 'text', name: 'おおはし', text: 'それにしても、広いなあこのキャンパス。\n迷子になりそう・・・。あ、掲示板にサークル勧誘のビラがいっぱい。' },
  { type: 'chara_hide', pos: 'center' },

  // 涼介との出会い
  { type: 'chara', file: 'kodama.png', pos: 'right' },
  { type: 'text', name: '？？？', text: 'あの、新入生の方ですか？迷ってません？' },
  { type: 'chara', file: '05_odoroku.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: 'え！あ、はい、ちょっとキャンパス広くて・・・' },
  { type: 'text', name: '涼介', text: '僕は2年の田中涼介。テニスサークルの副部長やってます。\nよかったら案内しますよ。あと、うちのサークルも見学来てみない？' },
  { type: 'chara', file: '07_tereru.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '心の声：え、なにこの人、めっちゃ爽やか・・・！\n高校のときの児玉くんを思い出す・・・いや、ダメダメ！もう引きずらない！' },

  { label: 'prologue_choice', type: 'choice', choices: [
    { text: '①ぜひお願いします！（素直に甘える）', jump: 'prologue_c1' },
    { text: '②大丈夫です、一人で探検します（強がる）', jump: 'prologue_c2' },
    { text: '③テニスサークル・・・運命感じます！！！', recommended: true, jump: 'prologue_c3' },
  ]},

  { label: 'prologue_c1', type: 'chara', file: '01_hutu.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '心の声：無難にいったわね。でも悪くない出だし。' },
  { type: 'jump', target: 'prologue_after' },

  { label: 'prologue_c2', type: 'chara', file: '03_okoru.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '心の声：なんで強がっちゃうのよ私・・・！' },
  { type: 'text', name: '涼介', text: 'あはは、頼もしいね。でも困ったらいつでも声かけて。じゃあね。' },
  { type: 'jump', target: 'prologue_after' },

  { label: 'prologue_c3', type: 'chara', file: '02_yorokobu.png', pos: 'left' },
  { type: 'text', name: '涼介', text: 'あはは、面白い子だね！いいね、その勢い！\n来週の火曜、体験入部やってるから来てよ。' },
  { type: 'text', name: 'おおはし', text: '心の声：よし！高校のときのビタミンパワー、健在ね！' },

  { label: 'prologue_after', type: 'chara_hide_all' },
  { type: 'bgm_stop', fadeOut: 1500 },

  // ===== 第1幕：キャンパスデビュー =====
  { label: 'act1', type: 'bg', file: 'kyoshitsu_yu.jpg' },
  { type: 'item', file: 'chapter1_kuriki.png', style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', maxWidth: '70%', pointerEvents: 'none' } },
  { type: 'overlay', color: 'rgba(0,0,0,0.7)' },
  { type: 'text', name: '', text: '第1幕：キャンパスデビュー' },
  { type: 'item_hide' },
  { type: 'overlay_hide' },
  { type: 'bgm', file: 'kyoshitsu.ogg' },

  // 教室での自己紹介
  { type: 'bg', file: 'kyoshitsu_yu.jpg' },
  { type: 'chara', file: 'makoto.png', pos: 'center' },
  { type: 'text', name: '山田教授', text: '基礎ゼミのメンバーが揃ったところで、自己紹介をしましょうか。\n一人ずつ、名前と出身高校、趣味を話してください。' },
  { type: 'chara_hide', pos: 'center' },

  { type: 'chara', file: 'kuriki.png', pos: 'center' },
  { type: 'text', name: '健太', text: '東邦高校出身の佐藤健太です。\n趣味はフットサルとラーメン巡り。よろしくー！' },
  { type: 'chara_hide', pos: 'center' },

  { type: 'chara', file: 'meguchan.png', pos: 'center' },
  { type: 'text', name: '美咲', text: '椙山女学園出身の鈴木美咲です。\nおしゃれとカフェ巡りが好きです。仲良くしてね♪' },
  { type: 'chara_hide', pos: 'center' },

  { label: 'act1_intro_choice', type: 'choice', choices: [
    { text: '①旭丘高校出身のおおはしです。テニスが好きです。よろしくお願いします。', jump: 'act1_intro_c1' },
    { text: '②旭丘出身、おおはしです。最近の趣味は自分磨き。内面も外見も高めていきたいです。', jump: 'act1_intro_c2' },
    { text: '③皆さん初めまして！長久手のビタミンガール改め、大学のビタミンクイーンこと、おおはし☆ありさです！柑橘パワーで単位も恋もゲットしちゃうゾ☆彡', recommended: true, jump: 'act1_intro_c3' },
  ]},

  { label: 'act1_intro_c1', type: 'chara', file: '06_ayasimu.png', pos: 'center' },
  { type: 'text', name: 'おおはし', text: '心の声：いや、普通やな・・・大学デビュー失敗かも。' },
  { type: 'jump', target: 'act1_intro_choice' },

  { label: 'act1_intro_c2', type: 'chara', file: '06_ayasimu.png', pos: 'center' },
  { type: 'text', name: 'おおはし', text: '心の声：意識高い系になっちゃった・・・引かれてない？' },
  { type: 'jump', target: 'act1_intro_choice' },

  { label: 'act1_intro_c3', type: 'chara', file: 'kuriki.png', pos: 'center' },
  { type: 'text', name: '健太', text: 'すげー！この子おもしれー！！ビタミンクイーンｗｗｗ' },
  { type: 'chara_hide', pos: 'center' },
  { type: 'chara', file: 'meguchan.png', pos: 'center' },
  { type: 'text', name: '美咲', text: 'あはは！ありさちゃんって呼んでいい？絶対仲良くなれる気がする！' },
  { type: 'chara_hide', pos: 'center' },
  { type: 'chara', file: '02_yorokobu.png', pos: 'center' },
  { type: 'text', name: 'おおはし', text: '心の声：つかみはOK！高校3年間で磨いたコミュ力、ダテじゃないわ！' },
  { type: 'chara_hide', pos: 'center' },

  // サークル体験入部
  { label: 'act1_circle', type: 'bg', file: 'nakaniwa.png' },
  { type: 'text', name: '', text: '数日後ーー テニスサークルの体験入部にやってきたおおはし。' },
  { type: 'chara', file: 'kodama.png', pos: 'right' },
  { type: 'text', name: '涼介', text: 'お、来てくれたんだ！嬉しいな。\nまずは軽くラリーしよう。ラケットは貸すよ。' },
  { type: 'chara', file: '02_yorokobu.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '実は高校のとき女テニだったんです。ちょっとだけ自信あります！' },
  { type: 'text', name: '涼介', text: 'まじで！？じゃあ本気出していいかな？' },
  { type: 'chara', file: '03_okoru.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: 'もちろん！負けませんよ、先輩！' },

  { type: 'text', name: '', text: '～ 白熱のラリーの末 ～' },

  { type: 'chara', file: '07_tereru.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: 'はぁ・・・はぁ・・・先輩、強すぎ・・・！' },
  { type: 'text', name: '涼介', text: 'いやいや、めちゃくちゃ上手いよ！\n経験者がサークルに入ってくれると助かるな。どう、正式に入らない？' },

  { type: 'choice', choices: [
    { text: '①入ります！（即答）', jump: 'act1_join' },
    { text: '②先輩がいるなら、入ります（意味深）', recommended: true, jump: 'act1_join_flirt' },
  ]},

  { label: 'act1_join', type: 'chara', file: '02_yorokobu.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '入ります！よろしくお願いします！' },
  { type: 'text', name: '涼介', text: 'よろしく！楽しくやろう！' },
  { type: 'jump', target: 'act1_end' },

  { label: 'act1_join_flirt', type: 'chara', file: '07_tereru.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '先輩がいるなら・・・入ります♪' },
  { type: 'text', name: '涼介', text: 'え・・・あはは。からかわないでよ。\nでも、嬉しいな。よろしくね。' },
  { type: 'text', name: 'おおはし', text: '心の声：あ、照れた。かわいい・・・！ポイント高い！' },

  { label: 'act1_end', type: 'chara_hide_all' },
  { type: 'bgm_stop', fadeOut: 1500 },

  // ===== 第2幕：サークル活動 =====
  { label: 'act2', type: 'bg', file: 'nakaniwa.png' },
  { type: 'overlay', color: 'rgba(0,0,0,0.7)' },
  { type: 'text', name: '', text: '第2幕：青春リターンズ' },
  { type: 'overlay_hide' },
  { type: 'bgm', file: 'nakaniwa.ogg' },

  { type: 'text', name: '', text: '大学生活が始まって1ヶ月。\nサークル活動にもすっかり馴染んだおおはし。\n涼介先輩とも、練習のたびに話すようになった。' },

  // 美咲との会話
  { type: 'bg', file: 'room.jpg' },
  { type: 'chara', file: 'meguchan.png', pos: 'right' },
  { type: 'chara', file: '01_hutu.png', pos: 'left' },
  { type: 'text', name: '美咲', text: 'ねえありさちゃん、涼介先輩のこと気になってるでしょ？' },
  { type: 'chara', file: '05_odoroku.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: 'え！？そんなこと・・・！' },
  { type: 'text', name: '美咲', text: '顔に書いてあるよ～♪ 涼介先輩、優しいしカッコいいもんね。\nでもね、先輩には過去に何かあったみたいで、恋愛には慎重らしいよ。' },
  { type: 'chara', file: '06_ayasimu.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '心の声：過去に何か・・・私と同じなのかな。' },
  { type: 'chara_hide_all' },

  // 合宿
  { type: 'bg', file: 'yozora.jpg' },
  { type: 'text', name: '', text: '～ サークル合宿・夜の自由時間 ～' },
  { type: 'chara', file: 'kodama.png', pos: 'right' },
  { type: 'chara', file: '01_hutu.png', pos: 'left' },
  { type: 'text', name: '涼介', text: '星がきれいだね。こうやってゆっくり話すの、初めてかも。' },
  { type: 'text', name: 'おおはし', text: 'うん・・・先輩は、どうしてテニスサークル入ったんですか？' },
  { type: 'text', name: '涼介', text: '実はさ、高校のとき・・・好きな子がいたんだ。\nテニス部だった子。でも、勇気が出なくて、結局何も言えないまま卒業しちゃった。' },
  { type: 'text', name: '涼介', text: 'だから大学では後悔しないように、好きなことには全力で向き合おうって思って。' },
  { type: 'chara', file: '07_tereru.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '心の声：先輩も・・・同じだったんだ。胸が、きゅってなる。' },

  { type: 'choice', choices: [
    { text: '①実は私も、高校で失恋したんです（本音を打ち明ける）', jump: 'act2_honest' },
    { text: '②先輩、カッコいいですね（さらっと流す）', jump: 'act2_cool' },
    { text: '③・・・その子、テニス上手かったですか？私より？', recommended: true, jump: 'act2_playful' },
  ]},

  { label: 'act2_honest', type: 'text', name: 'おおはし', text: '実は私も・・・高校のとき、好きな人がいて。\n告白したけど、フラれちゃったんです。' },
  { type: 'text', name: '涼介', text: 'そうだったんだ。じゃあ僕たち、似た者同士だね。' },
  { type: 'text', name: '涼介', text: '・・・でも、おかげで今ここで会えたわけだし。悪いことばかりじゃないよね。' },
  { type: 'jump', target: 'act2_gasshuku_end' },

  { label: 'act2_cool', type: 'text', name: 'おおはし', text: '先輩、カッコいいですね。そういう真っ直ぐなところ。' },
  { type: 'text', name: '涼介', text: 'そ、そうかな・・・ありがと。' },
  { type: 'jump', target: 'act2_gasshuku_end' },

  { label: 'act2_playful', type: 'chara', file: '03_okoru.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '・・・その子、テニス上手かったですか？私より？' },
  { type: 'text', name: '涼介', text: 'あはは！そこ気になるの！？\n・・・うーん、正直、おおはしの方が上手い。ダントツで。' },
  { type: 'chara', file: '02_yorokobu.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: 'よし！じゃあ先輩の中で、私はもう「その子」を超えたってことですね！' },
  { type: 'text', name: '涼介', text: '・・・テニスだけじゃなくて、色々超えてるかも。' },
  { type: 'chara', file: '07_tereru.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '心の声：い、今のはズルい・・・！心臓がうるさい・・・！' },

  { label: 'act2_gasshuku_end', type: 'chara_hide_all' },
  { type: 'bgm_stop', fadeOut: 1500 },

  // 好感度シナリオ導入
  { label: 'date_intro', type: 'bg', file: 'ekimae_hiru.jpg' },
  { type: 'overlay', color: 'rgba(0,0,0,0.7)' },
  { type: 'chara', file: 'F.png', pos: 'center' },
  { type: 'text', name: '語り部', text: '合宿で二人の距離がグッと縮まったようじゃな。\nここからは、涼介とのデートイベントじゃ。\n選択肢によって好感度が変わるぞ。先輩のハートを射止められるか、お主次第じゃ！' },
  { type: 'chara_hide', pos: 'center' },
  { type: 'overlay_hide' },

  // 好感度シナリオ開始
  { type: 'call', fn: (engine) => { window.startAffinity3(engine); }, async: true },

  // ===== 第3幕：学園祭 =====
  { label: 'act3', type: 'bg', file: 'nakaniwa.png' },
  { type: 'overlay', color: 'rgba(0,0,0,0.7)' },
  { type: 'text', name: '', text: '第3幕：咲く、想い' },
  { type: 'overlay_hide' },

  { type: 'text', name: '', text: '秋ーー。\n大学祭のシーズン。テニスサークルは模擬店を出すことになった。\nおおはしは涼介と同じシフトに入った。' },

  { type: 'bgm', file: 'nakaniwa.ogg' },
  { type: 'chara', file: '02_yorokobu.png', pos: 'left' },
  { type: 'chara', file: 'kodama.png', pos: 'right' },
  { type: 'text', name: 'おおはし', text: '先輩！焼きそば完売しました！やったー！' },
  { type: 'text', name: '涼介', text: 'おつかれ！おおはしの客引きが上手すぎてさ。天性の才能だよ。' },
  { type: 'text', name: 'おおはし', text: 'えへへ。ビタミンクイーンの名は伊達じゃないですからね！' },

  { type: 'text', name: '涼介', text: 'そういえば、このあと後夜祭でキャンプファイヤーがあるんだけど・・・\n一緒にまわらない？' },
  { type: 'chara', file: '07_tereru.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '心の声：後夜祭のキャンプファイヤー・・・それって、もしかして・・・！' },

  { type: 'choice', choices: [
    { text: '行きます！（即答）', jump: 'act3_bonfire' },
  ]},

  // 後夜祭
  { label: 'act3_bonfire', type: 'bg', file: 'yozora.jpg' },
  { type: 'bgm', file: 'yocho.ogg', fadeIn: 2000 },
  { type: 'chara', file: '07_tereru.png', pos: 'left' },
  { type: 'chara', file: 'kodama.png', pos: 'right' },
  { type: 'text', name: 'おおはし', text: '火がきれい・・・。ちょっと暖かいね。' },
  { type: 'text', name: '涼介', text: 'おおはしさ・・・ずっと言おうと思ってたことがあるんだ。' },
  { type: 'chara', file: '05_odoroku.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '心の声：え・・・これって・・・まさか・・・！' },

  { type: 'text', name: '涼介', text: '最初にキャンパスで会ったとき、正直ただ明るい子だなって思ってた。\nでも、一緒にテニスして、話して、合宿で色々打ち明けて・・・\nいつの間にか、おおはしのことばかり考えるようになってた。' },

  { type: 'text', name: '涼介', text: '高校のとき、好きな子に何も言えなかった後悔がある。\nだから今度は、ちゃんと言葉にしたい。' },

  { type: 'chara', file: '07_tereru.png', pos: 'left' },
  { type: 'text', name: '涼介', text: 'おおはし・・・俺と、付き合ってくれませんか。' },

  { type: 'choice', choices: [
    { text: '・・・はい！！！', jump: 'act3_yes' },
    { text: '（涙が出て声にならない。でも、大きくうなずく）', jump: 'act3_yes' },
  ]},

  { label: 'act3_yes', type: 'chara', file: '04_naku.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '・・・っ、はい・・・！\n私も・・・先輩のこと、ずっと好きでした。' },
  { type: 'text', name: 'おおはし', text: '高校のとき、失恋して、もう恋なんてしないって思ってた。\nでも・・・先輩に出会えて、また好きになれた。\nだから・・・すごく、嬉しい。' },
  { type: 'text', name: '涼介', text: '・・・ありがとう。俺も、おおはしに出会えてよかった。' },
  { type: 'chara_hide_all' },
  { type: 'bgm_stop', fadeOut: 2000 },

  // 回想
  { type: 'overlay', color: 'rgba(0,0,0,0.6)' },
  { type: 'text', name: '', text: '高校の鯱光祭で告白してフラれた、あの日。\n泣きながら握りしめた手紙。燃やした夏の記憶。\nあの経験があったから、今の自分がいる。' },
  { type: 'text', name: '', text: 'あの夏、燃やした想いは、\nこの春、花を咲かせた。' },
  { type: 'overlay_hide' },

  // ===== エピローグ =====
  { label: 'epilogue', type: 'bg', file: 'title.jpg' },
  { type: 'bgm', file: 'kenmei_300k.ogg' },
  { type: 'chara', file: '02_yorokobu.png', pos: 'left' },
  { type: 'chara', file: 'kodama.png', pos: 'right' },
  { type: 'text', name: '', text: '翌年の春ーー。\n桜が満開のキャンパスを、二人並んで歩いている。' },
  { type: 'text', name: 'おおはし', text: '涼介、今日で付き合って半年だね。' },
  { type: 'text', name: '涼介', text: 'そうだね。あっという間だった。' },
  { type: 'text', name: 'おおはし', text: 'ね。ところで・・・' },

  { type: 'choice', choices: [
    { text: '手、つないでもいい？', jump: 'epilogue_hand' },
  ]},

  { label: 'epilogue_hand', type: 'chara', file: '07_tereru.png', pos: 'left' },
  { type: 'text', name: 'おおはし', text: '・・・手、つないでもいい？' },
  { type: 'text', name: '涼介', text: '・・・もちろん。' },
  { type: 'text', name: '', text: '高校のとき、言えなかったあの言葉。\n今、ようやく叶った。' },

  { type: 'chara_hide_all' },
  { type: 'msg_hide' },
  { type: 'wait', duration: 2000 },

  // エンディング
  { label: 'ending', type: 'bg', file: 'bg_base.png' },
  { type: 'overlay', color: 'rgba(0,0,0,1)' },
  { type: 'item', file: 'fin.png' },
  { type: 'wait', duration: 3000 },
  { type: 'item_hide' },

  { type: 'text', name: '', text: 'おおはしメモリアル3　～咲いた、春～\n\nfin.' },
  { type: 'wait', duration: 2000 },
  { type: 'overlay_hide' },
  { type: 'msg_hide' },
  { type: 'bgm_stop', fadeOut: 3000 },
  { type: 'title_screen' },
];
