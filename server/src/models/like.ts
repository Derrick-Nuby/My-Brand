import { ILike } from "./../types/like";
import { model, Schema, Types } from "mongoose";

const likeSchema: Schema = new Schema(
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

    liked: {
        type: Boolean,
    },
}
);

export default model<ILike>("Like", likeSchema);
