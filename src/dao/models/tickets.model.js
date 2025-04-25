import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const ticketsSchema = new mongoose.Schema({

    code: {
        type: String,
        default: uuidv4,
    },
    cart: {
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
    this.populate({
        path: 'cart',
        populate: {
            path: 'products.product',
            select: 'title price'
        }
        });
    next();
})

const TicketModel = mongoose.model("tickets", ticketsSchema);

export default TicketModel;