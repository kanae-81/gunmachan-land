import { increaseImageAry, createImgElm } from './utils/images';
import { addStyleRule, convertStringSizeToNumbers } from './utils/utils';
import {
  initProps,
  OptionalStyle,
  CssProperty,
} from '../@types/attractionFactory';
import { pause, restart, destroy } from '../module/utils/common';

interface MerryGoRound {
  root: HTMLElement;
  imgArray: string[];
  duration: number;
  marginRatio: number;
  displaySize: string;
  imagesClassName: string;
  animationDelay?: number;
  init(): MerryGoRound;
  resize(): void;
  pause(): void;
  restart(): void;
  destroy(delay?: number): void;
}

/**
 * 画像に追加するスタイルを作成
 * @param {number} size 画像サイズ
 * @param {number} containerWidth ルート要素の幅
 * @param {number} containerHeight ルート要素の高さ
 * @returns {OptionalStyle} 追加するスタイル
 */
const createOptionalStyles = (
  size: number,
  containerWidth: number,
  containerHeight: number
): OptionalStyle => {
  const pathWidth = containerWidth + size;
  const pathHeight = containerHeight - size / 2;
  return {
    width: `${size}px`,
    height: `${size}px`,
    offsetPath: `path('m ${pathWidth} ${pathHeight} l -${
      pathWidth + size
    } 0 l ${pathWidth} 0 Z')`,
  };
};

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
  const size = convertStringSizeToNumbers(displaySize, containerWidth);
  if (!size) return {};

  const margin = size * marginRatio;
  const optionalStyle = createOptionalStyles(
    size,
    containerWidth,
    containerHeight
  );
  return {
    containerHeight,
    containerWidth,
    size,
    margin,
    optionalStyle: optionalStyle,
  };
};

/**
 * 画像の基本スタイルをスタイルシートに挿入
 * @param {string} imgClass
 * @param {number} duration
 * @returns {void}
 */
const addBaseStyle = (
  imgClass: string,
  size: number,
  duration: number
): void => {
  const upper = 9999;
  const lower = 8888;
  const top = `-${(4 * size) / 3}px`;
  const base = `-${(2 * size) / 3}px`;
  const bottom = '0';
  const keyframe = `
    @keyframes move{
      0% {
        offset-distance: 0;
        top: ${base};
        z-index: ${upper};
      }
      20%, 40%, 70%, 90% {
        top: ${bottom};
      }
      50% {
        top: ${base};
        z-index: ${lower};
      }
      10%, 30%, 60%, 80% {
        top: ${top};
      }
      100% {
        top: ${base};
        offset-distance: 100%;
      }
    }
  `;
  const imgBaseStyle = `
    .${imgClass} {
      position: absolute;
      top: 0px;
      left: 0px;
      object-fit: cover;
      box-shadow: 0 0 3px #000;
      offset-rotate: 0deg;
      clip-path: ellipse(57% 77% at 50% 78%);
      animation: move ${duration}s infinite linear;
    }
  `;

  addStyleRule(keyframe);
  addStyleRule(imgBaseStyle);
};

/**
 * DOMに挿入する画像群を作成
 * @param {string} imgClass 画像に付与するクラス
 * @param {number} containerWidth ルート要素の幅
 * @param {number} size 画像のサイズ
 * @param {number} marginRatio 画像と画像の間隔
 * @param {string[]} imgArray 画像パスを格納した配列
 * @param {number} duration 1周する時間
 * @param {OptionalStyle} optionalStyle 画像に追加するスタイル
 * @returns {imgElms: DocumentFragment; ratio: number;}
 */
const createImgElms = (
  imgClass: string,
  containerWidth: number,
  size: number,
  marginRatio: number,
  imgArray: string[],
  duration: number,
  optionalStyle: OptionalStyle
) => {
  const fragment = document.createDocumentFragment();

  const trackLength = (containerWidth - size) * 2;
  const waitLength = size * marginRatio;
  const count = Math.floor(trackLength / (waitLength + size));
  const ratio = (duration * (waitLength + size)) / trackLength;

  const displayImages = increaseImageAry(imgArray, count);
  for (let index = 0; index < count; index++) {
    const imgElm = createImgElm(displayImages[index], {
      width: size,
      height: size,
    });
    imgElm.classList.add(imgClass);
    imgElm.style.animationDelay = `${ratio * index}s`;
    Object.keys(optionalStyle).forEach((key) => {
      const style: CssProperty = imgElm.style;
      style[key] = optionalStyle[key];
    });
    fragment.appendChild(imgElm);
  }
  return {
    imgElms: fragment,
    ratio: ratio,
  };
};

/**
 * メリーゴーランドの要素を作成し挿入
 * @param {initProps}
 * @returns {imagesClassName: string; animationDelay: number;}
 */
const init = ({
  root,
  imgArray,
  duration,
  marginRatio,
  displaySize,
}: initProps) => {
  const imgClass = `MerryGoRound__img-${Date.now()}`;

  const { containerWidth, size, optionalStyle } = createOptionalProps(
    root,
    displaySize,
    marginRatio
  );
  if (!containerWidth || !size || !optionalStyle) {
    return {
      imagesClassName: imgClass,
      animationDelay: undefined,
    };
  }

  const { imgElms, ratio } = createImgElms(
    imgClass,
    containerWidth,
    size,
    marginRatio,
    imgArray,
    duration,
    optionalStyle
  );

  addBaseStyle(imgClass, size, duration);
  root.appendChild(imgElms);
  return {
    imagesClassName: imgClass,
    animationDelay: ratio,
  };
};

/**
 * ぐんまちゃんメリーゴーランド
 */
class MerryGoRound {
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
  /**
   * メリーゴーランドの作成
   * @returns {MerryGoRound}
   */
  init() {
    const { root, imgArray, duration, marginRatio, displaySize, resize } = this;
    const { imagesClassName, animationDelay } = init({
      root,
      imgArray,
      duration,
      marginRatio,
      displaySize,
    });
    this.imagesClassName = imagesClassName;
    this.animationDelay = animationDelay;
    this.resize = resize;
    return this;
  }

  /**
   * メリーゴーランドのリサイズ
   * @returns {void}
   */
  resize() {
    const { root, imagesClassName, displaySize, marginRatio } = this;
    if (!imagesClassName) return;

    const { optionalStyle } = createOptionalProps(
      root,
      displaySize,
      marginRatio
    );
    if (!optionalStyle) return;

    const images = document.querySelectorAll<HTMLImageElement>(
      `.${imagesClassName}`
    );

    images.forEach((image) => {
      Object.keys(optionalStyle).forEach((key) => {
        const style: CssProperty = image.style;
        style[key] = optionalStyle[key];
      });
    });
  }
  pause() {
    const { imagesClassName } = this;
    return pause(imagesClassName);
  }
  restart() {
    const { imagesClassName } = this;
    return restart(imagesClassName);
  }
  destroy(delay?: number) {
    const { imagesClassName } = this;
    return destroy(imagesClassName, delay);
  }
}

export default MerryGoRound;
