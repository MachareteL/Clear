import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../../lib/firebaseConfig"

export default function handler(req, res) {
    const auth = getAuth(app);
    const email = 'gustavo@gmail.com';
    const password = '654321';
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("entrou no deu certo");
            const user = userCredential.user;
            res.status(200).json( {user} );
        })
        .catch((error) => {
            console.log("entrou no deu errado");
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(typeof(errorMessage));
            res.status(404).json({ teste: 'ta dando erro' });
        });

}