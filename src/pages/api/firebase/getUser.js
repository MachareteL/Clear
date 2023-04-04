import { getAuth } from "firebase/auth";

export default async function handler(req, res){
    const user = getAuth().currentUser
    res.status(200).json({ user })
}