import { model, Schema, Types } from "mongoose";
const replySchema = new Schema({
    authorId: {
        type: Types.ObjectId,
        ref: 'User',
    },
    authorName: {
        type: String,
    },
    blogId: {
        type: Types.ObjectId,
        ref: 'Article',
    },
    parentId: {
        type: Types.ObjectId,
        ref: 'Article',
    },
    content: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
export default model("Reply", replySchema);
//# sourceMappingURL=reply.js.map