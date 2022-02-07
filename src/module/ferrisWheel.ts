import { shuffleImage, createImg } from './utils/images';
import { addStyleRule } from './utils/utils';

interface initProps {
  root: HTMLElement;
  imgArray: string[];
  duration: number;
  displaySize: string;
  marginRatio: number;
}

/**
 * 観覧車の要素を作成し挿入
 * @param {HTMLElement} root 挿入先の要素
 * @param {string[]} imgArray 画像URLリスト
 * @returns {void}
 */
const init = ({
  root,
  imgArray,
  duration,
  marginRatio,
  displaySize,
}: initProps) => {
  const fragment = document.createDocumentFragment();

  const container = document.createElement('div');
  const className = `ferrisWheel-${Date.now()}`;
  const contaienrStyle = `
    .${className} {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 9999999;
    }
  `;
  container.classList.add(className);
  addStyleRule(contaienrStyle);

  const containerWidth = root.offsetWidth;
  const containerHeight = root.offsetHeight;
  const size = displaySize.includes('px')
    ? Number(displaySize.replace('px', ''))
    : containerWidth * (Number(displaySize.replace('%', '')) / 100);
  const margin = size * marginRatio;
  const imgClass = `ferrisWheel__img-${Date.now()}`;
  const keyframe = `@keyframes move{
      to {
        offset-distance: 100%;
      }
    }`;
  addStyleRule(keyframe);
  const pathWidth = containerWidth - margin * 2;
  const pathHeight = containerHeight - margin * 2;
  const imgStyle = `
    .${imgClass} {
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: 0 0 3px #000;
      offset-rotate: 0deg;
      offset-path: path('m 0 0 l ${pathWidth} 0 l 0 ${pathHeight} l -${pathWidth} 0 l 0 -${pathHeight} z');
      animation: move ${duration}s infinite linear;
      margin: ${margin}px;
    }
  `;
  addStyleRule(imgStyle);

  const trackLength =
    (containerHeight + containerWidth) * 2 - size * marginRatio * 8;
  const waitLength = size * (1 + marginRatio);
  const count = Math.floor(trackLength / waitLength);
  const ratio = (duration * waitLength) / trackLength;
  const images = shuffleImage(imgArray);

  for (let index = 0; index < count; index++) {
    const imgElm = createImg(images[index], { width: size, height: size });
    imgElm.classList.add(imgClass);
    imgElm.style.animationDelay = `${ratio * index}s`;
    fragment.appendChild(imgElm);
  }

  container.appendChild(fragment);
  root.insertAdjacentElement('afterbegin', container);
  return {
    containerClassName: className,
    imagesClassName: imgClass,
  };
};

interface FerrisWheel {
  root: HTMLElement;
  imgArray: string[];
  duration: number;
  marginRatio: number;
  displaySize: string;
  containerClassName?: string;
  imagesClassName?: string;
}

/**
 * ぐんまちゃん観覧車
 */
class FerrisWheel implements FerrisWheel {
  /**
   * @constructor
   */
  constructor({
    root,
    imgArray,
    duration,
    marginRatio,
    displaySize,
  }: initProps) {
    this.root = root;
    this.imgArray = imgArray;
    this.duration = duration;
    this.marginRatio = marginRatio;
    this.displaySize = displaySize;
  }
  init = () => {
    const { root, imgArray, duration, marginRatio, displaySize } = this;
    const { containerClassName, imagesClassName } = init({
      root,
      imgArray,
      duration,
      marginRatio,
      displaySize,
    });
    this.containerClassName = containerClassName;
    this.imagesClassName = imagesClassName;
    return this;
  };
  resize = () => {
    // TODO: リファクタ
    const { root, imagesClassName, displaySize, marginRatio } = this;
    if (!imagesClassName) return;
    const containerWidth = root.offsetWidth;
    const containerHeight = root.offsetHeight;
    const size = displaySize.includes('px')
      ? Number(displaySize.replace('px', ''))
      : containerWidth * (Number(displaySize.replace('%', '')) / 100);
    const margin = size * marginRatio;
    const pathWidth = containerWidth - margin * 2;
    const pathHeight = containerHeight - margin * 2;
    const offsetPath = `path('m 0 0 l ${pathWidth} 0 l 0 ${pathHeight} l -${pathWidth} 0 l 0 -${pathHeight} z')`;
    const images = document.querySelectorAll<HTMLImageElement>(
      `.${imagesClassName}`
    );

    images.forEach((image) => {
      image.style.offsetPath = offsetPath;
      image.style.width = `${size}px`;
      image.style.height = `${size}px`;
      image.style.margin = `${margin}px`;
    });
  };
  destroy = () => {
    // TODO: 徐々に消えるオプション
    const { imagesClassName } = this;
    const images = document.querySelectorAll(`.${imagesClassName}`);
    images.forEach((image) => {
      image.remove();
    });
  };
}

export default FerrisWheel;
