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
  marginRatio: number;
  displayCount: number;
}
export interface OptionalStyle {
  [keyof: CSSStyleDeclaration]: string;
}