/*
* 以下のコードを const を使った記述に修正してください。
* Array.prototype.reduce(): https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
* */

// 以下のコードのコメントアウトを外して修正を行う
{
  const list: { price: number }[] = [
    {
      price: 100
    },
    {
      price: 250
    },
    {
      price: 500
    },
  ];

  const total: number = list.reduce((sum,item) => sum + item.price ,0);
}
