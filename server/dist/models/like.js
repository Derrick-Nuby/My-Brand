import { model, Schema, Types } from "mongoose";
const likeSchema = new Schema({
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
});
export default model("Like", likeSchema);
//# sourceMappingURL=like.js.map