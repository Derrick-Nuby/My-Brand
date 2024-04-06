import { IArticle } from "./../types/article";
import { model, Schema, Types } from "mongoose";

const articleSchema: Schema = new Schema(
{
    image: {
        type: String,
    },

    title: {
        type: String,
    },

    authorId: {
        type: Types.ObjectId,
        ref: 'User',
    },

    author: {
        type: String,
    },

    tags: {
        type: String,
    },

    description: {
        type: String,
    },
}
);

export default model<IArticle>("Artcile", articleSchema);
