import { Document } from "mongoose"
export interface ILike extends Document {
    authorId: string
    authorName: string
    blogId: string
    liked: boolean
}