const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const port = 3000;

const ToughtsController = require("./controllers/ToughtsController");
const toughtsRoutes = require("./routes/toughtsRoutes");
const conn = require("./db/conn");
const app = express();

//MODELS
const Tought = require("./models/Tought");
const User = require("./models/User");

//config template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// config midlewares
// public path
app.use(express.static("public"));

// json request body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// session middleware
app.use(
  session({
    name: "session",
    secret: "nosso_session_secret_123454312",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"), //definir a pasta sessions como diretorios das session
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

// flash messages
app.use(flash());

// set sessions
app.use((req, res, next) => {
  if (req.session.userid) {
    //reutilizar a sessão da requisição na respota
    res.locals.session = req.session;
  }
  next();
});

//Routes
app.get("/", ToughtsController.showToughts); //rota padrão
app.use("/toughts", toughtsRoutes);

conn
  .sync()
  .then(() => app.listen(port))
  .catch((err) => console.error(err));
