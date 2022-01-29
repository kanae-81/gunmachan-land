import { a } from '../src/module/index';

describe('a()のテスト', () => {
  it('test と出力', () => {
    const log = jest.spyOn(console, 'log').mockReturnValue();

    // a メソッドの実行
    a();

    // 1番目のログ出力が 'Hello.' と一致するかチェック
    expect(log).toHaveBeenNthCalledWith(1, 'test');

    // 'jest.spyOn()' によって作成されたモックをリセットします
    log.mockRestore();
  });
});
