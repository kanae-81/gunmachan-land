import { increaseImageAry, createImgElm } from './utils/images';
import { addStyleRule } from './utils/utils';
import { AccompanyInitProps } from '../@types/atraction';

interface Accompany {
  root: HTMLElement;
  imgArray: string[];
  interval: number;
  displaySize: string;
  displayCount: number;
  imagesClassName?: string;
  animationDelay?: number;
  init(): Accompany;
  resize(): void;
}

interface AccompanyRoot extends HTMLElement {
  accompanyAry: { x: number; y: number }[];
}

interface AccompanyImg extends HTMLImageElement {
  accompanyLen: number;
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
      top: 0px;
      left: 0px;
      object-fit: cover;
      border-radius: 50%;
      transition: transform 0.3s ease-out;
    }
  `;

  addStyleRule(imgBaseStyle);
};

/**
 * 画像群をDOMに挿入する
 * @param {AccompanyRoot} root ルート要素
 * @param {string} imgClass 画像に付与するクラス
 * @param {string[]} imgArray 画像パスを格納した配列
 * @param {string} displaySize 画像の表示サイズ
 * @param {number} displayCount 表示する画像の数
 */
const insertImgElms = (
  root: HTMLElement,
  imgClass: string,
  imgArray: string[],
  displaySize: string,
  displayCount: number
) => {
  const fragment = document.createDocumentFragment();
  const containerWidth = root.offsetWidth;
  const size = displaySize.includes('px')
    ? Number(displaySize.replace('px', ''))
    : containerWidth * (Number(displaySize.replace('%', '')) / 100);

  const displayImages = increaseImageAry(imgArray, displayCount);
  for (let index = 0; index < displayCount; index++) {
    const imgElm = createImgElm(displayImages[index], {
      width: size,
      height: size,
    }) as AccompanyImg;
    imgElm.classList.add(imgClass);
    imgElm.style.zIndex = `${displayCount - index}`;
    imgElm.accompanyLen = 0;
    fragment.appendChild(imgElm);
  }
  root.appendChild(fragment);
  addBaseStyle(imgClass);
};

/**
 * メリーゴーランドの要素を作成し挿入
 * @param {AccompanyInitProps}
 * @returns {imagesClassName: string; animationDelay: number;}
 */
const init = ({
  root,
  imgArray,
  interval,
  displaySize,
  displayCount,
}: AccompanyInitProps) => {
  const imgClass = `Accompany__img-${Date.now()}`;
  const accompanyRoot = root as AccompanyRoot;
  accompanyRoot.accompanyAry = [];

  insertImgElms(root, imgClass, imgArray, displaySize, displayCount);

  const imgs = document.querySelectorAll<AccompanyImg>(`.${imgClass}`);
  const moveEvent = new CustomEvent('move');
  const handleMove = () => {
    accompanyRoot.addEventListener('mousemove', (e: MouseEvent) => {
      const target = e.currentTarget as AccompanyRoot;
      if (target === null) return;
      const { accompanyAry } = accompanyRoot;
      const targetRect = target.getBoundingClientRect();
      const x = e.clientX - targetRect.left;
      const y = e.clientY - targetRect.top;
      const imgX = x + 8;
      const imgY = y + 8;
      accompanyRoot.accompanyAry = [...accompanyAry, { x: imgX, y: imgY }];
      imgs.forEach((img) => {
        img.dispatchEvent(moveEvent);
      });
    });
  };

  imgs.forEach((img, index) => {
    img.addEventListener('move', (e) => {
      const target = e.currentTarget as AccompanyImg;
      const { accompanyLen } = target;
      const { accompanyAry } = accompanyRoot;
      const length = accompanyAry.length;
      setTimeout(() => {
        for (let i = accompanyLen; index < length; i++) {
          const ary = accompanyAry[i];
          if (typeof ary === 'undefined') break;
          const x = ary.x;
          const y = ary.y;
          target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
          target.accompanyLen = i;
        }
      }, index * interval * 1000);
    });
  });

  accompanyRoot.addEventListener('mouseenter', handleMove);
  accompanyRoot.addEventListener('mouseleave', (e) => {
    const target = e.currentTarget;
    setTimeout(() => {
      accompanyRoot.accompanyAry = [];
      imgs.forEach((img) => {
        img.accompanyLen = 0;
      });
      target?.removeEventListener('mouseenter', handleMove);
    }, imgs.length * interval * 1000);
  });

  return {
    imagesClassName: imgClass,
  };
};

/**
 * おともぐんまちゃん
 */
class Accompany {
  /**
   * @constructor
   */
  constructor({
    root,
    imgArray,
    interval,
    displaySize,
    displayCount,
  }: AccompanyInitProps) {
    this.root = root;
    this.imgArray = imgArray;
    this.interval = interval;
    this.displaySize = displaySize;
    this.displayCount = displayCount;
  }
  /**
   * おともぐんまちゃんの作成
   * @returns {MerryGoRound}
   */
  init() {
    const { root, imgArray, interval, displaySize, displayCount, resize } =
      this;
    const { imagesClassName } = init({
      root,
      imgArray,
      interval,
      displaySize,
      displayCount,
    });
    this.imagesClassName = imagesClassName;
    this.resize = resize;
    return this;
  }

  /**
   * おともぐんまちゃんのリサイズ
   * @returns {void}
   */
  resize() {
    const { root, displaySize, imagesClassName } = this;
    const containerWidth = root.offsetWidth;
    const imgs = document.querySelectorAll<HTMLImageElement>(
      `.${imagesClassName}`
    );
    if (!displaySize.includes('px')) {
      const size =
        containerWidth * (Number(displaySize.replace('%', '')) / 100);
      imgs.forEach((img) => {
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
      });
    }
  }
}

export default Accompany;
