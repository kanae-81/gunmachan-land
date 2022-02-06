import GchanLand from '/dist/index';

const execFerrisWheel = () => {
  // eslint-disable-next-line no-undef
  const root = document.querySelector('[data-ferrisWheel]');
  const gchan = new GchanLand(root);
  gchan.ferrisWheel(15, '14%', 0.6);
};

// eslint-disable-next-line no-undef
window.addEventListener('load', () => {
  execFerrisWheel();
});
