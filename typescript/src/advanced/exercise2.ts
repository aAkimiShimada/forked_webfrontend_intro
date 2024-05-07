/*
* 以下の User 型 に companyName: string のプロパティを追加で持つ Admin 型を定義してください
* 余裕があれば User 型と Admin 型を interface で定義した場合もやってみてください
* */

// 以下のコードのコメントアウトを外して修正を行う
{
  type UserType = {
    id: number
    name: string
  }

  type AdminType = UserType & { companyName: string }

  interface UserInterface {
    id: number
    name: string
  }

  interface AdminInterface extends UserInterface {
	companyName: string
  }

  const user1: UserType = {
    id: 1,
    name: 'taro'
  }

  const admin1: AdminType = {
    id: 1,
    name: 'jiro',
    companyName: 'Access'
  }

  const user2: UserInterface = {
    id: 1,
    name: 'taro'
  }

  const admin2: AdminInterface = {
    id: 1,
    name: 'jiro',
    companyName: 'Access'
  }

  console.log(user1);
  console.log(admin1);
  console.log(user2);
  console.log(admin2);
}
