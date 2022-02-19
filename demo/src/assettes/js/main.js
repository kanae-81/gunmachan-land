/* eslint-disable no-undef */
import GchanLand from '/dist/index';

const createButtons = (atraction) => ({
  create: document.querySelector(`[data-${atraction}="create"]`),
  destroy: document.querySelector(`[data-${atraction}="destroy"]`),
  pause: document.querySelector(`[data-${atraction}="pause"]`),
  restart: document.querySelector(`[data-${atraction}="restart"]`),
});

const operateAtraction = (buttons, type) => {
  switch (type) {
    case 'create':
      buttons.create.disabled = true;
      buttons.destroy.disabled = false;
      buttons.pause.disabled = false;
      buttons.restart.disabled = true;
      break;
    case 'destroy':
      buttons.create.disabled = false;
      buttons.destroy.disabled = true;
      buttons.pause.disabled = true;
      buttons.restart.disabled = true;
      break;
    case 'init':
      buttons.create.disabled = false;
      buttons.destroy.disabled = true;
      buttons.pause.disabled = true;
      buttons.restart.disabled = true;
      break;
    case 'restart':
      buttons.create.disabled = true;
      buttons.destroy.disabled = false;
      buttons.pause.disabled = false;
      buttons.restart.disabled = true;
      break;
    case 'pause':
      buttons.create.disabled = true;
      buttons.destroy.disabled = false;
      buttons.pause.disabled = true;
      buttons.restart.disabled = false;
      break;
    default:
      break;
  }
};

const execAtraction = (atraction, ...option) => {
  const root = document.querySelector(`[data-${atraction}]`);
  const gchan = new GchanLand(root);
  let atractionObj = null;

  const buttons = createButtons(atraction);
  operateAtraction(buttons, 'init');

  buttons.create.addEventListener('click', () => {
    atractionObj = gchan[atraction](...option);
    operateAtraction(buttons, 'create');
  });
  buttons.destroy.addEventListener('click', () => {
    if (!atractionObj) return;
    atractionObj.destroy();
    atractionObj = null;
    operateAtraction(buttons, 'destroy');
  });
  buttons.restart.addEventListener('click', () => {
    if (!atractionObj) return;
    atractionObj.restart();
    operateAtraction(buttons, 'restart');
  });
  buttons.pause.addEventListener('click', () => {
    if (!atractionObj) return;
    atractionObj.pause();
    operateAtraction(buttons, 'pause');
  });

  window.addEventListener('resize', () => {
    if (!atractionObj) return;
    atractionObj.resize();
  });
};

const execAccompany = () => {
  const atraction = 'accompany';
  const root = document.querySelector(`[data-${atraction}]`);
  const gchan = new GchanLand(root);
  const accompanyObj = gchan.accompany(20, '10%', 0.1);
  window.addEventListener('resize', () => {
    accompanyObj.resize();
  });
};

const execSkyDiving = () => {
  const atraction = 'skyDiving';
  const root = document.querySelector(`[data-${atraction}]`);
  const gchan = new GchanLand(root);
  const skyDivingObj = gchan.skyDiving();

  document
    .querySelector('[data-skyDiving="create"]')
    .addEventListener('click', () => {
      skyDivingObj.create('5%', 2);
    });
};

window.addEventListener('load', () => {
  const atractionList = [
    {
      name: 'ferrisWheel',
      option: [10, '10%', 0.6],
    },
    {
      name: 'merryGoRound',
      option: [10, '5%', 0.5],
    },
  ];
  atractionList.forEach((atraction) => {
    const { name, option } = atraction;
    execAtraction(name, ...option);
  });
  execAccompany();
  execSkyDiving();
});
