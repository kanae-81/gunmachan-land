import { createImgElm, shuffleImage } from './utils/images';
import {
  SkyDivingInitProps,
  OptionalStyle,
  CssProperty,
} from '../@types/attractionFactory';
import {
  addStyleRule,
  convertStringSizeToNumbers,
  getRandomNum,
} from './utils/utils';

interface SkyDiving {
  root: HTMLElement;
  imgArray: string[];
  displaySize: string;
  speed: number;
  imagesClassName: string;
  init(): SkyDiving;
  add(displaySize: string, speed: number): void;
}

interface SkyDivingCreateProps {
  root: HTMLElement;
  imgArray: string[];
  displaySize: string;
  speed: number;
  imagesClassName: string;
}

/**
 * 画像の基本スタイルをスタイルシートに挿入
 * @param {string} imgClass
 * @returns {void}
 */
const addBaseStyle = (imgClass: string) => {
  const imgBaseStyle = `
    .${imgClass} {
      position: absolute;
      object-fit: cover;
      clip-path: polygon(50% 0%, 69% 25%, 98% 35%, 77% 56%, 82% 90%, 50% 79%, 17% 91%, 23% 56%, 2% 35%, 31% 25%);
      z-index: 100000;
    }
  `;

  addStyleRule(imgBaseStyle);
};

/**
 * 画像ごとのプロパティ作成
 * @param topPos topの初期位置
 * @param leftPos leftの初期位置
 * @param speed 落下する速さ
 * @returns {void}
 */
const createOptionalStyle = (
  topPos: number,
  leftPos: number,
  speed: number
): OptionalStyle => ({
  top: `-${topPos}px`,
  left: `${leftPos}px`,
  transition: `top ${speed}s cubic-bezier(0.38, 0, 0.78, 0), left ${speed}s cubic-bezier(.77,-0.24,.83,.67)`,
});

/**
 * 画像をDOMに挿入する
 * @param {HTMLElement} root ルート要素
 * @param {string[]} imgArray 画像パスを格納した配列
 * @param {string} displaySize 画像の表示サイズ
 * @returns
 */
const insertImgElms = (
  root: HTMLElement,
  imgArray: string[],
  displaySize: string
) => {
  const containerWidth = root.offsetWidth;
  const size = convertStringSizeToNumbers(displaySize, containerWidth);
  if (!size) return {};

  const displayImg = shuffleImage(imgArray)[0];
  const imgElm = createImgElm(displayImg, {
    width: size,
    height: size,
  });
  root.appendChild(imgElm);
  return { imgElm, size };
};

/**
 * スカイダイビングの要素を作成し挿入
 * @param {SkyDivingCreateProps}
 * @returns {void}
 */
const create = ({
  root,
  imgArray,
  displaySize,
  speed,
  imagesClassName,
}: SkyDivingCreateProps) => {
  const { imgElm, size } = insertImgElms(root, imgArray, displaySize);
  if (!imgElm || !size) return;

  const rootWidth = root.scrollWidth;
  const rootHeight = root.scrollHeight;
  const startLftPos = getRandomNum(rootWidth - size);
  const endLftPos = getRandomNum(rootWidth - size);

  imgElm.classList.add(imagesClassName);
  const baseStyle = createOptionalStyle(size, startLftPos, speed);
  Object.keys(baseStyle).forEach((style) => {
    const styles: CssProperty = imgElm.style;
    styles[style] = baseStyle[style];
    imgElm.addEventListener('transitionend', (e: TransitionEvent) => {
      if (e.currentTarget instanceof HTMLElement) {
        e.currentTarget.remove();
      }
    });
  });

  setTimeout(() => {
    imgElm.style.top = `${rootHeight}px`;
    imgElm.style.left = `${endLftPos}px`;
  });
};

/**
 * スカイダイビング
 */
class SkyDiving {
  /**
   * @constructor
   */
  constructor({ root, imgArray, displaySize, speed }: SkyDivingInitProps) {
    this.root = root;
    this.imgArray = imgArray;
    this.imagesClassName = '';
    this.displaySize = displaySize;
    this.speed = speed;
  }
  /**
   * スカイダイビングの準備
   * @returns {SkyDiving}
   */
  init() {
    const imagesClassName = `Accompany__img-${Date.now()}`;
    addBaseStyle(imagesClassName);

    this.imagesClassName = imagesClassName;
    return this;
  }

  add() {
    const { root, imgArray, imagesClassName, displaySize, speed } = this;
    return create({ root, imgArray, displaySize, speed, imagesClassName });
  }
}

export default SkyDiving;
