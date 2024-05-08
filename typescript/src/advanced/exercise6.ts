/*
* 以下の コードが実行できるように修正してください
* func() 関数は引数を optional で受け取れるものとする
* */

// 以下のコードのコメントアウトを外して修正を行う
{
  const func = (num?: number): number => {
	  return !num ? 0 : num
  }
  console.log(func()) // 0
  console.log(func(10)) // 10
}
