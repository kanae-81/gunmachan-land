import { shuffleImage, createImg } from './utils/images';
import { addStyleRule } from './utils/utils';

interface FerrisWheel {
  root: HTMLElement;
  imgArray: string[];
  duration: number;
  marginRatio: number;
  displaySize: string;
  imagesClassName?: string;
  animationDelay?: number;
}

interface initProps {
  root: HTMLElement;
  imgArray: string[];
  duration: number;
  displaySize: string;
  marginRatio: number;
}

interface OptionalStyle {
  width: string;
  height: string;
  offsetPath: string;
  margin: string;
}

/**
 *
 * 画像サイズ設定のためのプロパティ作成
 * @param {HTMLElement} root 挿入先の要素
 * @param {string} displaySize
 * @param {marginRatio} marginRatio
 * @returns {Object}
 */
const createOptionalProps = (
  root: HTMLElement,
  displaySize: string,
  marginRatio: number
) => {
  const containerWidth = root.offsetWidth;
  const containerHeight = root.offsetHeight;
  const size = displaySize.includes('px')
    ? Number(displaySize.replace('px', ''))
    : containerWidth * (Number(displaySize.replace('%', '')) / 100);
  const margin = size * marginRatio;
  const pathWidth = containerWidth - margin * 2;
  const pathHeight = containerHeight - margin * 2;
  return {
    containerHeight,
    containerWidth,
    size,
    pathWidth,
    pathHeight,
    margin,
    optionalStyle: {
      width: `${size}px`,
      height: `${size}px`,
      offsetPath: `path('m 0 0 l ${pathWidth} 0 l 0 ${pathHeight} l -${pathWidth} 0 l 0 -${pathHeight} z')`,
      margin: `${margin}px`,
    },
  };
};

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
  const imgClass = `ferrisWheel__img-${Date.now()}`;

  const keyframe = `@keyframes move{
      to {
        offset-distance: 100%;
      }
    }`;
  addStyleRule(keyframe);
  const imgBaseStyle = `
    .${imgClass} {
      position: absolute;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: 0 0 3px #000;
      z-index: 9999999;
      offset-rotate: 0deg;
      animation: move ${duration}s infinite linear;
    }
  `;
  addStyleRule(imgBaseStyle);

  const { containerHeight, containerWidth, size, optionalStyle } =
    createOptionalProps(root, displaySize, marginRatio);

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
    (Object.keys(optionalStyle) as [keyof OptionalStyle]).forEach((key) => {
      imgElm.style[key] = optionalStyle[key];
    });
    fragment.appendChild(imgElm);
  }

  root.appendChild(fragment);
  return {
    imagesClassName: imgClass,
    animationDelay: ratio,
  };
};

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
    const { imagesClassName, animationDelay } = init({
      root,
      imgArray,
      duration,
      marginRatio,
      displaySize,
    });
    this.imagesClassName = imagesClassName;
    this.animationDelay = animationDelay;
    return this;
  };

  /**
   * 観覧車のリサイズ
   * @returns {void}
   */
  resize = () => {
    const { root, imagesClassName, displaySize, marginRatio } = this;
    if (!imagesClassName) return;

    const { optionalStyle } = createOptionalProps(
      root,
      displaySize,
      marginRatio
    );
    const images = document.querySelectorAll<HTMLImageElement>(
      `.${imagesClassName}`
    );
    images.forEach((image) => {
      (Object.keys(optionalStyle) as [keyof OptionalStyle]).forEach((key) => {
        image.style[key] = optionalStyle[key];
      });
    });
  };

  /**
   * 観覧車の破棄
   * @param {number} delay 画像削除の間隔(秒数指定)
   * @returns {void}
   */
  destroy = (delay?: number) => {
    const { imagesClassName } = this;
    const images = document.querySelectorAll(`.${imagesClassName}`);
    const delayMs = delay ? delay * 1000 : 0;
    images.forEach((image, index) => {
      setTimeout(() => {
        image.remove();
      }, delayMs * index);
    });
  };
}

export default FerrisWheel;
