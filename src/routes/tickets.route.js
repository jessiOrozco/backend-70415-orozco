import express from "express";
import passport from "passport"
const router = express.Router();

import TicketController from "../controllers/tickets.controller.js";

const ticketController = new TicketController();
// creacion del ticket
router.post("/:cid/user/:user", passport.authenticate("current", {session: false}), ticketController.generateTicket)
router.get("/:idTicket", passport.authenticate("current", {session: false}), ticketController.getTicket)
router.post("/", (req, res) => {res.json({text: "Hola estoy vivo"})})
export default router;