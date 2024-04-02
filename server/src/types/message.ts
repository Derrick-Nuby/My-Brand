import { Document } from "mongoose"
export interface IMessage extends Document {
    names: string 
    email: string
    subject: string
    phone: string
    message: string
}