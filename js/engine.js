/* ============================
   Visual Novel Engine
   ============================ */

class VNEngine {
  constructor() {
    // DOM elements
    this.bgImage = document.getElementById('bg-image');
    this.bgImageNext = document.getElementById('bg-image-next');
    this.overlay = document.getElementById('overlay');
    this.charaLeft = document.getElementById('chara-left');
    this.charaCenter = document.getElementById('chara-center');
    this.charaRight = document.getElementById('chara-right');
    this.itemLayer = document.getElementById('item-layer');
    this.messageWindow = document.getElementById('message-window');
    this.nameBox = document.getElementById('name-box');
    this.messageText = document.getElementById('message-text');
    this.nextIndicator = document.getElementById('next-indicator');
    this.choiceLayer = document.getElementById('choice-layer');
    this.inputLayer = document.getElementById('input-layer');
    this.inputField = document.getElementById('input-field');
    this.inputPrompt = document.getElementById('input-prompt');
    this.movieLayer = document.getElementById('movie-layer');
    this.moviePlayer = document.getElementById('movie-player');
    this.miniMenu = document.getElementById('mini-menu');
    this.affinityMeter = document.getElementById('affinity-meter');
    this.affinityBar = document.getElementById('affinity-bar');
    this.affinityScoreEl = document.getElementById('affinity-score');
    this.minigameLayer = document.getElementById('minigame-layer');

    // State
    this.scenario = [];
    this.currentIndex = 0;
    this.isTyping = false;
    this.typeTimer = null;
    this.typeSpeed = 30; // ms per char
    this.fullText = '';
    this.waitingForClick = false;
    this.waitingForChoice = false;
    this.waitingForInput = false;
    this.currentBgm = null;
    this.bgmAudio = new Audio();
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = 0.5;
    this.seAudio = new Audio();
    this.seAudio.volume = 0.7;
    this.voiceAudio = new Audio();
    this.voiceAudio.volume = 0.8;
    this.variables = {};
    this.affinityScore = 0;
    this.isSkipping = false;
    this.windowHidden = false;
    this.saveSlotCount = 6;

    this._bindEvents();
  }

  _bindEvents() {
    const container = document.getElementById('game-container');
    this._isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // UIパーツ（ボタン等）はclickイベントで処理
    // ゲーム画面タップはtouchend優先、PCはclick
    const interactiveSelector = '#mini-menu, #full-menu, #saveload-screen, .choice-btn, #input-layer, .menu-item, .title-btn, .mini-btn, .save-slot, button';

    if (this._isTouchDevice) {
      // タッチデバイス: touchendでゲーム進行、ボタンはclickのまま
      container.addEventListener('touchend', (e) => {
        if (e.target.closest(interactiveSelector)) return;
        e.preventDefault();
        this._onClick(e);
      }, { passive: false });

      // タッチ中のスクロール・ズーム防止
      container.addEventListener('touchmove', (e) => {
        if (!e.target.closest('#save-slots, #input-field')) {
          e.preventDefault();
        }
      }, { passive: false });
    } else {
      // PC: clickのみ
      container.addEventListener('click', (e) => this._onClick(e));
    }

    // Menu buttons — タッチ・クリック両対応ヘルパー
    const addTap = (el, handler) => {
      el.addEventListener('click', (e) => { e.stopPropagation(); handler(); });
      if (this._isTouchDevice) {
        el.addEventListener('touchend', (e) => { e.preventDefault(); e.stopPropagation(); handler(); }, { passive: false });
      }
    };

    addTap(document.getElementById('btn-menu'), () => this.showMenu());
    addTap(document.getElementById('btn-close-menu'), () => this.hideMenu());
    addTap(document.getElementById('btn-save'), () => this.showSaveLoad('save'));
    addTap(document.getElementById('btn-load'), () => this.showSaveLoad('load'));
    addTap(document.getElementById('btn-hide'), () => this.toggleWindow());
    addTap(document.getElementById('btn-skip'), () => this.toggleSkip());
    addTap(document.getElementById('btn-title'), () => this.backToTitle());
    addTap(document.getElementById('btn-back-menu'), () => this.hideSaveLoad());

    // Input OK
    const inputOk = document.getElementById('input-ok');
    addTap(inputOk, () => this._onInputSubmit());
    this.inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._onInputSubmit();
    });
  }

  _onClick(e) {
    if (e.target.closest('#mini-menu, #full-menu, #saveload-screen, #choice-layer, #input-layer')) return;

    if (this.windowHidden) {
      this.windowHidden = false;
      this.messageWindow.classList.remove('hidden');
      return;
    }

    if (this.isTyping) {
      this._finishTyping();
      return;
    }

    if (this.waitingForClick) {
      this.waitingForClick = false;
      this.next();
    }
  }

  // ===== Scenario Control =====

  loadScenario(scenario) {
    this.scenario = scenario;
    this.currentIndex = 0;
  }

  start() {
    this.currentIndex = 0;
    this.execute();
  }

  jumpTo(label) {
    const idx = this.scenario.findIndex(cmd => cmd.label === label);
    if (idx !== -1) {
      this.currentIndex = idx;
      this.execute();
    } else {
      console.warn('Label not found:', label);
    }
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex < this.scenario.length) {
      this.execute();
    }
  }

  execute() {
    if (this.currentIndex >= this.scenario.length) return;

    const cmd = this.scenario[this.currentIndex];
    if (!cmd) return;

    switch (cmd.type) {
      case 'bg': this._cmdBg(cmd); break;
      case 'bgm': this._cmdBgm(cmd); break;
      case 'bgm_stop': this._cmdBgmStop(cmd); break;
      case 'se': this._cmdSe(cmd); break;
      case 'voice': this._cmdVoice(cmd); break;
      case 'chara': this._cmdChara(cmd); break;
      case 'chara_hide': this._cmdCharaHide(cmd); break;
      case 'chara_hide_all': this._cmdCharaHideAll(cmd); break;
      case 'text': this._cmdText(cmd); break;
      case 'choice': this._cmdChoice(cmd); break;
      case 'jump': this._cmdJump(cmd); break;
      case 'item': this._cmdItem(cmd); break;
      case 'item_hide': this._cmdItemHide(cmd); break;
      case 'overlay': this._cmdOverlay(cmd); break;
      case 'overlay_hide': this._cmdOverlayHide(cmd); break;
      case 'wait': this._cmdWait(cmd); break;
      case 'fade_in': this._cmdFadeIn(cmd); break;
      case 'fade_out': this._cmdFadeOut(cmd); break;
      case 'movie': this._cmdMovie(cmd); break;
      case 'input': this._cmdInput(cmd); break;
      case 'set': this._cmdSet(cmd); break;
      case 'if': this._cmdIf(cmd); break;
      case 'msg_hide': this._cmdMsgHide(cmd); break;
      case 'msg_show': this._cmdMsgShow(cmd); break;
      case 'gameover': this._cmdGameOver(cmd); break;
      case 'call': this._cmdCall(cmd); break;
      case 'affinity_show': this.showAffinity(); this.next(); break;
      case 'affinity_hide': this.hideAffinity(); this.next(); break;
      case 'affinity_add': this._cmdAffinityAdd(cmd); break;
      case 'affinity_reset': this.affinityScore = 0; this.updateAffinity(); this.next(); break;
      case 'minigame_start': this._cmdMinigameStart(cmd); break;
      case 'title_screen': this._cmdTitleScreen(cmd); break;
      default:
        console.warn('Unknown command:', cmd.type);
        this.next();
    }
  }

  // ===== Commands =====

  _cmdBg(cmd) {
    const src = 'assets/bg/' + cmd.file;
    if (cmd.transition === 'none') {
      this.bgImage.src = src;
      this.next();
    } else {
      this.bgImageNext.src = src;
      this.bgImageNext.style.opacity = '0';
      this.bgImageNext.classList.remove('hidden');
      requestAnimationFrame(() => {
        this.bgImageNext.style.opacity = '1';
        setTimeout(() => {
          this.bgImage.src = src;
          this.bgImageNext.style.opacity = '0';
          this.next();
        }, cmd.duration || 800);
      });
    }
  }

  _cmdBgm(cmd) {
    const src = 'assets/bgm/' + cmd.file;
    if (this.currentBgm === src && !this.bgmAudio.paused) {
      this.next();
      return;
    }
    if (cmd.fadeIn) {
      this.bgmAudio.volume = 0;
      this.bgmAudio.src = src;
      this.bgmAudio.play().catch(() => {});
      this._fadeAudio(this.bgmAudio, 0, 0.5, cmd.fadeIn);
    } else {
      this.bgmAudio.src = src;
      this.bgmAudio.volume = 0.5;
      this.bgmAudio.play().catch(() => {});
    }
    this.currentBgm = src;
    this.next();
  }

  _cmdBgmStop(cmd) {
    if (cmd.fadeOut) {
      this._fadeAudio(this.bgmAudio, this.bgmAudio.volume, 0, cmd.fadeOut, () => {
        this.bgmAudio.pause();
        this.currentBgm = null;
      });
    } else {
      this.bgmAudio.pause();
      this.currentBgm = null;
    }
    this.next();
  }

  _cmdSe(cmd) {
    this.seAudio.src = 'assets/voice/' + cmd.file;
    this.seAudio.play().catch(() => {});
    this.next();
  }

  _cmdVoice(cmd) {
    this.voiceAudio.src = 'assets/voice/' + cmd.file;
    this.voiceAudio.play().catch(() => {});
    if (cmd.wait) {
      this.voiceAudio.onended = () => { this.voiceAudio.onended = null; this.next(); };
    } else {
      this.next();
    }
  }

  _cmdChara(cmd) {
    const el = this._getCharaEl(cmd.pos || 'center');
    el.src = 'assets/chara/' + cmd.file;
    el.classList.remove('hidden');
    if (cmd.size) {
      el.style.maxHeight = cmd.size;
    }
    this.next();
  }

  _cmdCharaHide(cmd) {
    const el = this._getCharaEl(cmd.pos || 'center');
    el.classList.add('hidden');
    this.next();
  }

  _cmdCharaHideAll() {
    this.charaLeft.classList.add('hidden');
    this.charaCenter.classList.add('hidden');
    this.charaRight.classList.add('hidden');
    this.next();
  }

  _getCharaEl(pos) {
    if (pos === 'left') return this.charaLeft;
    if (pos === 'right') return this.charaRight;
    return this.charaCenter;
  }

  _cmdText(cmd) {
    this.messageWindow.classList.remove('hidden');
    this.nameBox.textContent = cmd.name || '';
    this.fullText = cmd.text;
    this.messageText.textContent = '';
    this.nextIndicator.style.visibility = 'hidden';

    if (this.isSkipping) {
      this.messageText.textContent = this.fullText;
      this.waitingForClick = true;
      this.nextIndicator.style.visibility = 'visible';
      setTimeout(() => {
        this.waitingForClick = false;
        this.next();
      }, 50);
      return;
    }

    this.isTyping = true;
    let i = 0;
    this.typeTimer = setInterval(() => {
      if (i < this.fullText.length) {
        this.messageText.textContent += this.fullText[i];
        i++;
      } else {
        this._finishTyping();
      }
    }, this.typeSpeed);
  }

  _finishTyping() {
    clearInterval(this.typeTimer);
    this.isTyping = false;
    this.messageText.textContent = this.fullText;
    this.nextIndicator.style.visibility = 'visible';
    this.waitingForClick = true;
  }

  _cmdChoice(cmd) {
    this.waitingForChoice = true;
    this.choiceLayer.classList.remove('hidden');
    this.choiceLayer.innerHTML = '';

    cmd.choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      if (choice.recommended) btn.classList.add('recommended');
      btn.textContent = choice.text;

      const handleChoice = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.waitingForChoice) return; // 二重タップ防止
        this.choiceLayer.classList.add('hidden');
        this.waitingForChoice = false;
        if (choice.set) {
          Object.assign(this.variables, choice.set);
        }
        if (choice.affinity) {
          this.affinityScore += choice.affinity;
          this.updateAffinity();
        }
        if (choice.jump) {
          this.jumpTo(choice.jump);
        } else {
          this.next();
        }
      };
      btn.addEventListener('click', handleChoice);
      if (this._isTouchDevice) {
        btn.addEventListener('touchend', handleChoice, { passive: false });
      }
      this.choiceLayer.appendChild(btn);
    });
  }

  _cmdJump(cmd) {
    this.jumpTo(cmd.target);
  }

  _cmdItem(cmd) {
    this.itemLayer.classList.remove('hidden');
    this.itemLayer.innerHTML = '';
    const img = document.createElement('img');
    img.src = 'assets/items/' + cmd.file;
    if (cmd.style) Object.assign(img.style, cmd.style);
    this.itemLayer.appendChild(img);
    this.next();
  }

  _cmdItemHide() {
    this.itemLayer.classList.add('hidden');
    this.itemLayer.innerHTML = '';
    this.next();
  }

  _cmdOverlay(cmd) {
    this.overlay.classList.remove('hidden');
    if (cmd.color) this.overlay.style.background = cmd.color;
    this.next();
  }

  _cmdOverlayHide() {
    this.overlay.classList.add('hidden');
    this.next();
  }

  _cmdWait(cmd) {
    setTimeout(() => this.next(), cmd.duration || 1000);
  }

  _cmdFadeIn(cmd) {
    const target = cmd.target || 'game-container';
    const el = document.getElementById(target);
    if (el) {
      el.style.opacity = '0';
      el.style.transition = `opacity ${(cmd.duration || 1000) / 1000}s ease`;
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        setTimeout(() => this.next(), cmd.duration || 1000);
      });
    } else {
      this.next();
    }
  }

  _cmdFadeOut(cmd) {
    const target = cmd.target || 'game-container';
    const el = document.getElementById(target);
    if (el) {
      el.style.transition = `opacity ${(cmd.duration || 1000) / 1000}s ease`;
      el.style.opacity = '0';
      setTimeout(() => this.next(), cmd.duration || 1000);
    } else {
      this.next();
    }
  }

  _cmdMovie(cmd) {
    this.movieLayer.classList.remove('hidden');
    this.moviePlayer.src = 'assets/movie/' + cmd.file;
    this.moviePlayer.play().catch(() => {});
    this.moviePlayer.onended = () => {
      this.movieLayer.classList.add('hidden');
      this.moviePlayer.onended = null;
      this.next();
    };
    // Allow skip on click
    const skipHandler = () => {
      this.moviePlayer.pause();
      this.movieLayer.classList.add('hidden');
      this.moviePlayer.onended = null;
      this.movieLayer.removeEventListener('click', skipHandler);
      this.next();
    };
    this.movieLayer.addEventListener('click', skipHandler);
  }

  _cmdInput(cmd) {
    this.waitingForInput = true;
    this.inputLayer.classList.remove('hidden');
    this.inputPrompt.textContent = cmd.prompt || 'パスワードを入力してください';
    this.inputField.value = '';
    this.inputField.focus();
    this._inputCmd = cmd;
  }

  _onInputSubmit() {
    if (!this.waitingForInput) return;
    const val = this.inputField.value.trim();
    const cmd = this._inputCmd;
    this.inputLayer.classList.add('hidden');
    this.waitingForInput = false;

    if (cmd.answers && cmd.answers.includes(val)) {
      if (cmd.onCorrect) this.jumpTo(cmd.onCorrect);
      else this.next();
    } else {
      if (cmd.onWrong) this.jumpTo(cmd.onWrong);
      else this.next();
    }
  }

  _cmdSet(cmd) {
    Object.assign(this.variables, cmd.vars);
    this.next();
  }

  _cmdIf(cmd) {
    let result = false;
    if (cmd.condition) {
      result = cmd.condition(this.variables, this.affinityScore);
    } else if (cmd.var) {
      result = this.variables[cmd.var] === cmd.value;
    }

    if (result) {
      if (cmd.jump) this.jumpTo(cmd.jump);
      else this.next();
    } else {
      if (cmd.elseJump) this.jumpTo(cmd.elseJump);
      else this.next();
    }
  }

  _cmdMsgHide() {
    this.messageWindow.classList.add('hidden');
    this.next();
  }

  _cmdMsgShow() {
    this.messageWindow.classList.remove('hidden');
    this.next();
  }

  _cmdGameOver(cmd) {
    this.messageWindow.classList.add('hidden');
    this.choiceLayer.classList.remove('hidden');
    this.choiceLayer.innerHTML = '';

    if (cmd.image) {
      const img = document.createElement('img');
      img.src = 'assets/items/' + cmd.image;
      img.style.maxWidth = '60%';
      img.style.maxHeight = '40%';
      img.style.marginBottom = '20px';
      this.choiceLayer.appendChild(img);
    }

    const goText = document.createElement('div');
    goText.style.cssText = 'color:#ff3333;font-size:36px;font-weight:bold;margin-bottom:24px;text-shadow:0 0 10px rgba(255,0,0,0.5);';
    goText.textContent = 'GAME OVER';
    this.choiceLayer.appendChild(goText);

    // SE
    this.seAudio.src = 'assets/voice/gameover.ogg';
    this.seAudio.play().catch(() => {});

    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = 'タイトルに戻る';
    btn.style.maxWidth = '300px';
    const handleGO = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.choiceLayer.classList.add('hidden');
      this.backToTitle();
    };
    btn.addEventListener('click', handleGO);
    if (this._isTouchDevice) {
      btn.addEventListener('touchend', handleGO, { passive: false });
    }
    this.choiceLayer.appendChild(btn);
  }

  _cmdCall(cmd) {
    if (typeof cmd.fn === 'function') {
      cmd.fn(this);
    }
    if (!cmd.async) this.next();
  }

  _cmdAffinityAdd(cmd) {
    this.affinityScore += cmd.value;
    this.updateAffinity();
    this.next();
  }

  _cmdMinigameStart(cmd) {
    if (typeof window.startMinigame === 'function') {
      window.startMinigame(this, cmd.onComplete);
    } else {
      this.next();
    }
  }

  _cmdTitleScreen() {
    document.getElementById('title-screen').classList.remove('hidden');
  }

  // ===== Affinity =====

  showAffinity() {
    this.affinityMeter.classList.remove('hidden');
    this.updateAffinity();
  }

  hideAffinity() {
    this.affinityMeter.classList.add('hidden');
  }

  updateAffinity() {
    const pct = Math.max(0, Math.min(100, this.affinityScore));
    this.affinityBar.style.width = pct + '%';
    this.affinityScoreEl.textContent = this.affinityScore;
  }

  // ===== Audio Helper =====

  _fadeAudio(audio, from, to, duration, onComplete) {
    const steps = 20;
    const interval = duration / steps;
    const delta = (to - from) / steps;
    let current = from;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += delta;
      audio.volume = Math.max(0, Math.min(1, current));
      if (step >= steps) {
        clearInterval(timer);
        audio.volume = Math.max(0, Math.min(1, to));
        if (onComplete) onComplete();
      }
    }, interval);
  }

  // ===== Menu =====

  showMenu() {
    document.getElementById('full-menu').classList.remove('hidden');
  }

  hideMenu() {
    document.getElementById('full-menu').classList.add('hidden');
  }

  toggleWindow() {
    this.hideMenu();
    this.windowHidden = true;
    this.messageWindow.classList.add('hidden');
  }

  toggleSkip() {
    this.isSkipping = !this.isSkipping;
    this.hideMenu();
    if (this.isSkipping && this.waitingForClick) {
      this.waitingForClick = false;
      this.next();
    }
  }

  backToTitle() {
    this.hideMenu();
    this.bgmAudio.pause();
    this.currentBgm = null;
    this.seAudio.pause();
    this.voiceAudio.pause();
    this.charaLeft.classList.add('hidden');
    this.charaCenter.classList.add('hidden');
    this.charaRight.classList.add('hidden');
    this.messageWindow.classList.add('hidden');
    this.choiceLayer.classList.add('hidden');
    this.itemLayer.classList.add('hidden');
    this.overlay.classList.add('hidden');
    this.minigameLayer.classList.add('hidden');
    this.movieLayer.classList.add('hidden');
    this.hideAffinity();
    this.affinityScore = 0;
    this.variables = {};
    this.isSkipping = false;
    document.getElementById('title-screen').classList.remove('hidden');
  }

  // ===== Save/Load =====

  showSaveLoad(mode) {
    this.hideMenu();
    const screen = document.getElementById('saveload-screen');
    const title = document.getElementById('saveload-title');
    const slots = document.getElementById('save-slots');

    title.textContent = mode === 'save' ? 'Data Save' : 'Data Load';
    screen.classList.remove('hidden');
    slots.innerHTML = '';

    for (let i = 1; i <= this.saveSlotCount; i++) {
      const data = localStorage.getItem('ohashi_save_' + i);
      const btn = document.createElement('button');
      btn.className = 'save-slot';

      const num = document.createElement('span');
      num.className = 'slot-num';
      num.textContent = 'Slot ' + i;
      btn.appendChild(num);

      const info = document.createElement('span');
      info.className = 'slot-info';
      if (data) {
        const parsed = JSON.parse(data);
        info.textContent = parsed.date + ' - ' + (parsed.sceneName || '');
      } else {
        info.textContent = '--- Empty ---';
      }
      btn.appendChild(info);

      const slotHandler = ((slotIdx, slotData) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (mode === 'save') {
          this._saveToSlot(slotIdx);
          this.hideSaveLoad();
        } else {
          if (slotData) {
            this._loadFromSlot(slotIdx);
            this.hideSaveLoad();
          }
        }
      })(i, data);
      btn.addEventListener('click', slotHandler);
      if (this._isTouchDevice) {
        btn.addEventListener('touchend', slotHandler, { passive: false });
      }

      slots.appendChild(btn);
    }
  }

  hideSaveLoad() {
    document.getElementById('saveload-screen').classList.add('hidden');
  }

  _saveToSlot(slot) {
    const data = {
      date: new Date().toLocaleString('ja-JP'),
      sceneName: this._getCurrentSceneName(),
      currentIndex: this.currentIndex,
      variables: { ...this.variables },
      affinityScore: this.affinityScore,
      bgSrc: this.bgImage.src,
      bgmSrc: this.currentBgm,
    };
    localStorage.setItem('ohashi_save_' + slot, JSON.stringify(data));
  }

  _loadFromSlot(slot) {
    const raw = localStorage.getItem('ohashi_save_' + slot);
    if (!raw) return;
    const data = JSON.parse(raw);

    this.variables = data.variables || {};
    this.affinityScore = data.affinityScore || 0;
    this.currentIndex = data.currentIndex;
    this.isSkipping = false;

    // Restore bg
    if (data.bgSrc) this.bgImage.src = data.bgSrc;

    // Restore bgm
    if (data.bgmSrc) {
      this.bgmAudio.src = data.bgmSrc;
      this.bgmAudio.volume = 0.5;
      this.bgmAudio.play().catch(() => {});
      this.currentBgm = data.bgmSrc;
    }

    // Clear
    this.charaLeft.classList.add('hidden');
    this.charaCenter.classList.add('hidden');
    this.charaRight.classList.add('hidden');
    this.itemLayer.classList.add('hidden');
    this.choiceLayer.classList.add('hidden');
    this.overlay.classList.add('hidden');

    document.getElementById('title-screen').classList.add('hidden');
    this.execute();
  }

  _getCurrentSceneName() {
    for (let i = this.currentIndex; i >= 0; i--) {
      if (this.scenario[i] && this.scenario[i].label) {
        return this.scenario[i].label;
      }
    }
    return '';
  }

  hasSaveData() {
    for (let i = 1; i <= this.saveSlotCount; i++) {
      if (localStorage.getItem('ohashi_save_' + i)) return true;
    }
    return false;
  }
}
