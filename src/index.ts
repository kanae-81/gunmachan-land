import FerrisWheel from './module/ferrisWheel';
import MerryGoRound from './module/merryGoRound';
import Accompany from './module/accompany';
import SkyDiving from './module/skyDiving';
import { gunmachanImages } from './module/utils/images';
import {
  FerrisWheelOptions,
  MerryGoRoundOptions,
  SkyDivingOptions,
  AccompanyOptions,
} from './@types/attractionOptions';

/**
 * 観覧車
 * @param {FerrisWheelOptions} 観覧車のオプション
 * @returns {FerrisWheel}
 */
export const ferrisWheel = ({
  duration,
  displaySize,
  marginRatio,
  root,
  imgArray,
}: FerrisWheelOptions): FerrisWheel => {
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

  return ferrisWheelObject;
};

/**
 * メリーゴーランド
 * @param {MerryGoRoundOptions} メリーゴーランドのオプション
 * @returns {MerryGoRound}
 */
export const merryGoRound = ({
  duration,
  displaySize,
  marginRatio,
  root,
  imgArray,
}: MerryGoRoundOptions): MerryGoRound => {
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

  return merryGoRoundObject;
};

/**
 * スカイダイビング
 * @param {SkyDivingOptions} スカイダイビングのオプション
 * @returns {SkyDiving}
 */
export const skyDiving = ({
  root,
  imgArray,
  displaySize,
  speed,
}: SkyDivingOptions): SkyDiving => {
  const thisRoot = root || document.body;
  const thisImgArray = imgArray || gunmachanImages;
  thisRoot.style.position = 'relative';
  thisRoot.style.overflow = 'hidden';

  return new SkyDiving({
    root: thisRoot,
    imgArray: thisImgArray,
    displaySize,
    speed,
  }).init();
};

/**
 * おともぐんまちゃん
 * @param {AccompanyOptions} おともぐんまちゃんのオプション
 * @returns {Accompany}
 */
export const accompany = ({
  displayCount,
  displaySize,
  interval,
  root,
  imgArray,
}: AccompanyOptions): Accompany => {
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
