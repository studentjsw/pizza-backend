const express = require("express");

const dotenv = require("dotenv");

const mongoose = require("mongoose");

const cors = require("cors");

const orderRouter = require("./routes/orderRoutes.js");
const pizzaRouter =require( "./routes/pizzasRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Server Working 👍🎊🎊");
});
app.use('/api/pizzas', pizzaRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected To DataBase");
  })
  .catch(() => {
    console.log("Error While Connecting the database");
  });


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server Running Successfully on PORT ${PORT}`));