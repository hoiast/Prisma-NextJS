require("dotenv").config();
const cors = require('cors')
import express from "express";
import routes from "./routes";

const app = express();
app.use(
    express.json(),
    cors()
);
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => `Server running on port ${PORT}`);

// Database connection
// Routes
// Setup server
