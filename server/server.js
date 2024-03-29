require("dotenv").config();
const userRouter = require("./routes/userRoute");
const articleRouter = require("./routes/taskRoute");
const cors = require("cors");
const express = require("express");
const next = require("next");
const session = require("express-session");
const fileupload = require("express-fileupload");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());
    server.use(express.json());
    server.use(
      express.urlencoded({
        extended: true,
      })
    );
    server.use(fileupload());
    server.use(express.static("files"));
    server.use(
      session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        // cookie: { secure: true },
      })
    );

    server.use("/User", userRouter);
    server.use("/Task", articleRouter);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log(`server ready on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
