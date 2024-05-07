
/*
* 以下のコードに長方形(rectangle) を追加し、 `getArea` 関数に面積を求める処理を加えてください。
* */

// 以下のコードのコメントアウトを外して修正を行う
{
  type Square = {
    type: 'square'
    length: number
  }

  interface Rectangle {
	type: "rectangle"
	sides: [ number, number ]
  }

  type Shape = Square | Rectangle

  function getArea(s: Shape) {
    switch (s.type) {
      case 'square':
        return s.length * s.length
	  case 'rectangle':
		return s.sides[0] * s.sides[1]
    }
  }

  const square: Square = {
    type: 'square',
    length: 2
  }

  const rectangle: Rectangle = {
	type: 'rectangle',
	sides: [ 6, 8 ]
  }

  console.log(getArea(square))
  console.log(getArea(rectangle))
}
