import { Document } from "mongoose"
export interface IArticle extends Document {
    authorId: string
    authorName: string
    blogId: string
    content: string
    timestamp: string
}