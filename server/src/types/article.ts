import { Document } from "mongoose"
export interface IArticle extends Document {
    image: string 
    title: string
    author: string
    tags: string
    description: string
    comments: string
    likes: string
}