import { ILike } from "./../types/like";
import { model, Schema } from "mongoose";

const likeSchema: Schema = new Schema(
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

    liked: {
        type: Boolean,
    },
}
);

export default model<ILike>("Like", likeSchema);
