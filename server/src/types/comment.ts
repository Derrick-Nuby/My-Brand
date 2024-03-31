import { Document } from "mongoose"
export interface IComment extends Document {
    authorId: string
    authorName: string
    blogId: string
    content: string
    timestamp: string
}