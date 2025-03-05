import mongoose from "mongoose";

mongoose.connect("mongodb+srv://jessiqkaorozcoperez:yVMMaufpIMBWr6n0@backendcoder.rgehm.mongodb.net/Backend2?retryWrites=true&w=majority&appName=backendCoder")
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log("Vamos a morir, tenemos un error:", error));
