import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/lib/firebaseConfig";

export default async function handler(req, res) {
    const { body } = req;
    try{
        const db = getFirestore(app)
        await setDoc(doc(db, 'produtos', body.nome), body)
        res.status(200).json({ message: 'Produto criado com Sucesso!', ok: true })
    }catch(err){
        res.status(500).json({ message: 'Erro ao criar produto!' })
    }
}