import { Document } from "mongoose"
export interface IReply extends Document {
    authorId: string
    authorName: string
    blogId: string
    parentId: string
    content: string
    timestamp: string
}