import { firestore } from "fb/admin";
export default async (req, res) => {
  const { id } = req.query;
  firestore
    .collection("notes")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;

      res.json({
        id,
        ...data,
        createdAt: +createdAt.toDate(),
      });
    })
    .catch(() => res.status(400).end());
};
