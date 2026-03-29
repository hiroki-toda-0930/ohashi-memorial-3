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

  startScreen.addEventListener('click', () => {
    startScreen.classList.add('hidden');
  });

  btnNewGame.addEventListener('click', () => {
    titleScreen.classList.add('hidden');
    engine.loadScenario(SCENARIO);
    engine.start();
  });

  btnContinue.addEventListener('click', () => {
    if (!engine.hasSaveData()) return;
    titleScreen.classList.add('hidden');
    engine.loadScenario(SCENARIO);
    engine.showSaveLoad('load');
  });
});
