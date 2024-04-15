import { model, Schema, Types } from "mongoose";
const articleSchema = new Schema({
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
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
export default model("Artcile", articleSchema);
//# sourceMappingURL=article.js.map