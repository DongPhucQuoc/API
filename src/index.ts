import express from "express";
import session from "express-session";
import config from "../config/Default";
import ConnectDB from "./db/Connect";
import InitialRoute from "./routes/index.Route";
import paypal from "paypal-rest-sdk";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': config.clientID,
  'client_secret': config.secret,
});

const app = express();

const port = config.port;
const host = config.host;
//https://stackoverflow.com/questions/44039069/express-session-secure-cookies-not-working
// app.set('trust proxy', 1);

// app.set('port', (process.env.PORT || port));
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.static("public"));
app.use(cors({
  credentials: true,
  origin: ['http://127.0.0.1:4000', 'http://127.0.0.1:3000'],
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

https://stackoverflow.com/questions/53813544/nodejs-app-hosted-on-heroku-dont-set-client-side-cookie
app.use(session({
  secret: config.secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000, domain: "127.0.0.1" }
}));


app.get("/", (req, res) => {
  res.send("okay")
})

app.listen((process.env.PORT as any) || port, host, () => {
  console.log("Server is opening at http://%s:%s ", host, port);

  ConnectDB();

  InitialRoute(app);
});