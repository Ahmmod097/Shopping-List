import { deleteItem } from "../../../../../src/services/ItemServices";
import { auth } from "../../../../../src/middleware/auth";

export default function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "DELETE":
      auth(req, res, deleteItem);
      return deleteItem(req, res);

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
