import { Document } from "mongoose"
export interface ILike extends Document {
    authorId: string
    authorName: string
    itemId: string
    liked: boolean
}