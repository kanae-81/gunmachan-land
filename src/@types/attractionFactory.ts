export interface initProps {
  root: HTMLElement;
  imgArray: string[];
  duration: number;
  displaySize: string;
  marginRatio: number;
}
export interface AccompanyInitProps {
  root: HTMLElement;
  imgArray: string[];
  displaySize: string;
  interval: number;
  displayCount: number;
}

export interface SkyDivingInitProps {
  root: HTMLElement;
  imgArray: string[];
  displaySize: string;
  speed: number;
}

export interface CoffeeCupInitProps {
  root: HTMLElement;
  imgArray: string[];
  displayCount: number;
  displaySize: string;
  defaultSpeed: number;
  fastRatio: number;
}

export type OptionalStyle = {
  [key: string]: string;
};

export interface CssProperty extends CSSStyleDeclaration {
  [key: string]: any;
}
