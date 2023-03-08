import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Ekballo");
  console.log(req.body)
    res.status(200).json({"Teste":"Teste"})
//   switch (req.method) {

//     case "GET":
//       try{
//         const allPosts = await db.collection("").find({}).toArray();
//         res.json({ status: 200, data: allPosts });
//       }
//       catch(error){
//         res.json({status: 200, data: error})
//       }
//       break;

//     case "POST":
//       try {
//         await db.collection("").insertOne(req.body)
//         res.status(200).json({ result: "Matricula realizada com sucesso!" });
//       } catch (err) {
//         console.log(err);
//         res.status(401).json({ error: err });
//       }
//       break;
//   }
}