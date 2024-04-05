import { Response, Request } from "express"
import { IMessage } from "../types/message.js"
import Message from "../models/message.js"
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const getAllMessages = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const messages: IMessage[] = await Message.find();
        

        if(messages.length === 0 ) {
            res.status(404).json({ message: "There are no currently no messages to view! Thank you for the visit :) "})
        }

        res.status(200).json({ messages })
    } catch (error) {
    throw error
    }
}

const createMessage = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as Pick<IMessage, "names" | "email" | "subject" | "phone" | "message" >


        const message: IMessage = new Message({
            names: body.names,
            email: body.email,
            subject: body.subject,
            phone: body.phone,
            message: body.message,
        })

        const newMessage: IMessage = await message.save()

// nodemailer section

        const transporter = nodemailer.createTransport({
            host: process.env.mailHost,
            port: 465,
            secure: true,
            auth: {
                user: process.env.adminEmail,
                pass: process.env.adminPass
            }
        });

        const mailOptions = {
            from: body.email,
            to: process.env.adminEmail,
            subject: body.subject,
            text: `Phone Number: ${body.phone}\nMessage: ${body.message}`,
            replyTo: body.email
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: "Error sending email" });
            }
        });



        res
        .status(201)
        .json({ message: "Message created successfully", Message: newMessage})

    } catch (error) {
    throw error
    }
}

const getSingleMessage = async (req: Request, res: Response): Promise<any> => {
    try {

        const MessageId = req.params.id;
        const singleMessage: IMessage | null = await Message.findOne( { _id: MessageId });

        if(!singleMessage) {
            res.status(404).json({ message: "That Message doesn't exist on our database"})
        }

        res.status(200).json({ singleMessage })

    } catch (error) {
    throw error
    }
}

const deleteMessage = async (req: Request, res: Response): Promise<any> => {
    try {

        const MessageId = req.params.id;

        const deletedMessage: IMessage | null = await Message.findOneAndDelete( { _id: MessageId });

        if (!deletedMessage) {
            res.status(404).json({ message: "That Message doesn't exist in our database" });
            return;
        }

        res.status(200).json({ message: "Message deleted successfully", deletedMessage })

    } catch (error) {
    throw error
    }
}

export { getAllMessages, createMessage, getSingleMessage, deleteMessage }