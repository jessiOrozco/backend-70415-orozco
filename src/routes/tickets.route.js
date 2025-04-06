import express from "express";
import passport from "passport"
const router = express.Router();

import TicketController from "../controllers/tickets.controller.js";

const ticketController = new TicketController();
// creacion del ticket
router.post("/", passport.authenticate("jwt", {session: false}), ticketController.generateTicket)