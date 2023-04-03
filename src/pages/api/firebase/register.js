import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from "../../../lib/firebaseConfig"

export default function handler(req, res) {
    const auth = getAuth(app);
    const body = req.body;
    console.log(body);
    createUserWithEmailAndPassword(auth, body.email, body.password)
        .then((userCredential) => {
            console.log("entrou no deu certo");
            const user = userCredential.user;
            sendEmailVerification(user)
            .then(resultConfirmEmail => {
                console.log(resultConfirmEmail);
                res.status(200).json({ user })
            }).catch(error => console.log(error));

        })
        .catch((error) => {
            console.log("entrou no deu errado");
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            res.status(401).json({ error })

        });

}