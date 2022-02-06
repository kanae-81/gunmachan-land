import { shuffleImage, createImg } from './utils/images';
import { addStyleRule } from './utils/utils';

const ferrisWheel = (root: HTMLElement, imgArray: string[]) => {
  const fragment = document.createDocumentFragment();

  const container = document.createElement('div');
  const className = `ferrisWheel-${Date.now()}`;
  const contaienrStyle = `
    .${className} {
      position: absolute;
      width: 100%;
      height: 100%;
      dislpay: flex;
      flex-wrap: nowrap;
      align-items: center;
      gap: 5px;
      overflow: auto;
      z-index: 9999999;
    }
  `;
  container.classList.add(className);
  addStyleRule(contaienrStyle);

  const size = {
    width: window.innerHeight / 5,
  };

  for (let index = 0; index < 5; index++) {
    const imgPath = shuffleImage(imgArray)[0];
    const imgElm = createImg(imgPath, size);
    fragment.appendChild(imgElm);
  }

  container.appendChild(fragment);
  root.insertAdjacentElement('afterbegin', container);
};

export default ferrisWheel;
