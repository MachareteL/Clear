import { db } from "@/lib/firebaseConfig";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
    const { body } = req;
    const corpo = JSON.parse(body)
    console.log(corpo.subtotal);
    const user = getAuth().currentUser
    const docRef = await addDoc(collection(db, 'pedidos'), {
        listaProdutos: corpo.lista,
        criacao: serverTimestamp(),
        user: user.uid,
        email: user.email,
        subtotal: corpo.subtotal,
    })
    res.send({docRef})
}