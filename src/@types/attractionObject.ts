import FerrisWheel from '../module/ferrisWheel';

export interface FerrisWheelObject extends FerrisWheel {
  pause: () => void;
  restart: () => void;
  destroy: (delay?: number | undefined) => void;
}

export interface MerryGoRoundObject {
  duration: number;
  displaySize: string;
  marginRatio: number;
  root?: HTMLElement;
  imgArray?: string[];
}

export interface SkyDivingObject {
  root?: HTMLElement;
  imgArray?: string[];
}

export interface CoffeeObject {
  displaySize: string;
  defaultSpeed: number;
  fastRatio: number;
  root?: HTMLElement;
  imgArray?: string[];
}

export interface AccompanyObject {
  displayCount: number;
  displaySize: string;
  interval: number;
  root?: HTMLElement;
  imgArray?: string[];
}
