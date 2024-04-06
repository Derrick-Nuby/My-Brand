import { model, Schema } from "mongoose";
const messageSchema = new Schema({
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
});
export default model("Message", messageSchema);
//# sourceMappingURL=message.js.map