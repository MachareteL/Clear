import { db } from "@/lib/firebaseConfig";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
    const { body } = req;
    const listaProdutos = JSON.parse(body)
    const user = getAuth().currentUser
    const docRef = await addDoc(collection(db, 'pedidos'), {
        listaProdutos: listaProdutos.lista,
        criacao: serverTimestamp(),
        user: user.uid,
        email: user.email,
        
    })
    res.send({docRef})
}