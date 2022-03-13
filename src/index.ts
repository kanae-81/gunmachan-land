import FerrisWheel from './module/ferrisWheel';
import MerryGoRound from './module/merryGoRound';
import Accompany from './module/accompany';
import SkyDiving from './module/skyDiving';
import { gunmachanImages } from './module/utils/images';

/**
 * アニメーション一時停止
 * @returns {void}
 */
const pause = (imagesClassName: string) => {
  const imageElms = document.querySelectorAll<HTMLImageElement>(
    `.${imagesClassName}`
  );
  imageElms.forEach((image) => {
    image.style.animationPlayState = 'paused';
  });
};
/**
 * アニメーション再生
 * @return {void}
 */
const restart = (imagesClassName: string) => {
  const imageElms = document.querySelectorAll<HTMLImageElement>(
    `.${imagesClassName}`
  );
  imageElms.forEach((image) => {
    image.style.animationPlayState = 'running';
  });
};

/**
 * アニメーション破棄
 * @param {number} delay 画像削除の間隔(秒数指定)
 * @returns {void}
 */
const destroy = (imagesClassName: string, delay?: number) => {
  const images = document.querySelectorAll(`.${imagesClassName}`);
  const delayMs = delay ? delay * 1000 : 0;
  images.forEach((image, index) => {
    setTimeout(() => {
      image.remove();
    }, delayMs * index);
  });
};

/**
 * 観覧車
 * @param {number} duration 1周する時間 ( 秒数 )
 * @param {string} displaySize  ゴンドラのサイズ ( px or %: 要素の横幅に対する相対値 )
 * @param {number} marginRatio ゴンドラ間のマージン ( 1つのゴンドラの大きさに対する相対値 )
 * @returns
 */
export const ferrisWheel = (
  duration: number,
  displaySize: string,
  marginRatio: number,
  root?: HTMLElement,
  imgArray?: string[]
) => {
  const thisRoot = root || document.body;
  const thisImgArray = imgArray || gunmachanImages;
  thisRoot.style.position = 'relative';

  const ferrisWheelObject = new FerrisWheel({
    root: thisRoot,
    imgArray: thisImgArray,
    duration,
    marginRatio,
    displaySize,
  }).init();

  const { imagesClassName } = ferrisWheelObject;

  return {
    ...ferrisWheelObject,
    pause: () => pause(imagesClassName),
    restart: () => restart(imagesClassName),
    destroy: (delay?: number) => destroy(imagesClassName, delay),
  };
};

/**
 * メリーゴーランド
 * @param {number} duration 1周する時間 ( 秒数 )
 * @param {string} displaySize  ゴンドラのサイズ ( px or %: 要素の横幅に対する相対値 )
 * @param {number} marginRatio ゴンドラ間のマージン ( 1つのゴンドラの大きさに対する相対値 )
 * @returns
 */
export const merryGoRound = (
  duration: number,
  displaySize: string,
  marginRatio: number,
  root?: HTMLElement,
  imgArray?: string[]
) => {
  // const { root, imgArray, pause, restart, destroy } = this;
  const thisRoot = root || document.body;
  const thisImgArray = imgArray || gunmachanImages;
  thisRoot.style.position = 'relative';
  thisRoot.style.overflow = 'hidden';

  const merryGoRoundObject = new MerryGoRound({
    root: thisRoot,
    imgArray: thisImgArray,
    duration,
    marginRatio,
    displaySize,
  }).init();
  const { imagesClassName } = merryGoRoundObject;
  return {
    ...merryGoRoundObject,
    pause: () => pause(imagesClassName),
    restart: () => restart(imagesClassName),
    destroy: (delay?: number) => destroy(imagesClassName, delay),
  };
};

/**
 * スカイダイビング
 * @returns
 */
export const skyDiving = (root?: HTMLElement, imgArray?: string[]) => {
  const thisRoot = root || document.body;
  const thisImgArray = imgArray || gunmachanImages;
  thisRoot.style.position = 'relative';
  thisRoot.style.overflow = 'hidden';

  return new SkyDiving({
    root: thisRoot,
    imgArray: thisImgArray,
  }).init();
};

/**
 * おともぐんまちゃん
 * @param {number} displayCount おともにするぐんまちゃんの数
 * @param {string} displaySize  おともにするぐんまちゃんのサイズ ( px or %: 要素の横幅に対する相対値 )
 * @param {number} interval おともぐんまちゃん間のマージン ( 1つのゴンドラの大きさに対する相対値 )
 * @returns
 */
export const accompany = (
  displayCount: number,
  displaySize: string,
  interval: number,
  root?: HTMLElement,
  imgArray?: string[]
) => {
  const thisRoot = root || document.body;
  const thisImgArray = imgArray || gunmachanImages;
  thisRoot.style.position = 'relative';
  thisRoot.style.overflow = 'hidden';

  return new Accompany({
    root: thisRoot,
    imgArray: thisImgArray,
    interval,
    displaySize,
    displayCount,
  }).init();
};
