const express = require("express");
const productsRouters = require("./routes/productsRouters");
const shopsRoutes=require("./routes/shopsRoutes")
// const db = require("./db/models");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors())
app.use(express.json());

app.use("/shops", shopsRoutes);
app.use("/products", productsRouters);

// app.use("/media",express.static(__dirname + "media"))
app.use("/media", express.static(path.join(__dirname, "media")));

//not found middleware.
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
});

app.use((err,req,res,next)=>{
 res.status(err.status ?? 500).json(err.message ?? "Internal sever error")
})

// db.sequelize.sync();
// db.sequelize.sync();

app.listen(8080);