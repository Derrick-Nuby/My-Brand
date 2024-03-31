import { IArticle } from "./../types/article";
import { model, Schema } from "mongoose";

const articleSchema: Schema = new Schema(
{
    image: {
        type: String,
    },

    title: {
        type: String,
    },

    author: {
        type: String,
    },

    tags: [String],

    description: {
        type: String,
    },
    comments: [String],

    likes: [String]
}
);

export default model<IArticle>("Artcile", articleSchema);
