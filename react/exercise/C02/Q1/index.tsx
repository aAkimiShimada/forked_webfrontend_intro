// C02/Q1
// * 画面に「Hello, FirstName LastName!」を出力する
//   * （注: FirstName LastName は各自の名前）
// * `createRoot(document.body).render` の引数の一部を式（関数）に置き換える
// * 氏名を格納したオブジェクトを関数の引数に渡す
//
import { createRoot } from "react-dom/client";

interface User {
	firstName: string,
	lastName: string
}


function nameView(user:User) {
	return (
		<h1>Hello, {user.firstName} {user.lastName}!</h1>
	)
}

const myself: User = {
	firstName: "Akimi",
	lastName: "Shimada"
}

createRoot(document.body).render(nameView(myself));
