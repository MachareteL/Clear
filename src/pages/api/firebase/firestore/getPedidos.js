import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { getAuth } from "firebase/auth";

export default async function handler(req, res, next) {
    const citiesRef = collection(db, "pedidos");
    const { uid } = getAuth().currentUser
    // Create a query against the collection.
    const q = query(citiesRef, where("user", "==", uid));

    const querySnapshot = await getDocs(q);
    const pedidos = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        pedidos.push({ ID: doc.id, DATA: doc.data() })
    });
    res.send(pedidos)
}