import { createItem } from "../../../../src/services/ItemServices";

export default function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      return createItem(req,res);

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
