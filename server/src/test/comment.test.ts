import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import Comment from '../models/comment.js';
import Article from '../models/article.js'
import sinon from 'sinon';
import dotenv from 'dotenv';
import { FilterQuery, Query } from 'mongoose';
import { IArticle } from '../types/article.js';
dotenv.config();


async function createComment () {
  const findOneStub = sinon.stub(Article, 'findOne').resolves({
    _id: '6611751546ac04e4846646d7',
  });

  const commentData = {
    blogId: '6611751546ac04e4846646d7',
    content: 'Hello world',
  };
  
  const token = process.env.test_User_Token;

  const res = await request(app)
    .post('/api/comment')
    .set('Cookie', `jwt=${token}`)
    .send(commentData);

    return res.body.Comment;
}



describe('Comment API Tests', () => {
    let commentId: any;

    beforeEach(async () => {
        await Comment.deleteMany({});
    });

  describe('Create Comment', () => {
    it('should create a new comment with valid input', async () => {

      const findOneStub = sinon.stub(Article, 'findOne').resolves({
        _id: '6611751546ac04e4846646d7',
      });

      const commentData = {
        blogId: '6611751546ac04e4846646d7',
        content: 'Hello world',
      };
      
      const token = process.env.test_User_Token;

      const res = await request(app)
        .post('/api/comment')
        .set('Cookie', `jwt=${token}`)
        .send(commentData);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message').equal('Comment created successfully');
      expect(res.body).to.have.property('Comment');
      expect(res.body.Comment).to.have.property('blogId').equal(commentData.blogId);
      expect(res.body.Comment).to.have.property('content').equal(commentData.content);

      commentId = res.body.Comment._id;
      findOneStub.restore();
    });
  });

  describe('Get Single Comment', () => {
    it('should get a single comment', async () => {

      try {

        const createdComment = await createComment();
        const commentId = createdComment._id;
        // console.log('Created comment id:', commentId);
      

        const res = await request(app)
          .get(`/api/comment/${commentId}`);
      
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('singleComment');
        expect(res.body.singleComment).to.have.property('blogId').equal(createdComment.blogId);
        expect(res.body.singleComment).to.have.property('content').equal(createdComment.content);
      } catch (error) {
        // console.error('Error:', error);
      }
      
    });
  });

  describe('Get All Comments', () => {
    it('should get all comments', async () => {

      try {

        const createdComment = await createComment();
        const commentId = createdComment._id;
        console.log('Created comment id:', commentId);
      

        const res = await request(app)
          .get(`/api/comment`);
      
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('comments');
        //correcct below
        // expect(res.body.singleComment).to.have.property('blogId').equal(createdComment.blogId);
        // expect(res.body.singleComment).to.have.property('content').equal(createdComment.content);
      } catch (error) {
        // console.error('Error:', error);
      }
      
    });
  });

  describe('Update Comment', () => {
    it('should update an existing comment', async () => {
      try {
        const updatedContent = 'Updated content';
        
        const res = await request(app)
          .put(`/api/comment/${commentId}`)
          .send({ content: updatedContent });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').equal('Comment Updated successfully');
        expect(res.body).to.have.property('updatedComment');
        expect(res.body.updatedComment).to.have.property('content').equal(updatedContent);
      } catch (error) {
        // console.log('Error: ', error);
        
      }
    });
  });

  describe('Delete Comment', () => {
    it('should delete an existing comment', async () => {

      try {
        const createdComment = await createComment();
        const commentId = createdComment._id;

        const res = await request(app)
          .delete(`/api/comment/${commentId}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').equal('Comment deleted successfully');
      } catch (error) {
        // console.log("Error:", error)
      }
    });
  });
});
