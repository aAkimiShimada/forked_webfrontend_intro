/*
* 以下のコードで定義されるgetSpeedは、'slow', 'medium', 'fast'のいずれかの文字列を受け取って数値を返す関数です。
* この関数に他の文字列を渡すのは型エラーとしたいです。
* この条件を満たすように型Speedを定義してください。
* */

// 以下のコードのコメントアウトを外して修正を行う
{
  type Speed = "slow" | "medium" | "fast" /* ここを入力 */

  function getSpeed(speed: Speed): number {
    switch (speed) {
      case 'slow':
        return 10
      case 'medium':
        return 50
      case 'fast':
        return 200
    }
  }

  // 使用例
  const slowSpeed = getSpeed('slow')
  const mediumSpeed = getSpeed('medium')
  const fastSpeed = getSpeed('fast')
  console.log(slowSpeed)
  console.log(mediumSpeed)
  console.log(fastSpeed)

//   // エラー例
//   getSpeed('veryfast')
}
