import { auth } from "../../../../src/middleware/auth";
import { getUser } from "../../../../src/services/AuthService";

export default function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      auth(req, res, getUser);
      return getUser(req, res);

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
