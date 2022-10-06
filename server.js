const express = require("express");
const mongoose = require("mongoose");
const frameguard = require("frameguard");
const cors = require("cors");
const next = require("next");
const config = require("config");
const db = config.get("mongoURI");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    mongoose
      .connect(db)
      .then(() => console.log("MongoDb connected ..."))
      .catch((err) => console.log(err));

    server.use(frameguard({ action: "sameorigin" }));
    server.use(express.json());

    server.use(
      cors({
        origin: "*",
      })
    );

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })

  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
