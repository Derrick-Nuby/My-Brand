import { IComment } from "../types/comment";
import { model, Schema, Types } from "mongoose";

const commentSchema: Schema = new Schema(
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

    content: {
        type: String,
    },

    timestamp: {
        type: Date,
        default: Date.now,
    },
}
);

export default model<IComment>("Comment", commentSchema);
