import { a } from './module';

(function (global, factory) {
  factory(global);
  a();
})(window, function (window: Window) {
  const version = '1.0.0';
  const Gchan = () => {
    return {
      version,
    };
  };

  window.Gchan = Gchan;
  return Gchan;
});
