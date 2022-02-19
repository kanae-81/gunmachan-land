import { increaseImageAry, createImgElm } from './utils/images';
import { addStyleRule, convertStringSizeToNumbers } from './utils/utils';
import { initProps, OptionalStyle } from '../@types/atraction';

interface FerrisWheel {
  root: HTMLElement;
  imgArray: string[];
  duration: number;
  marginRatio: number;
  displaySize: string;
  imagesClassName?: string;
  animationDelay?: number;
  init(): FerrisWheel;
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
  containerHeight: number,
  margin: number
): OptionalStyle => {
  const pathWidth = containerWidth - margin * 2;
  const pathHeight = containerHeight - margin * 2;
  return {
    width: `${size}px`,
    height: `${size}px`,
    offsetPath: `path('m 0 0 l ${pathWidth} 0 l 0 ${pathHeight} l -${pathWidth} 0 l 0 -${pathHeight} z')`,
    margin: `${margin}px`,
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
    containerHeight,
    margin
  );
  return {
    containerHeight,
    containerWidth,
    size,
    margin,
    optionalStyle,
  };
};

/**
 * 画像の基本スタイルをスタイルシートに挿入
 * @param {string} imgClass
 * @param {number} duration
 * @returns {void}
 */
const addBaseStyle = (imgClass: string, duration: number): void => {
  const keyframe = `@keyframes move{
      to {
        offset-distance: 100%;
      }
    }`;
  const imgBaseStyle = `
    .${imgClass} {
      position: absolute;
      top: 0px;
      left: 0px;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: 0 0 3px #000;
      z-index: 9999;
      offset-rotate: 0deg;
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
 * @param {number} containerHeight ルート要素の高さ
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
  containerHeight: number,
  size: number,
  marginRatio: number,
  imgArray: string[],
  duration: number,
  optionalStyle: OptionalStyle
) => {
  const fragment = document.createDocumentFragment();

  const trackLength =
    (containerHeight + containerWidth) * 2 - size * marginRatio * 8;
  const waitLength = size * (1 + marginRatio);
  const count = Math.floor(trackLength / waitLength);
  const ratio = (duration * waitLength) / trackLength;

  const displayImages = increaseImageAry(imgArray, count);
  for (let index = 0; index < count; index++) {
    const imgElm = createImgElm(displayImages[index], {
      width: size,
      height: size,
    });
    imgElm.classList.add(imgClass);
    imgElm.style.animationDelay = `${ratio * index}s`;
    (Object.keys(optionalStyle) as [keyof OptionalStyle]).forEach((key) => {
      imgElm.style[key] = optionalStyle[key];
    });
    fragment.appendChild(imgElm);
  }
  return {
    imgElms: fragment,
    ratio: ratio,
  };
};

/**
 * 観覧車の要素を作成し挿入
 * @param {HTMLElement} root 挿入先の要素
 * @param {string[]} imgArray 画像URLリスト
 * @returns {imagesClassName: string;animationDelay: number;}
 */
const init = ({
  root,
  imgArray,
  duration,
  marginRatio,
  displaySize,
}: initProps) => {
  const imgClass = `ferrisWheel__img-${Date.now()}`;

  const { containerHeight, containerWidth, size, optionalStyle } =
    createOptionalProps(root, displaySize, marginRatio);
  if (!containerHeight || !containerWidth || !size || !optionalStyle) return {};

  const { imgElms, ratio } = createImgElms(
    imgClass,
    containerWidth,
    containerHeight,
    size,
    marginRatio,
    imgArray,
    duration,
    optionalStyle
  );

  addBaseStyle(imgClass, duration);
  root.appendChild(imgElms);
  return {
    imagesClassName: imgClass,
    animationDelay: ratio,
  };
};

/**
 * ぐんまちゃん観覧車
 */
class FerrisWheel {
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
   * 観覧車の作成
   * @returns {FerrisWheel}
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
   * 観覧車のリサイズ
   * @returns {void}
   */
  resize() {
    // TODO: 引数で新しい値を受け取るように修正する！
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
      (Object.keys(optionalStyle) as [keyof OptionalStyle]).forEach((key) => {
        image.style[key] = optionalStyle[key];
      });
    });
  }
}

export default FerrisWheel;
