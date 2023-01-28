import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import  connectDB  from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true}));

app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/post', postRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
    });
const PORT = 5000;
const startServer = async () => {
    try{
        connectDB(process.env.MONGO_URI);
        app.listen(PORT , () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();
