import { createImgElm, shuffleImage } from './utils/images';
import {
  CoffeeCupInitProps,
  OptionalStyle,
  CssProperty,
} from '../@types/attractionFactory';
import {
  addStyleRule,
  convertStringSizeToNumbers,
  getRandomNum,
} from './utils/utils';
import { destroy } from './utils/common';

interface CoffeeCupCreateProps {
  root: HTMLElement;
  imgArray: string[];
  displaySize: string;
  defaultSpeed: number;
  imagesClassName: string;
  fastRatio: number;
}

interface CoffeeCup extends CoffeeCupCreateProps {
  displayCount: number;
  init(): CoffeeCup;
  add(displaySize: string, speed: number): void;
  destroy(delay?: number): void;
}

/**
 * 画像の基本スタイルをスタイルシートに挿入
 * @param {string} imgClass
 * @returns {void}
 */
const addBaseStyle = (imgClass: string) => {
  const keyframe = `@keyframes rotate{
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }`;

  const imgBaseStyle = `
    .${imgClass} {
      position: absolute;
      object-fit: cover;
      border-radius: 50%;
      z-Index: 100000;
    }
  `;

  addStyleRule(keyframe);
  addStyleRule(imgBaseStyle);
};

/**
 * 画像ごとのプロパティ作成
 * @param topPos topの位置
 * @param leftPos leftの位置
 * @param speed 落下する速さ
 * @returns {void}
 */
const createOptionalStyle = (
  topPos: number,
  leftPos: number,
  speed: number
): OptionalStyle => ({
  top: `${topPos}px`,
  left: `${leftPos}px`,
  animation: `rotate ${speed}s infinite linear`,
});

/**
 * 画像のホバーイベント仕込み
 * @param {HTMLImageElement} imgElm
 * @param {number} defaultSpeed
 * @param {number} fastRatio
 */
const addEvent = (
  imgElm: HTMLImageElement,
  defaultSpeed: number,
  fastRatio: number
) => {
  const fastSpeed = defaultSpeed / fastRatio;

  imgElm.addEventListener('mouseenter', (e: MouseEvent) => {
    const target = e.currentTarget;
    if (target instanceof HTMLElement) {
      target.style.animationDuration = `${fastSpeed}s`;
    }
  });
  imgElm.addEventListener('mouseleave', (e: MouseEvent) => {
    const target = e.currentTarget;
    if (target instanceof HTMLElement) {
      target.style.animationDuration = `${defaultSpeed}s`;
    }
  });
};

/**
 * カップのポジション設定
 * @param {HTMLElement} root
 * @param {number} size
 * @param {HTMLImageElement} imgElm
 * @param {number} defaultSpeed
 */
const setPosition = (
  root: HTMLElement,
  size: number,
  imgElm: HTMLImageElement,
  defaultSpeed: number
) => {
  const rootWidth = root.scrollWidth;
  const rootHeight = root.scrollHeight;
  const leftPos = getRandomNum(rootWidth - size);
  const topPos = getRandomNum(rootHeight - size);
  const baseStyle = createOptionalStyle(topPos, leftPos, defaultSpeed);
  Object.keys(baseStyle).forEach((style) => {
    const styles: CssProperty = imgElm.style;
    styles[style] = baseStyle[style];
  });
};

/**
 * コーヒーカップの要素を作成し挿入
 * @param {CoffeeCupCreateProps}
 * @returns {void}
 */
const create = ({
  root,
  imagesClassName,
  imgArray,
  displaySize,
  defaultSpeed,
  fastRatio,
}: CoffeeCupCreateProps) => {
  const containerWidth = root.offsetWidth;
  const size = convertStringSizeToNumbers(displaySize, containerWidth);
  if (!size) return {};

  const displayImg = shuffleImage(imgArray)[0];
  const imgElm = createImgElm(displayImg, {
    width: size,
    height: size,
  });
  setPosition(root, size, imgElm, defaultSpeed);
  addEvent(imgElm, defaultSpeed, fastRatio);
  imgElm.classList.add(imagesClassName);
  root.appendChild(imgElm);
  if (!imgElm || !size) return;
  return { imgElm, size };
};

/**
 * コーヒーカップ
 */
class CoffeeCup {
  /**
   * @constructor
   */
  constructor({
    root,
    imgArray,
    displayCount,
    displaySize,
    defaultSpeed,
    fastRatio,
  }: CoffeeCupInitProps) {
    this.root = root;
    this.imgArray = imgArray;
    this.imagesClassName = '';
    this.displayCount = displayCount;
    this.displaySize = displaySize;
    this.defaultSpeed = defaultSpeed;
    this.fastRatio = fastRatio;
  }
  /**
   * コーヒーカップの準備
   * @returns {CoffeeCup}
   */
  init() {
    const { displayCount } = this;
    const imagesClassName = `CoffeeCup__img-${Date.now()}`;
    addBaseStyle(imagesClassName);
    this.imagesClassName = imagesClassName;

    for (let index = 0; index < displayCount; index++) {
      this.add();
    }

    return this;
  }

  add() {
    const {
      root,
      imgArray,
      imagesClassName,
      displaySize,
      defaultSpeed,
      fastRatio,
    } = this;
    return create({
      root,
      imgArray,
      displaySize,
      defaultSpeed,
      imagesClassName,
      fastRatio,
    });
  }

  destroy() {
    const { imagesClassName } = this;
    return destroy(imagesClassName);
  }
}

export default CoffeeCup;
