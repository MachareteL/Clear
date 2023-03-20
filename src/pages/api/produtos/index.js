import { app } from "@/lib/firebaseConfig";
import { getFirestore } from "firebase-admin/firestore";

export default async function handler(req, res) {
    if (req.headers.secure_key && req.headers.secure_key == "316KMH") {
        const db = getFirestore();
        const docRef = await db.collection('produtos').get()
        docRef.forEach(doc => {
            console.log("oridt");
            console.log(doc);
        });


        res.status(200).json(docRef)

    } else {    
        res.status(401).json({ message: "Unauthorized" })
    }
}