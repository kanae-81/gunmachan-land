export const addStyleRule = (style: string) => {
  const sheets = document.styleSheets;
  const sheet = sheets[sheets.length - 1];

  //スタイルルールの追加
  sheet.insertRule(style, sheet.cssRules.length);
};

export const convertStringSizeToNumbers = (
  stringSize: string,
  containerWidth: number
) => {
  try {
    if (!stringSize.includes('px') && !stringSize.includes('%')) {
      throw new Error(
        '表示サイズ (displayWidth) は px か % で指定してください'
      );
    }
    const numberSize = stringSize.includes('px')
      ? Number(stringSize.replace('px', ''))
      : containerWidth * (Number(stringSize.replace('%', '')) / 100);

    return numberSize;
  } catch (error) {
    console.error(error);
  }
};
