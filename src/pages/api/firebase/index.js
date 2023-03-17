import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../../lib/firebaseConfig"
import { getFirestore } from "firebase-admin/firestore";

export default function handler(req, res) {
    console.log(req.body);
    const auth = getAuth(app);
    const email = req.body.email;
    const password = req.body.password;
    const cpf = req.body.cpf;
    signInWithEmailAndPassword(auth, email, password)
        .then( async (userCredential) => {
            console.log("entrou no deu certo");
            const db = getFirestore();
            const docRef = db.collection('users').doc();

            await docRef.set({
                uid: userCredential.user.reloadUserInfo.localId,
                email: email,
                image: '',
                cpf: cpf
            });
            const user = userCredential.user;
            res.status(200).json({ user });
        })
        .catch((error) => {
            console.log("entrou no deu errado");
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(typeof (errorMessage));
            res.status(404).json({ teste: 'ta dando erro' });
        });

}