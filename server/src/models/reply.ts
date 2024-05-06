import { IReply } from "../types/reply";
import { model, Schema, Types } from "mongoose";

const replySchema: Schema = new Schema(
{
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
}
);

export default model<IReply>("Reply", replySchema);
