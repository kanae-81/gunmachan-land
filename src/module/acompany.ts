import { increaseImageAry, createImgElm } from './utils/images';
import { addStyleRule, convertStringSizeToNumbers } from './utils/utils';
import { AccompanyInitProps } from '../@types/atraction';

interface Accompany {
  root: HTMLElement;
  imgArray: string[];
  interval: number;
  displaySize: string;
  displayCount: number;
  imagesClassName?: string;
  // TODO: これあるんだっけ
  animationDelay?: number;
  init(): Accompany;
  resize(): void;
  // TODO: destroyはあってもいいかも
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
      opacity: 0;
      transition: transform 0.3s ease-out,opacity 0.3s ease-in;
    }
  `;

  addStyleRule(imgBaseStyle);
};

/**
 * 画像群をDOMに挿入する
 * @param {HTMLElement} root ルート要素
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
  const size = convertStringSizeToNumbers(displaySize, containerWidth);
  if (!size) return;

  const displayImages = increaseImageAry(imgArray, displayCount);
  for (let index = 0; index < displayCount; index++) {
    const imgElm = createImgElm(displayImages[index], {
      width: size,
      height: size,
    });
    imgElm.classList.add(imgClass);
    imgElm.style.zIndex = `${displayCount - index}`;
    fragment.appendChild(imgElm);
  }
  root.appendChild(fragment);
  addBaseStyle(imgClass);
};

/**
 * おともぐんまちゃんの要素を作成し挿入
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

  insertImgElms(root, imgClass, imgArray, displaySize, displayCount);

  const imgs = document.querySelectorAll<HTMLImageElement>(`.${imgClass}`);

  let timer: number[] = [];
  const moveEventCallBack = (
    img: HTMLImageElement,
    index: number,
    x: number,
    y: number
  ) => {
    const moveTimer = window.setTimeout(() => {
      img.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }, index * interval * 1000);
    timer = [...timer, moveTimer];
  };

  let accompanyAry: { x: number; y: number }[] = [];
  const handleMouseMove = (e: MouseEvent) => {
    const target = e.currentTarget;
    if (target instanceof HTMLElement) {
      const targetRect = target.getBoundingClientRect();
      const x = e.clientX - targetRect.left;
      const y = e.clientY - targetRect.top;
      const imgX = x + 8;
      const imgY = y + 8;
      accompanyAry = [...accompanyAry, { x: imgX, y: imgY }];
      imgs.forEach((img, index) => {
        moveEventCallBack(img, index, imgX, imgY);
      });
    }
  };
  const handleMouseSeenter = () => {
    imgs.forEach((img) => {
      img.style.opacity = '1';
    });
  };
  const handleMouseLeave = (e: MouseEvent) => {
    const { x, y } = accompanyAry[accompanyAry.length - 1];
    imgs.forEach((img) => {
      img.style.opacity = '0';
      img.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
    timer.forEach((num) => clearTimeout(num));
    accompanyAry = [];
  };

  root.addEventListener('mousemove', handleMouseMove);
  root.addEventListener('mouseenter', handleMouseSeenter);
  root.addEventListener('mouseleave', handleMouseLeave);

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
