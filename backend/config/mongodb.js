const mongoose = require("mongoose");
const { mongoConnection } = require("../.env");
mongoose
  .connect(mongoConnection, {
    useNewUrlParser: true,
  })
  .catch((err) => {
    const msg = "ERRO! Não foi possível se conectar ao mongoDB";
    console.log("\x1b[41m%s\x1b[37m", msg, "\x1b[0m");
  });
