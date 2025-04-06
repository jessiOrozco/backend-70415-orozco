import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const ticketsSchema = new mongoose.Schema({

    code: {
        type: String,
        default: uuidv4,
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchase: {
        type: String,
        required: true
    }
});

ticketsSchema.pre("findOne", function (next) {
    this.populate('cartId', 'products');
    next();
})

const TicketModel = mongoose.model("tickets", ticketsSchema);

export default TicketModel;