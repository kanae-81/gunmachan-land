export const addStyleRule = (style: string) => {
  const sheets = document.styleSheets;
  const sheet = sheets[sheets.length - 1];

  //スタイルルールの追加
  sheet.insertRule(style, sheet.cssRules.length);
};
