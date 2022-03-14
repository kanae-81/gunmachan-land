/**
 * アニメーション一時停止
 * @param {string} imagesClassName クラス名
 * @returns {void}
 */
export const pause = (imagesClassName: string) => {
  const imageElms = document.querySelectorAll<HTMLImageElement>(
    `.${imagesClassName}`
  );
  imageElms.forEach((image) => {
    image.style.animationPlayState = 'paused';
  });
};

/**
 * アニメーション再生
 * @param {string} imagesClassName クラス名
 * @return {void}
 */
export const restart = (imagesClassName: string) => {
  const imageElms = document.querySelectorAll<HTMLImageElement>(
    `.${imagesClassName}`
  );
  imageElms.forEach((image) => {
    image.style.animationPlayState = 'running';
  });
};

/**
 * アニメーション破棄
 * @param {string} imagesClassName クラス名
 * @param {number} delay 画像削除の間隔(秒数指定)
 * @returns {void}
 */
export const destroy = (imagesClassName: string, delay?: number) => {
  const images = document.querySelectorAll(`.${imagesClassName}`);
  const delayMs = delay ? delay * 1000 : 0;
  images.forEach((image, index) => {
    setTimeout(() => {
      image.remove();
    }, delayMs * index);
  });
};
