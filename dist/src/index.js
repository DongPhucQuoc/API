"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var Default_1 = __importDefault(require("../config/Default"));
var Connect_1 = __importDefault(require("./db/Connect"));
var index_Route_1 = __importDefault(require("./routes/index.Route"));
var paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
var cors_1 = __importDefault(require("cors"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_json_1 = __importDefault(require("../swagger.json"));
paypal_rest_sdk_1.default.configure({
    'mode': 'sandbox',
    'client_id': Default_1.default.clientID,
    'client_secret': Default_1.default.secret,
});
var app = (0, express_1.default)();
var port = Default_1.default.port;
var host = Default_1.default.host;
//https://stackoverflow.com/questions/44039069/express-session-secure-cookies-not-working
// app.set('trust proxy', 1);
// app.set('port', (process.env.PORT || port));
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)({
    credentials: true,
    origin: ['http://127.0.0.1:4000', 'http://127.0.0.1:3000'],
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
https: //stackoverflow.com/questions/53813544/nodejs-app-hosted-on-heroku-dont-set-client-side-cookie
 app.use((0, express_session_1.default)({
    secret: Default_1.default.secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000, domain: "127.0.0.1" }
}));
app.get("/", function (req, res) {
    res.send("okay");
});
app.listen(process.env.PORT || port, host, function () {
    console.log("Server is opening at http://%s:%s ", host, port);
    (0, Connect_1.default)();
    (0, index_Route_1.default)(app);
});
