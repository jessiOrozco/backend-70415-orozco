import express from "express";
import exphbs from "express-handlebars";
import "./database.js";
import initializePassport from "./config/passport.config.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import ticketRouter from "./routes/tickets.route.js";
import passport from "passport";
import cookieParser from "cookie-parser";

const app = express();
const PUERTO = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cookieParser()); 
app.use(passport.initialize());
initializePassport(); 


// Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/ticket", ticketRouter)
app.use("/", viewsRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
