const express = require("express");
const path = require("path");
const dbConnect = require("./database/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const mongoSanitize = require("express-mongo-sanitize");


const app = express();

const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
};

dbConnect();
const corsPolicy = {
  origin: process.env.FRONTEND_URL || "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "x-csrf-token",
  ],
};

app.use(cors(corsPolicy));
app.use(mongoSanitize());

// app.use(
//   helmet({
//       contentSecurityPolicy: {
//           directives: {
//               defaultSrc: ["'self'"],
//               scriptSrc: ["'self'"],
//               styleSrc: ["'self'", "'unsafe-inline'"],
//               imgSrc: ["'self'", "*", "data:"], // Allow images from all sources
//               connectSrc: ["'self'"],
//               fontSrc: ["'self'", "*"],
//               objectSrc: ["'none'"],
//               upgradeInsecureRequests: [],
//           },
//       },
//   })
// );

app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ limit: "40mb", extended: true }));

//cloudnary config
cloudinary.config({
  // eslint-disable-next-line no-undef
  cloud_name: process.env.CLOUD_NAME,
  // eslint-disable-next-line no-undef
  api_key: process.env.API_KEY,
  // eslint-disable-next-line no-undef
  api_secret: process.env.API_SECRET,
});

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("BusinessOne API Has been started");
  console.log("BusinessOne API Has been started");
});

app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/domain", require("./routes/workDomainRoute"));
app.use("/api/company", require("./routes/companyRoute"));
app.use("/api/user", require("./routes/userroute"));
app.use("/api/blogs", require("./routes/BlogsRoute"));
app.use("/api/editor", require("./routes/editorRoute"));
app.use("/api/claim", require("./routes/ClaimedCompanyRoute"));
app.use("/api/contact", require("./routes/contactRoute"));
app.use("/api/faq", require("./routes/faqRoute"));

app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found on this server.",
  });
});

// https.createServer(options, app).listen(PORT, () => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = dbConnect;
