import { increaseImageAry, createImgElm } from './utils/images';
import { addStyleRule } from './utils/utils';
import { AccompanyInitProps } from '../@types/atraction';

interface Accompany {
  root: HTMLElement;
  imgArray: string[];
  marginRatio: number;
  displaySize: string;
  displayCount: number;
  imagesClassName?: string;
  animationDelay?: number;
  init(): Accompany;
  resize(): void;
  pause(): void;
  restart(): void;
  destroy(delay?: number): void;
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
 * @param {number} size
 * @returns {void}
 */
const addBaseStyle = (imgClass: string): void => {
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
  root: HTMLElement,
  imgClass: string,
  marginRatio: number,
  imgArray: string[],
  displaySize: string,
  displayCount: number
) => {
  const fragment = document.createDocumentFragment();
  const containerWidth = root.offsetWidth;
  const size = displaySize.includes('px')
    ? Number(displaySize.replace('px', ''))
    : containerWidth * (Number(displaySize.replace('%', '')) / 100);
  const margin = size * marginRatio;

  const waitLength = size + margin;
  console.log(waitLength);
  const ratio = 0.1;

  const displayImages = increaseImageAry(imgArray, displayCount);
  for (let index = 0; index < displayCount; index++) {
    const imgElm = createImgElm(displayImages[index], {
      width: size,
      height: size,
    });
    imgElm.classList.add(imgClass);
    fragment.appendChild(imgElm);
  }
  return {
    imgElms: fragment,
    ratio: ratio,
    size: size,
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
  marginRatio,
  displaySize,
  displayCount,
}: AccompanyInitProps) => {
  const imgClass = `Accompany__img-${Date.now()}`;
  const accompanyRoot = root as AccompanyRoot;

  const { imgElms, ratio } = createImgElms(
    root,
    imgClass,
    marginRatio,
    imgArray,
    displaySize,
    displayCount
  );

  addBaseStyle(imgClass);
  root.appendChild(imgElms);
  const imgs = document.querySelectorAll<AccompanyImg>(`.${imgClass}`);
  accompanyRoot.accompanyAry = [];
  imgs.forEach((img, index) => {
    img.style.zIndex = `${imgs.length - index}`;
    img.accompanyLen = 0;
  });

  const move = () => {
    accompanyRoot.addEventListener('mousemove', (e: MouseEvent) => {
      const target = e.currentTarget;
      if (target === null) return;
      const { accompanyAry } = accompanyRoot;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const targetRect = target.getBoundingClientRect();
      const x = e.clientX - targetRect.left;
      const y = e.clientY - targetRect.top;
      const imgX = x + 8;
      const imgY = y + 8;
      accompanyRoot.accompanyAry = [...accompanyAry, { x: imgX, y: imgY }];
      for (let index = 0; index < imgs.length; index++) {
        const img = imgs[index];
        setTimeout(() => {
          img.dispatchEvent(moveEvent);
          console.log('dispatch', index);
        }, index * ratio * 1000);
      }
    });
  };
  const moveEvent = new CustomEvent('move');
  imgs.forEach((img, index) => {
    img.addEventListener('move', (e) => {
      const target = e.currentTarget;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { accompanyLen } = target;
      const { accompanyAry } = accompanyRoot;
      const length = accompanyAry.length;
      for (let i = accompanyLen; index < length; i++) {
        const ary = accompanyAry[i];
        if (typeof ary === 'undefined') break;
        const x = ary.x;
        const y = ary.y;
        img.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        img.accompanyLen = i;
      }
    });
  });

  accompanyRoot.addEventListener('mouseenter', move);
  accompanyRoot.addEventListener('mouseleave', (e) => {
    const target = e.currentTarget;
    setTimeout(() => {
      accompanyRoot.accompanyAry = [];
      imgs.forEach((img) => {
        img.accompanyLen = 0;
      });
      target?.removeEventListener('mouseenter', move);
    }, imgs.length * ratio * 1000);
  });

  return {
    imagesClassName: imgClass,
  };
};

/**
 * ぐんまちゃんメリーゴーランド
 */
class Accompany {
  /**
   * @constructor
   */
  constructor({
    root,
    imgArray,
    marginRatio,
    displaySize,
    displayCount,
  }: AccompanyInitProps) {
    this.root = root;
    this.imgArray = imgArray;
    this.marginRatio = marginRatio;
    this.displaySize = displaySize;
    this.displayCount = displayCount;
  }
  /**
   * メリーゴーランドの作成
   * @returns {MerryGoRound}
   */
  init() {
    const { root, imgArray, marginRatio, displaySize, displayCount, resize } =
      this;
    const { imagesClassName } = init({
      root,
      imgArray,
      marginRatio,
      displaySize,
      displayCount,
    });
    this.imagesClassName = imagesClassName;
    this.resize = resize;
    return this;
  }

  /**
   * メリーゴーランドのリサイズ
   * @returns {void}
   */
  resize() {
    console.log('');
  }
}

export default Accompany;
