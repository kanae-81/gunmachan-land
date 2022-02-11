export interface initProps {
  root: HTMLElement;
  imgArray: string[];
  duration: number;
  displaySize: string;
  marginRatio: number;
}

export interface OptionalStyle {
  [keyof: CSSStyleDeclaration]: string;
}
