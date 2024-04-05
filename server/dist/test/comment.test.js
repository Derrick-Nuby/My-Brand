"use strict";
// import { expect } from 'chai';
// import request from 'supertest';
// import app from '../app.js';
// import Comment from '../models/comment.js';
// describe('Comment API Tests', () => {
//   let commentId;
//   beforeEach(async () => {
//     await Comment.deleteMany({});
//   });
//   describe('Create Comment', () => {
//     it('should create a new comment with valid input', async () => {
//       const commentData = {
//         blogId: 'some_blog_id',
//         content: 'This is a test comment',
//       };
//       const res = await request(app)
//         .post('/api/comment/create')
//         .send(commentData);
//       expect(res.status).to.equal(201);
//       expect(res.body).to.have.property('message').equal('Comment created successfully');
//       expect(res.body).to.have.property('Comment');
//       expect(res.body.Comment).to.have.property('blogId').equal(commentData.blogId);
//       expect(res.body.Comment).to.have.property('content').equal(commentData.content);
//       commentId = res.body.Comment._id;
//     });
//   });
//   describe('Get Single Comment', () => {
//     it('should get a single comment', async () => {
//       const comment = new Comment({
//         blogId: 'some_blog_id',
//         content: 'This is a test comment',
//       });
//       await comment.save();
//       const res = await request(app).get(`/api/comment/${comment._id}`);
//       expect(res.status).to.equal(200);
//       expect(res.body).to.have.property('singleComment');
//       expect(res.body.singleComment).to.have.property('blogId').equal(comment.blogId);
//       expect(res.body.singleComment).to.have.property('content').equal(comment.content);
//     });
//   });
//   describe('Update Comment', () => {
//     it('should update an existing comment', async () => {
//       const updatedContent = 'Updated content';
//       const res = await request(app)
//         .put(`/api/comment/${commentId}`)
//         .send({ content: updatedContent });
//       expect(res.status).to.equal(200);
//       expect(res.body).to.have.property('message').equal('Comment Updated successfully');
//       expect(res.body).to.have.property('updatedComment');
//       expect(res.body.updatedComment).to.have.property('content').equal(updatedContent);
//     });
//   });
//   describe('Delete Comment', () => {
//     it('should delete an existing comment', async () => {
//       const res = await request(app).delete(`/api/comment/${commentId}`);
//       expect(res.status).to.equal(200);
//       expect(res.body).to.have.property('message').equal('Comment deleted successfully');
//     });
//   });
// });
//# sourceMappingURL=comment.test.js.map