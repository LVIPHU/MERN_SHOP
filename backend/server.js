const dotenv = require("dotenv");
const colors = require("colors");
const config = require("./config/index")
dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || config.port;
const MODE = process.env.NODE_ENV || config.env;

app.listen(PORT || config.port, console.log(`Server running in ${MODE} mode on port ${PORT}`));
