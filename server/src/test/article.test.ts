import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import Article from '../models/article.js';
import cloudinary from 'cloudinary';

describe('Article API Tests', () => {
  let articleId: any;

  beforeEach(async () => {
    await Article.deleteMany({});
  });

  describe('Create Article', () => {
    it('should create a new article with valid input', async () => {
      const articleData = {
        title: 'Test Article',
        tags: ['tag1', 'tag2'],
        description: 'This is a test article',
        comments: [],
        likes: [],
      };

      const res = await request(app)
        .post('/api/article')
        .send(articleData);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('Article created successfully');
      expect(res.body.article).to.have.property('title').equal(articleData.title);
      expect(res.body.article.image).to.be.a('string');
      expect(res.body.article.tags).to.deep.equal(articleData.tags);
      expect(res.body.article.description).to.equal(articleData.description);
      expect(res.body.article.comments).to.be.an('array').that.is.empty;
      expect(res.body.article.likes).to.be.an('array').that.is.empty;

      articleId = res.body.article._id;
    });
  });

  describe('Get Single Article', () => {
    it('should get a single article', async () => {
      const article = new Article({
        title: 'Test Article',
        tags: ['tag1', 'tag2'],
        description: 'This is a test article',
        comments: [],
        likes: [],
      });
      await article.save();

      const res = await request(app).get(`/api/article/${article._id}`);

      expect(res.status).to.equal(200);
      expect(res.body.singleArticle).to.have.property('title').equal(article.title);
    });
  });

  describe('Update Article', () => {
    it('should update an existing article', async () => {
      const updatedTitle = 'Updated Title';
      const res = await request(app)
        .put(`/api/article/${articleId}`)
        .send({ title: updatedTitle });

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Article Updated successfully');
      expect(res.body.updatedArticle.title).to.equal(updatedTitle);
    });
  });

  describe('Delete Article', () => {
    it('should delete an existing article', async () => {
      const res = await request(app).delete(`/api/article/${articleId}`);

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Article deleted successfully');
    });
  });
});
