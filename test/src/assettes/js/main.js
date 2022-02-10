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

window.addEventListener('load', () => {
  execFerrisWheel();
});
