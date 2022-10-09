import { createItem } from "../../../../src/services/ItemServices";
import { auth } from "../../../../src/middleware/auth";

export default function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      auth(req, res, createItem);
      return createItem(req, res);

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
