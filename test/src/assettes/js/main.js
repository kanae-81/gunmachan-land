/* eslint-disable no-undef */
import GchanLand from '/dist/index';

const execFerrisWheel = () => {
  const root = document.querySelector('[data-ferrisWheel]');
  const gchan = new GchanLand(root);
  let ferrisWheel = null;

  const buttons = {
    create: document.querySelector('[data-ferrisWheel="create"]'),
    destroy: document.querySelector('[data-ferrisWheel="destroy"]'),
    pause: document.querySelector('[data-ferrisWheel="pause"]'),
    restart: document.querySelector('[data-ferrisWheel="restart"]'),
  };

  buttons.create.disabled = false;
  buttons.destroy.disabled = true;
  buttons.pause.disabled = true;
  buttons.restart.disabled = true;

  buttons.create.addEventListener('click', () => {
    ferrisWheel = gchan.ferrisWheel(10, '10%', 0.6);
    buttons.create.disabled = true;
    buttons.destroy.disabled = false;
    buttons.pause.disabled = false;
    buttons.restart.disabled = false;
  });
  buttons.destroy.addEventListener('click', () => {
    if (!ferrisWheel) return;
    ferrisWheel.destroy();
    ferrisWheel = null;
    buttons.create.disabled = false;
    buttons.destroy.disabled = true;
    buttons.pause.disabled = true;
    buttons.restart.disabled = true;
  });
  buttons.restart.addEventListener('click', () => {
    if (!ferrisWheel) return;
    ferrisWheel.restart();
  });
  buttons.pause.addEventListener('click', () => {
    if (!ferrisWheel) return;
    ferrisWheel.pause();
  });

  window.addEventListener('resize', () => {
    if (!ferrisWheel) return;
    ferrisWheel.resize();
  });
};

const execMerryGoRound = () => {
  const root = document.querySelector('[data-merryGoRound]');
  const gchan = new GchanLand(root);
  let merryGoRound = null;

  const buttons = {
    create: document.querySelector('[data-merryGoRound="create"]'),
    destroy: document.querySelector('[data-merryGoRound="destroy"]'),
    pause: document.querySelector('[data-merryGoRound="pause"]'),
    restart: document.querySelector('[data-merryGoRound="restart"]'),
  };

  buttons.create.disabled = false;
  buttons.destroy.disabled = true;
  buttons.pause.disabled = true;
  buttons.restart.disabled = true;

  buttons.create.addEventListener('click', () => {
    merryGoRound = gchan.merryGoRound(10, '10%', 0.5);
    buttons.create.disabled = true;
    buttons.destroy.disabled = false;
    buttons.pause.disabled = false;
    buttons.restart.disabled = false;
  });

  buttons.destroy.addEventListener('click', () => {
    if (!merryGoRound) return;
    merryGoRound.destroy();
    merryGoRound = null;
    buttons.create.disabled = false;
    buttons.destroy.disabled = true;
    buttons.pause.disabled = true;
    buttons.restart.disabled = true;
  });

  buttons.restart.addEventListener('click', () => {
    if (!merryGoRound) return;
    merryGoRound.restart();
  });

  buttons.pause.addEventListener('click', () => {
    if (!merryGoRound) return;
    merryGoRound.pause();
  });

  window.addEventListener('resize', () => {
    if (!merryGoRound) return;
    merryGoRound.resize();
  });
};

window.addEventListener('load', () => {
  execFerrisWheel();
  execMerryGoRound();
});
