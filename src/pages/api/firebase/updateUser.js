import { getAuth, updateProfile } from "firebase/auth";

export default async function handler(req, res) {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
        console.log("Deu certo");
    }).catch((error) => {
        console.log("Deu errado", error);
    });
    res.send("Ok")
}