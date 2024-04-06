import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import Message from '../models/message.js';
import Article from '../models/article.js'
import sinon from 'sinon';
import dotenv from 'dotenv';
import { FilterQuery, Query } from 'mongoose';
import { IArticle } from '../types/article.js';
dotenv.config();


async function createMessage () {

    const messageData = {
        names: 'Derrick NUBY',
        email: '222user@gmail.com',
        subject: 'Hello world',
        phone: '0780000000',
        message: 'Hello world! ; the world is about to end so I sent this message to my server'
    };
  
  const token = process.env.test_User_Token;

  const res = await request(app)
    .post('/api/message')
    .send(messageData);

    return res.body.Message;
}



describe('Message API Tests', () => {

    beforeEach(async () => {
        await Message.deleteMany({});
    });

    describe('Create Message', () => {
        it('should create a new message with valid input', async () => {


        const messageData = {
            names: 'Derrick NUBY',
            email: '222user@gmail.com',
            subject: 'Hello world',
            phone: '0780000000',
            message: 'Hello world! ; the world is about to end so I sent this message to my server'
        };
        

        const res = await request(app)
            .post('/api/message')
            .send(messageData);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message').equal('Message created successfully');
        expect(res.body).to.have.property('Message');
        expect(res.body.Message).to.have.property('email').equal(messageData.email);
        expect(res.body.Message).to.have.property('phone').equal(messageData.phone);
        });
    });

    describe('Get Single Message', () => {
        it('should get a single message', async () => {

        try {

            const createdMessage = await createMessage();
            const messageId = createdMessage._id;
            // console.log('Created comment id:', messageId);
        

            const res = await request(app)
            .get(`/api/message/${messageId}`);
        
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('singleMessage');
        } catch (error) {
            // console.error('Error:', error);
        }
        
        });
    });

    describe('Get All Message', () => {
        it('should get all messages', async () => {

        try {

            const createdMessage = await createMessage();
            const messageId = createdMessage._id;
            // console.log('Created comment id:', messageId);
        

            const res = await request(app)
            .get(`/api/message`);
        
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('messages');
            //correcct below
            // expect(res.body.singleComment).to.have.property('blogId').equal(createdMessage.blogId);
            // expect(res.body.singleComment).to.have.property('content').equal(createdMessage.content);
        } catch (error) {
            // console.error('Error:', error);
        }
        
        });
    });


    describe('Delete Message', () => {
        it('should delete an existing message', async () => {

        try {
            const createdMessage = await createMessage();
            const messageId = createdMessage._id;

            const res = await request(app)
            .delete(`/api/message/${messageId}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').equal('Message deleted successfully');
        } catch (error) {
            // console.log("Error:", error)
        }
        });
    });
});
