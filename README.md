# ぐんまちゃん ランド

ぐんまちゃん の遊園地を創造できます。

## DEMO

## Get start

```shell
npm install gunmachan-land
```

```js
import GchanLand from 'gunmachan-land';
const gchan = new GchanLand(...options);
```

### options

| Option   | Type        | Default          | Description                                          |
| -------- | ----------- | ---------------- | ---------------------------------------------------- |
| root     | HTMLElement | body 要素        | アトラクションの対象となる要素を指定します。         |
| imgArray | string[]    | ぐんまちゃん画像 | アトラクションに乗車する画像パスを配列で指定します。 |

### Atractions

- [`ferrisWheel` : 観覧車](#ferriswheel--観覧車)
- [`merryGoRound` : メリーゴーランド](#merrygoround--メリーゴーランド)
- [`skyDiving` : スカイダイビング](#skydiving--スカイダイビング)
- [`Accompany` : おともぐんまちゃん](#accompany--おともぐんまちゃん)

## `ferrisWheel` : 観覧車

### Description

画面の際をひたすらぐるぐる回ります。

### Settings

```js
const gchan = new GchanLand(root);
gchan.ferrisWheel(duration, displaySize, marginRatio);
```

| param       | Type   | Description                                                                   |
| ----------- | ------ | ----------------------------------------------------------------------------- |
| duration    | number | ゴンドラが 1 周する時間<br>秒数で指定してください。                           |
| displaySize | string | ゴンドラのサイズ<br>`px` or `%` で指定してください。(root 要素の横幅が`100%`) |
| marginRatio | number | ゴンドラの間隔<br> ゴンドラの大きさを`1`とした相対値で指定してください。      |

### Methods

| method  | Type                           | Description                                                                                                       |
| ------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| pause   | () => void                     | 一時停止します                                                                                                    |
| restart | () => void                     | 再生します                                                                                                        |
| destroy | (delay?: number) => void       | ゴンドラを破棄します。<br>`delay`で秒数を指定すると、その秒数間隔で順番にゴンドラが破棄されます。                 |
| resize  | (displaySize?: string) => void | ゴンドラの大きさをリサイズします。<br>引数ががない場合、`ferrisWheel`を呼び出した際の指定に従ってリサイズします。 |

#### Example

```js
const ferrisWheelObj = gchan.ferrisWheel(10, '10%', 0.5);

elment1.addEventListener('click', () => {
  // 一時停止
  ferrisWheelObj.pause();
});

elment2.addEventListener('click', () => {
  // 再生
  ferrisWheelObj.restart();
});

elment3.addEventListener('click', () => {
  // 破棄
  ferrisWheelObj.destroy();
});

window.addEventListener('resize', () => {
  // リサイズ
  ferrisWheelObj.resize();
});
```

### Others

| Property        | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| imagesClassName | string | ゴンドラ要素のクラス名                     |
| animationDelay  | number | 前のゴンドラとのアニメーション間隔（秒数） |

#### Example

```js
const ferrisWheelObj = gchan.ferrisWheel(10, '10%', 0.5);
const { imagesClassName, animationDelay } = ferrisWheelObj;

// ゴンドラの形を変更する
const images = Array.from(document.querySelectorAll(`.${imagesClassName}`)
images.forEach((img) => {
  img.style.borderRadius = 'none';
})

// ゴンドラが1周したタイミングで破棄
setTimeout(() => {
  ferrisWheelObj.destroy(animationDelay);
}, 10)
```

## `merryGoRound` : メリーゴーランド

### Description

画面下部をずーっと行ったり来たりします。

### Settings

```js
const gchan = new GchanLand(root);
gchan.merryGoRound(duration, displaySize, marginRatio);
```

| param       | Type   | Description                                                                   |
| ----------- | ------ | ----------------------------------------------------------------------------- |
| duration    | number | ゴンドラが 1 往復する時間<br>秒数で指定してください。                         |
| displaySize | string | ゴンドラのサイズ<br>`px` or `%` で指定してください。(root 要素の横幅が`100%`) |
| marginRatio | number | ゴンドラの間隔<br> ゴンドラの大きさを`1`とした相対値で指定してください。      |

### Methods

| method  | Type                           | Description                                                                                                        |
| ------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| pause   | () => void                     | 一時停止します                                                                                                     |
| restart | () => void                     | 再生します                                                                                                         |
| destroy | (delay?: number) => void       | ゴンドラを破棄します。<br>`delay`で秒数を指定すると、その秒数間隔で順番にゴンドラが破棄されます。                  |
| resize  | (displaySize?: string) => void | ゴンドラの大きさをリサイズします。<br>引数ががない場合、`merryGoRound`を呼び出した際の指定に従ってリサイズします。 |

#### Example

```js
const merryGoRoundObj = gchan.merryGoRound(10, '10%', 0.5);

elment1.addEventListener('click', () => {
  // 一時停止
  merryGoRoundObj.pause();
});

elment2.addEventListener('click', () => {
  // 再生
  merryGoRoundObj.restart();
});

elment3.addEventListener('click', () => {
  // 破棄
  merryGoRoundObj.destroy();
});

window.addEventListener('resize', () => {
  // リサイズ
  merryGoRoundObj.resize();
});
```

### Others

| Property        | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| imagesClassName | string | ゴンドラ要素のクラス名                     |
| animationDelay  | number | 前のゴンドラとのアニメーション間隔（秒数） |

#### Example

```js
const merryGoRoundObj = gchan.merryGoRound(10, '10%', 0.5);
const { imagesClassName, animationDelay } = merryGoRoundObj;

// ゴンドラの形を変更する
const images = Array.from(document.querySelectorAll(`.${imagesClassName}`)
images.forEach((img) => {
  img.style.borderRadius = 'none';
})

// ゴンドラが1往復したタイミングで破棄
setTimeout(() => {
  merryGoRoundObj.destroy(animationDelay);
}, 10)
```

## コーヒーカップ

- 画面内にいるぐんまちゃん をクリックすると回転する

## ジェットコースター

- ぐんまちゃん が縦横無尽に画面内をうろうろする

## `skyDiving` : スカイダイビング

### Description

上からぐんまちゃんが降ってきます

### Settings

```js
const gchan = new GchanLand(root);
const skyDivingObj = gchan.skyDiving(displaySize, speed);
```

| param       | Type   | Description                                                                       |
| ----------- | ------ | --------------------------------------------------------------------------------- |
| displaySize | string | ぐんまちゃんのサイズ<br>`px` or `%` で指定してください。(root 要素の横幅が`100%`) |
| speed       | number | ぐんまちゃんが下まで落ちる時間<br>秒数で指定してください。                        |

### Others

| Property        | Type   | Description                |
| --------------- | ------ | -------------------------- |
| imagesClassName | string | ぐんまちゃん要素のクラス名 |

#### Example

```js
const skyDivingObj = gchan.skyDiving(10, '10%', 0.5);
const { imagesClassName } = skyDivingObj;

// ゴンドラの形を変更する
const images = Array.from(document.querySelectorAll(`.${imagesClassName}`)
images.forEach((img) => {
  img.style.clipPath = 'xxx';
})

```

## お化け屋敷

- 突然画面内にぐんまちゃん が現れる。そのうち消える

## `Accompany` : おともぐんまちゃん

### Description

ぐんまちゃんがマウスに追従します。

### Settings

```js
const gchan = new GchanLand(root);
gchan.accompany(duration, displaySize, marginRatio);
```

| param        | Type   | Description                                                                          |
| ------------ | ------ | ------------------------------------------------------------------------------------ |
| displayCount | number | おともにするぐんまちゃんの数                                                         |
| displaySize  | string | ぐんまちゃんのサイズ<br>`px` or `%` で指定してください。(root 要素の横幅が`100%`)    |
| interval     | number | ぐんまちゃん同士の間隔<br> ぐんまちゃんの大きさを`1`とした相対値で指定してください。 |

### Methods

| method | Type                           | Description                                                                                                         |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| resize | (displaySize?: string) => void | ぐんまちゃんの大きさをリサイズします。<br>引数ががない場合、`accompany`を呼び出した際の指定に従ってリサイズします。 |

#### Example

```js
const accompanyObj = gchan.accompany(10, '10%', 0.5);

window.addEventListener('resize', () => {
  // リサイズ
  accompanyObj.resize();
});
```

### Others

| Property        | Type   | Description                                    |
| --------------- | ------ | ---------------------------------------------- |
| imagesClassName | string | ぐんまちゃん要素のクラス名                     |
| animationDelay  | number | 前のぐんまちゃんとのアニメーション間隔（秒数） |

#### Example

```js
const accompanyObj = gchan.accompany(10, '10%', 0.5);
const { imagesClassName, animationDelay } = accompanyObj;

// ぐんまちゃんの形を変更する
const images = Array.from(document.querySelectorAll(`.${imagesClassName}`)
images.forEach((img) => {
  img.style.borderRadius = 'none';
})
```
