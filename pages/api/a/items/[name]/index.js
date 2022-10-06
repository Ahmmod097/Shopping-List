import { deleteItem } from "../../../../../src/services/ItemServices";

export default function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "DELETE":
      return deleteItem(req, res);

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
