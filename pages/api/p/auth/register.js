import { register } from "../../../../src/services/AuthService";

export default function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      return register(req, res);

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
