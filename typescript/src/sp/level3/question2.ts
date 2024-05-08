/*
* 標準ライブラリのPartialは、オブジェクトの全てのプロパティを省略可能にするものでした。
* いま、全てではなく一部のプロパティのみ省略可能にしたいです。
* このような機能を持つPartiallyPartial<T, K>を定義してください。
* */

// 以下のコードのコメントアウトを外して修正を行う
{
  // 使用例

  // 元のデータ
  interface Data {
    foo: number
    bar: string
    baz: string
  }
  /*
   * T1は { foo?: number; bar?: string; baz: string } 型
   */
  type PD = Partial<Data> // { [P in keyof T]?: T[P] | undefined; }
  type PartiallyPartial<T,W extends keyof T> =
  	{ [ P in keyof Pick<T,W> ]? : Pick<T,W>[P] } &
	{ [ P in keyof Omit<T,W> ] : Omit<T,W>[P] }
  type T1 = PartiallyPartial<Data, 'foo' | 'bar'>
}
