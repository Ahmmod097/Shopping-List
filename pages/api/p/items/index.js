import { getItem } from "../../../../src/services/ItemServices";

export default function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return getItem(req, res);

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
