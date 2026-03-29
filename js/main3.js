/* ============================
   Main - おおはしメモリアル3
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  const engine = new VNEngine();
  window.gameEngine = engine;

  const startScreen = document.getElementById('start-screen');
  const titleScreen = document.getElementById('title-screen');
  const btnNewGame = document.getElementById('btn-newgame');
  const btnContinue = document.getElementById('btn-continue');

  if (!engine.hasSaveData()) {
    btnContinue.style.opacity = '0.4';
    btnContinue.style.pointerEvents = 'none';
  }

  // タップ・クリック両対応ヘルパー
  const addTap = (el, handler) => {
    let handled = false;
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (handled) return;
      handled = true;
      handler();
      setTimeout(() => { handled = false; }, 300);
    }, { passive: false });
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (handled) return;
      handler();
    });
  };

  // スタート画面
  addTap(startScreen, () => {
    startScreen.classList.add('hidden');
  });

  // New Game
  addTap(btnNewGame, () => {
    titleScreen.classList.add('hidden');
    engine.loadScenario(SCENARIO);
    engine.start();
  });

  // Continue
  addTap(btnContinue, () => {
    if (!engine.hasSaveData()) return;
    titleScreen.classList.add('hidden');
    engine.loadScenario(SCENARIO);
    engine.showSaveLoad('load');
  });
});
