import Like from "../models/like.js";
const getAllLikes = async (req, res) => {
    try {
        const likes = await Like.find();
        if (likes.length === 0) {
            res.status(404).json({ message: "There are currently no likes to view :) " });
        }
        res.status(200).json({ likes });
    }
    catch (error) {
        throw error;
    }
};
const createLike = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.userId;
        const lUsername = req.lUsername;
        const like = new Like({
            authorId: userId,
            authorName: lUsername,
            itemId: body.itemId,
            liked: body.liked,
        });
        const newLike = await like.save();
        res
            .status(201)
            .json({ message: "Like created successfully", Like: newLike });
    }
    catch (error) {
        throw error;
    }
};
const updateLike = async (req, res) => {
    try {
        const likeId = req.params.id;
        const updateFields = req.body;
        const updatedLike = await Like.findOneAndUpdate({ _id: likeId }, updateFields, { new: true });
        if (!updatedLike) {
            res.status(404).json({ message: "That Like doesn't exist in our database" });
            return;
        }
        res.status(200).json({ message: "Like Updated successfully", updatedLike });
    }
    catch (error) {
        throw error;
    }
};
const likeCounter = async (req, res) => {
    try {
        const itemId = req.params.id;
        const likeCount = await Like.countDocuments({ itemId, liked: true });
        res.status(200).json({ likeCount });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while counting likes' });
    }
};
const deleteLike = async (req, res) => {
    try {
        const itemId = req.params.id;
        const authorId = req.userId;
        const deletedLike = await Like.findOneAndDelete({ itemId, authorId });
        if (!deletedLike) {
            res.status(404).json({ message: "That like doesn't exist in our database" });
            return;
        }
        res.status(200).json({ message: "Like deleted successfully", deletedLike });
    }
    catch (error) {
        throw error;
    }
};
export { getAllLikes, createLike, updateLike, deleteLike, likeCounter };
//# sourceMappingURL=like.js.map