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
}

export interface OptionalStyle {
  [keyof: CSSStyleDeclaration]: string;
}
