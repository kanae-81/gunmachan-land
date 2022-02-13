import FerrisWheel from './module/ferrisWheel';
import MerryGoRound from './module/merryGoRound';
import Accompany from './module/acompany';
import { gunmachanImages } from './module/utils/images';

interface GchanLand {
  root: HTMLElement;
  imgArray: string[];
  version: string;
  pause(imagesClassName: string | undefined): void;
  restart(imagesClassName: string | undefined): void;
  destroy(imagesClassName: string | undefined, delay?: number): void;
  ferrisWheel(
    duration: number,
    displaySize: string,
    marginRatio: number
  ): FerrisWheel;
  merryGoRound(
    duration: number,
    displaySize: string,
    marginRatio: number
  ): MerryGoRound;
  accompany(
    displayCount: number,
    displaySize: string,
    interval: number
  ): Accompany;
}

const version = '1.0.0';
class GchanLand implements GchanLand {
  constructor(root?: HTMLElement, imgArray?: string[]) {
    this.root = root || document.body;
    this.imgArray = imgArray || gunmachanImages;
  }
  static version = version;

  /**
   * アニメーション一時停止
   * @returns {void}
   */
  pause(imagesClassName: string) {
    const imageElms = document.querySelectorAll<HTMLImageElement>(
      `.${imagesClassName}`
    );
    imageElms.forEach((image) => {
      image.style.animationPlayState = 'paused';
    });
  }
  /**
   * アニメーション再生
   * @roptionalStyleeturns {void}
   */
  restart(imagesClassName: string) {
    const imageElms = document.querySelectorAll<HTMLImageElement>(
      `.${imagesClassName}`
    );
    imageElms.forEach((image) => {
      image.style.animationPlayState = 'running';
    });
  }

  /**
   * アニメーション破棄
   * @param {number} delay 画像削除の間隔(秒数指定)
   * @returns {void}
   */
  destroy(imagesClassName: string, delay?: number) {
    const images = document.querySelectorAll(`.${imagesClassName}`);
    const delayMs = delay ? delay * 1000 : 0;
    images.forEach((image, index) => {
      setTimeout(() => {
        image.remove();
      }, delayMs * index);
    });
  }

  /**
   * 観覧車
   * @param {number} duration 1周する時間 ( 秒数 )
   * @param {string} displaySize  ゴンドラのサイズ ( px or %: 要素の横幅に対する相対値 )
   * @param {number} marginRatio ゴンドラ間のマージン ( 1つのゴンドラの大きさに対する相対値 )
   * @returns
   */
  ferrisWheel(duration: number, displaySize: string, marginRatio: number) {
    const { root, imgArray, pause, restart, destroy } = this;
    root.style.position = 'relative';

    const ferrisWheelObject = new FerrisWheel({
      root,
      imgArray,
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
  }

  /**
   * メリーゴーランド
   * @param {number} duration 1周する時間 ( 秒数 )
   * @param {string} displaySize  ゴンドラのサイズ ( px or %: 要素の横幅に対する相対値 )
   * @param {number} marginRatio ゴンドラ間のマージン ( 1つのゴンドラの大きさに対する相対値 )
   * @returns
   */
  merryGoRound(duration: number, displaySize: string, marginRatio: number) {
    const { root, imgArray, pause, restart, destroy } = this;
    root.style.position = 'relative';
    root.style.overflow = 'hidden';

    const merryGoRoundObject = new MerryGoRound({
      root,
      imgArray,
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
  }

  /**
   * おともぐんまちゃん
   * @param {number} displayCount おともにするぐんまちゃんの数
   * @param {string} displaySize  おともにするぐんまちゃんのサイズ ( px or %: 要素の横幅に対する相対値 )
   * @param {number} interval おともぐんまちゃん間のマージン ( 1つのゴンドラの大きさに対する相対値 )
   * @returns
   */
  accompany(displayCount: number, displaySize: string, interval: number) {
    const { root, imgArray } = this;
    root.style.position = 'relative';
    root.style.overflow = 'hidden';

    return new Accompany({
      root,
      imgArray,
      interval,
      displaySize,
      displayCount,
    }).init();
  }
}

export default GchanLand;
