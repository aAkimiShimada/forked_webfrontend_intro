/*
* 以下のコードを `Nullish Coalescing` で書き直してください
* `Nullish Coalescing` を使わない場合と結果を比べてみて下さい
* */

// 以下のコードのコメントアウトを外して修正を行う
{
  const prices:(number|string|boolean|null|undefined)[] = [1,0,-0,"",false,NaN,null,undefined]

  prices.forEach(price => {
	const result1 = price || "no price"
	const result2 = price && "no price"
	const result3 = price ?? "no price"
	console.log(`${price} || ... => ${result1}`)
	console.log(`${price} && ... => ${result2}`)
	console.log(`${price} ?? ... => ${result3}`)
  })
}
