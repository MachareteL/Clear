import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../../lib/firebaseConfig"
import { getFirestore } from "firebase-admin/firestore";

export default function handler(req, res) {
    console.log(req.body);
    const auth = getAuth(app);
    const body = req.body;

    signInWithEmailAndPassword(auth, body.email, body.password)
        .then( async (userCredential) => {
            console.log("entrou no deu certo");
            const db = getFirestore(app);
            const docRef = db.collection('users').doc(userCredential.user.reloadUserInfo.localId);

            await docRef.set({
                uid: userCredential.user.reloadUserInfo.localId,
                email: body.email,
                image: '',
                cpf: body.cpf,
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