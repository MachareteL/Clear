import { app } from "@/lib/firebaseConfig"
import { getFirestore, collection, getDocs } from "firebase/firestore"

export default async function handler(req, res) {
    const db = getFirestore(app)
    const querySnapshot = await getDocs(collection(db, "produtos"));
    const listProdutos = []
    querySnapshot.forEach((doc) => {
        listProdutos.push(doc.data())
    });
    res.status(200).json(listProdutos)
}