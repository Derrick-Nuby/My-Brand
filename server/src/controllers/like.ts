import { Response, Request } from "express"
import { ILike } from "../types/like"
import Like from "../models/like"


const getAllLikes = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const likes: ILike[] = await Like.find();
        

        if(likes.length === 0 ) {
            res.status(404).json({ message: "There are currently no likes to view :) "})
        }

        res.status(200).json({ likes })
    } catch (error) {
    throw error
    }
}

const createLike = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as Pick<ILike, "blogId" | "liked">

        const userId = req.userId;
        const lUsername = req.lUsername;

        const like: ILike = new Like({
            authorId: userId,
            authorName: lUsername,
            blogId: body.blogId,
            content: body.liked,
        })

        const newLike: ILike = await like.save()
  
      res
        .status(201)
        .json({ message: "Like created successfully", Like: newLike})

    } catch (error) {
    throw error
    }
}

const updateLike = async (req: Request, res: Response): Promise<any> => {
    try {

        const likeId = req.params.id;
        const updateFields = req.body;

        const updatedLike: ILike | null = await Like.findOneAndUpdate( { _id: likeId }, updateFields, { new: true });

        if (!updatedLike) {
            res.status(404).json({ message: "That Like doesn't exist in our database" });
            return;
        }

        res.status(200).json({ message: "Like Updated successfully", updatedLike })

    } catch (error) {
    throw error
    }
}

const deleteLike = async (req: Request, res: Response): Promise<any> => {
    try {

        const likeID = req.params.id;

        const deletedLike: ILike | null = await Like.findOneAndDelete( { _id: likeID });

        if (!deletedLike) {
            res.status(404).json({ message: "That like doesn't exist in our database" });
            return;
        }

        res.status(200).json({ message: "Like deleted successfully", deletedLike })

    } catch (error) {
    throw error
    }
}

export { getAllLikes, createLike, updateLike, deleteLike }