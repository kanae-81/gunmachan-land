import { shuffleImage, createImg } from './utils/images';
import { addStyleRule } from './utils/utils';
interface MerryGoRound {
  root: HTMLElement;
  imgArray: string[];
  duration: number;
  marginRatio: number;
  displaySize: string;
  imagesClassName?: string;
  animationDelay?: number;
  test: string;
  init(): MerryGoRound;
  resize(): void;
  pause(): void;
  restart(): void;
  destroy(delay?: number): void;
}

interface initProps {
  root: HTMLElement;
  imgArray: string[];
  duration: number;
  displaySize: string;
  marginRatio: number;
}

interface OptionalStyle {
  width: string;
  height: string;
  offsetPath: string;
}

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
  const size = displaySize.includes('px')
    ? Number(displaySize.replace('px', ''))
    : containerWidth * (Number(displaySize.replace('%', '')) / 100);
  const margin = size * marginRatio;
  const pathWidth = containerWidth - size / 2;
  const pathHeight = containerHeight - margin * 2;
  return {
    containerHeight,
    containerWidth,
    size,
    pathWidth,
    pathHeight,
    margin,
    optionalStyle: {
      width: `${size}px`,
      height: `${size}px`,
      offsetPath: `path('M ${pathWidth} ${pathHeight} l -${
        containerWidth - size
      } 0  Z')`,
    },
  };
};

/**
 * メリーゴーランドの要素を作成し挿入
 * @param {HTMLElement} root 挿入先の要素
 * @param {string[]} imgArray 画像URLリスト
 * @returns {void}
 */
const init = ({
  root,
  imgArray,
  duration,
  marginRatio,
  displaySize,
}: initProps) => {
  const fragment = document.createDocumentFragment();
  const imgClass = `MerryGoRound__img-${Date.now()}`;
  const upper = 9999;
  const lower = 8888;

  const keyframe = `
    @keyframes move{
      0% {
        offset-distance: 0;
        top: -3%;
        z-index: ${upper};
      }
      20%,45% {
        top: 0%;
      }
      35%,55%,75% {
        top: -3%;
      }
      60%,90% {
        top: -6%;
      }
      100% {
        top: -3%;
        offset-distance: 100%;
        z-index: ${lower};
      }
    }
  `;
  addStyleRule(keyframe);
  const imgBaseStyle = `
    .${imgClass} {
      position: absolute;
      top: 0px;
      left: 0px;
      object-fit: cover;
      box-shadow: 0 0 3px #000;
      offset-rotate: 0deg;
      clip-path: ellipse(57% 77% at 50% 78%);
      animation: move ${duration}s infinite linear;
    }
  `;
  addStyleRule(imgBaseStyle);

  const { containerWidth, size, optionalStyle } = createOptionalProps(
    root,
    displaySize,
    marginRatio
  );

  const trackLength = (containerWidth - size) * 2;
  const waitLength = size * marginRatio;
  const count = Math.floor(trackLength / (waitLength + size));
  const ratio = (duration * (waitLength + size)) / trackLength;
  const getDisplayImageAry = () => {
    const images = shuffleImage(imgArray);
    if (count <= images.length) {
      return images;
    }
    let newArray = [...images];
    const roopCount = Math.ceil(count / images.length);
    for (let index = 0; index < roopCount; index++) {
      newArray = [...newArray, ...images];
    }
    return newArray;
  };
  const displayImages = getDisplayImageAry();
  for (let index = 0; index < count; index++) {
    const imgElm = createImg(displayImages[index], {
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

  root.appendChild(fragment);
  return {
    imagesClassName: imgClass,
    animationDelay: ratio,
  };
};

/**
 * ぐんまちゃんメリーゴーランド
 */
class MerryGoRound {
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
   * メリーゴーランドの作成
   * @returns {}
   */
  init() {
    const { root, imgArray, duration, marginRatio, displaySize } = this;
    const { imagesClassName, animationDelay } = init({
      root,
      imgArray,
      duration,
      marginRatio,
      displaySize,
    });
    this.imagesClassName = imagesClassName;
    this.animationDelay = animationDelay;
    return this;
  }

  /**
   * メリーゴーランドのリサイズ
   * @returns {void}
   */
  resize() {
    const { root, imagesClassName, displaySize, marginRatio } = this;
    if (!imagesClassName) return;

    const { optionalStyle } = createOptionalProps(
      root,
      displaySize,
      marginRatio
    );
    const images = document.querySelectorAll<HTMLImageElement>(
      `.${imagesClassName}`
    );
    images.forEach((image) => {
      (Object.keys(optionalStyle) as [keyof OptionalStyle]).forEach((key) => {
        image.style[key] = optionalStyle[key];
      });
    });
  }

  /**
   * メリーゴーランドの一時停止
   * @returns {void}
   */
  pause() {
    const { imagesClassName } = this;
    const imageElms = document.querySelectorAll<HTMLImageElement>(
      `.${imagesClassName}`
    );
    imageElms.forEach((image) => {
      image.style.animationPlayState = 'paused';
    });
  }

  /**
   * メリーゴーランドの再生
   * @returns {void}
   */
  restart() {
    const { imagesClassName } = this;
    const imageElms = document.querySelectorAll<HTMLImageElement>(
      `.${imagesClassName}`
    );
    imageElms.forEach((image) => {
      image.style.animationPlayState = 'running';
    });
  }

  /**
   * メリーゴーランドの破棄
   * @param {number} delay 画像削除の間隔(秒数指定)
   * @returns {void}
   */
  destroy(delay?: number) {
    const { imagesClassName } = this;
    const images = document.querySelectorAll(`.${imagesClassName}`);
    const delayMs = delay ? delay * 1000 : 0;
    images.forEach((image, index) => {
      setTimeout(() => {
        image.remove();
      }, delayMs * index);
    });
  }
}

export default MerryGoRound;
