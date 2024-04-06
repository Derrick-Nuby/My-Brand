import { Document } from "mongoose"
export interface IArticle extends Document {
    image: string 
    title: string
    authorId: string
    author: string
    tags: string
    description: string
}