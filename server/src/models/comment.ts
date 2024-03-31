import { IComment } from "./../types/comment";
import { model, Schema } from "mongoose";

const commentSchema: Schema = new Schema(
{
    authorId: {
        type: String,
    },

    authorName: {
        type: String,
    },

    blogId: {
        type: String,
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
