import ferrisWheel from './module/ferrisWheel';
import { gunmachanImages } from './module/utils/images';

interface GchanLand {
  root: HTMLElement;
  imgArray: string[];
  version: string;
}

const version = '1.0.0';
class GchanLand implements GchanLand {
  constructor(root?: HTMLElement, imgArray?: string[]) {
    this.root = root || document.body;
    this.root.style.position = 'relative';

    this.imgArray = imgArray || gunmachanImages;
  }
  static version = version;
  ferrisWheel = () => {
    const { root, imgArray } = this;
    return ferrisWheel(root, imgArray);
  };
}

export default GchanLand;
