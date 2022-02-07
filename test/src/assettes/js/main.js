import GchanLand from '/dist/index';

const execFerrisWheel = () => {
  // eslint-disable-next-line no-undef
  const root = document.querySelector('[data-ferrisWheel]');
  const gchan = new GchanLand(root);
  const ferrisWheel = gchan.ferrisWheel(15, '10%', 0.6);
  const { animationDelay } = ferrisWheel;

  setTimeout(() => {
    ferrisWheel.destroy(animationDelay);
  }, 15000);

  // eslint-disable-next-line no-undef
  window.addEventListener('resize', () => {
    ferrisWheel.resize();
  });
};

// eslint-disable-next-line no-undef
window.addEventListener('load', () => {
  execFerrisWheel();
});
