import { collection, query, where,getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export default async function handler(req, res, next) {
    // Create a reference to the cities collection
    const citiesRef = collection(db, "pedidos");

    // Create a query against the collection.
    const q = query(citiesRef, where("email", "==", "lucas@gmail.com"));

    const querySnapshot = await getDocs(q);
    const pedidos = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        pedidos.push({ID: doc.id, DATA: doc.data()})
    });
    res.send(pedidos)
}