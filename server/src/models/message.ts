import { IMessage } from "../types/message";
import { model, Schema } from "mongoose";

const messageSchema: Schema = new Schema(
{
    names: {
        type: String,
    },

    email: {
        type: String,
    },

    subject: {
        type: String,
    },

    phone: {
        type: String,
    },

    message: {
        type: String,
    },

    timestamp: {
        type: Date,
        default: Date.now,
    },
}
);

export default model<IMessage>("Message", messageSchema);
