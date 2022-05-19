import { firestore } from "fb/admin";
export default async (req, res) => {
  const { id } = req.query;
  firestore
    .collection("notes")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      res.json(data);
    })
    .catch(() => res.status(400).end());
};
