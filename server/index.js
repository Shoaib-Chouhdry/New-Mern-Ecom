import express from "express";
const app =express();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import AuthRouter from "./routes/authRoute/AuthRoutes.js"
import AdminProductRoute from "./routes/adminRoute/ProductRoute.js"
import ShopProductRoute from "./routes/shopRoute/ShopProductRoute.js"
import ShopCardRoute from "./routes/shopRoute//ShopCardRoute.js"
import OrderRoute from "./routes/shopRoute//OrderRoute.js"
import path from "path"
import dotenv from "dotenv";
dotenv.config();


const _dirname = path.resolve();



app.use(express.json());  // server indexjs
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods:["GET","POST","DELETE","PUT"],
    allowedHeaders:[
     "Content-Type",
    'Authorization',
    'Cache-Control',
    'Expires',
    'Pragma'
 ],
credentials : true 
}))


const PORT = process.env.PORT || 5000; 


mongoose.connect(process.env.MONGO_DB)
.then(()=>console.log("Mongodb Connected")).catch(()=>console.log("connection failed"))





app.use("/api/auth",AuthRouter)
app.use("/api/admin/product",AdminProductRoute)
app.use("/api/shop/product",ShopProductRoute)
app.use("/api/shop/card",ShopCardRoute)
app.use("/api/card",OrderRoute)


app.use(express.static(path.join(_dirname,'/frontend/dist')))
app.get('*',(_,res) => {
    res.sendFile(path.resolve(_dirname,'frontend','dist','index.html'));
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
