import ferrisWheel from './module/ferrisWheel';
import { gunmachanImages } from './module/utils/images';

interface GchanLand {
  root: HTMLElement;
  imgArray: string[];
  version: string;
  ferrisWheel: (
    duration: number,
    displaySize: string,
    marginRatio: number
  ) => ferrisWheel;
}

const version = '1.0.0';
class GchanLand implements GchanLand {
  constructor(root?: HTMLElement, imgArray?: string[]) {
    this.root = root || document.body;
    this.root.style.position = 'relative';

    this.imgArray = imgArray || gunmachanImages;
  }
  static version = version;
  /**
   * 観覧車
   * @param {number} duration 1周する時間 ( 秒数 )
   * @param {string} displaySize  ゴンドラのサイズ ( px or %: 要素の横幅に対する相対値 )
   * @param {number} marginRatio ゴンドラ間のマージン ( 1つのゴンドラの大きさに対する相対値 )
   * @returns
   */
  ferrisWheel = (
    duration: number,
    displaySize: string,
    marginRatio: number
  ) => {
    const { root, imgArray } = this;
    return new ferrisWheel({
      root,
      imgArray,
      duration,
      marginRatio,
      displaySize,
    }).init();
  };
}

export default GchanLand;
