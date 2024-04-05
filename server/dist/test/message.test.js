"use strict";
// import { expect } from 'chai';
// import request from 'supertest';
// import app from '../app.js';
// import Message from '../models/message.js';
// describe('Message API Tests', () => {
//   let messageId;
//   beforeEach(async () => {
//     await Message.deleteMany({});
//   });
//   describe('Create Message', () => {
//     it('should create a new message with valid input', async () => {
//       const messageData = {
//         names: 'John Doe',
//         email: 'johndoe@example.com',
//         subject: 'Test Subject',
//         phone: '1234567890',
//         message: 'This is a test message',
//       };
//       const res = await request(app)
//         .post('/api/message/create')
//         .send(messageData);
//       expect(res.status).to.equal(201);
//       expect(res.body).to.have.property('message').equal('Message created successfully');
//       expect(res.body).to.have.property('Message');
//       expect(res.body.Message).to.have.property('names').equal(messageData.names);
//       expect(res.body.Message).to.have.property('email').equal(messageData.email);
//       messageId = res.body.Message._id;
//     });
//   });
//   describe('Get Single Message', () => {
//     it('should get a single message by ID', async () => {
//       const res = await request(app).get(`/api/message/${messageId}`);
//       expect(res.status).to.equal(200);
//       expect(res.body).to.have.property('singleMessage');
//       expect(res.body.singleMessage).to.have.property('_id').equal(messageId);
//     });
//   });
//   describe('Delete Message', () => {
//     it('should delete an existing message', async () => {
//       const res = await request(app).delete(`/api/message/${messageId}`);
//       expect(res.status).to.equal(200);
//       expect(res.body).to.have.property('message').equal('Message deleted successfully');
//     });
//   });
// });
//# sourceMappingURL=message.test.js.map