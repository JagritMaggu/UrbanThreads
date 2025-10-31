
require('dotenv').config()
const express = require('express')

const app = express();
const cors = require('cors')
const http = require('http')
const cookieParser = require("cookie-parser");
const server = http.createServer(app);
const port = process.env.PORT
const userRoutes = require("./routes/UserRoute.js")
const productRoutes = require("./routes/ProductCart.js")
const cartRoutes = require("./routes/Cart.js")
const orderRoutes = require("./routes/Orders.js")
const wishlistRoutes = require("./routes/Wishlist.js")
const mongoose = require("mongoose")

app.set('trust proxy', 1)
server.listen(port,()=>console.log(`server is running at port:${port}`))
const allowedOrigins = [
  "http://localhost:5173",

];
app.use(cors({
    origin: allowedOrigins,
    credentials:true,
}));
app.use(express.json())

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoutes)
app.use("/api", productRoutes)
app.use("/api", cartRoutes)
app.use("/api", orderRoutes)
app.use("/api", wishlistRoutes)

mongoose.connect(process.env.MONGO_URI);