import { getFirestore } from "firebase-admin/firestore";

export default async function handler(req, res) {
    const { body } = req;
    const db = getFirestore();
    const docRef = db.collection('produtos').doc(body.nome);
    await docRef.set(body)
    res.status(200).json({ message: 'Deu certo!' })
}