/* eslint-disable no-undef */
import {
  skyDiving,
  accompany,
  ferrisWheel,
  merryGoRound,
  coffeeCup,
} from '/dist/index';

const createButtons = (attraction) => ({
  create: document.querySelector(`[data-${attraction}="create"]`),
  destroy: document.querySelector(`[data-${attraction}="destroy"]`),
  pause: document.querySelector(`[data-${attraction}="pause"]`),
  restart: document.querySelector(`[data-${attraction}="restart"]`),
});

const operateAttraction = (buttons, type) => {
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

const execAttraction = (attraction, fn, option) => {
  const root = document.querySelector(`[data-${attraction}]`);
  let attractionObj = null;

  const buttons = createButtons(attraction);
  operateAttraction(buttons, 'init');

  buttons.create.addEventListener('click', () => {
    attractionObj = fn({ ...option, root });
    operateAttraction(buttons, 'create');
  });
  buttons.destroy.addEventListener('click', () => {
    if (!attractionObj) return;
    attractionObj.destroy();
    attractionObj = null;
    operateAttraction(buttons, 'destroy');
  });
  buttons.restart.addEventListener('click', () => {
    if (!attractionObj) return;
    attractionObj.restart();
    operateAttraction(buttons, 'restart');
  });
  buttons.pause.addEventListener('click', () => {
    if (!attractionObj) return;
    attractionObj.pause();
    operateAttraction(buttons, 'pause');
  });

  window.addEventListener('resize', () => {
    if (!attractionObj) return;
    attractionObj.resize();
  });
};

const execAccompany = () => {
  const attraction = 'accompany';
  const root = document.querySelector(`[data-${attraction}]`);
  const accompanyObj = accompany({
    displayCount: 20,
    displaySize: '10%',
    interval: 0.1,
    root,
  });

  window.addEventListener('resize', () => {
    accompanyObj.resize();
  });
};

const execCoffeeCup = () => {
  const attraction = 'coffeecup';
  const root = document.querySelector(`[data-${attraction}]`);
  const coffeeCupObj = coffeeCup({
    root,
    displayCount: 5,
    displaySize: '50px',
    defaultSpeed: 1,
    fastRatio: 2,
  });

  document
    .querySelector('[data-coffeecup="create"]')
    .addEventListener('click', () => {
      coffeeCupObj.add();
    });
  document
    .querySelector('[data-coffeecup="destroy"]')
    .addEventListener('click', () => {
      coffeeCupObj.destroy();
    });
};

const execSkyDiving = () => {
  const attraction = 'skyDiving';
  const root = document.querySelector(`[data-${attraction}]`);
  const skyDivingObj = skyDiving({ root, displaySize: '5%', speed: 2 });

  document
    .querySelector('[data-skyDiving="create"]')
    .addEventListener('click', () => {
      skyDivingObj.add();
    });
};

window.addEventListener('load', () => {
  const attractionList = [
    {
      name: 'ferrisWheel',
      fn: ferrisWheel,
      option: {
        duration: 10,
        displaySize: '10%',
        marginRatio: 0.6,
      },
    },
    {
      name: 'merryGoRound',
      fn: merryGoRound,
      option: {
        duration: 10,
        displaySize: '5%',
        marginRatio: 0.5,
      },
    },
  ];
  attractionList.forEach((attraction) => {
    const { name, fn, option } = attraction;
    execAttraction(name, fn, option);
  });
  execAccompany();
  execSkyDiving();
  execCoffeeCup();
});
