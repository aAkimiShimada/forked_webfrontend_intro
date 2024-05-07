/*
* 以下のコードは冗長なコードである。 generics を使って `greet` という関数一つにまとめてください。
* `some process` は `message` の型の影響を受けないものとします。
* */

// 以下のコードのコメントアウトを外して修正を行う
{
  function greet<T>(message: T): void {
	console.log(message)
  }

  greet('hello')
  greet(1)
}
