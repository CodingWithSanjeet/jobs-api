require("dotenv").config();
const express = require("express");
const globalErrHandler = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const authenticateUser = require("./middlewares/authentication");
const connectToDB = require("./db/connect");
const authRouter = require("./routes/authRoute");
const jobsRouter = require("./routes/jobsRoute");
const app = express();
const PORT = process.env.PORT || 5000;

// Swagger Docs
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml');


// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const { xss } = require("express-xss-sanitizer");
const rateLimiter = require("express-rate-limit");

app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

// middlewares
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 request per windowMs
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());


app.get('/',(req, res) =>{
  res.send(`<h1>Jobs API</h1><a href="/api-docs">Documentation</a>`)
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(globalErrHandler);

const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server started at port: ${PORT}...`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
