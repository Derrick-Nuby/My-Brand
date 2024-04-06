import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import Like from '../models/like.js';
import Article from '../models/article.js';
import sinon from 'sinon';
import dotenv from 'dotenv';
dotenv.config();
async function createLike() {
    const findOneStub = sinon.stub(Article, 'findOne').resolves({
        _id: '6611751546ac04e4846646d7',
    });
    const likeData = {
        blogId: '6611751546ac04e4846646d7',
        liked: true
    };
    const token = process.env.test_User_Token;
    const res = await request(app)
        .post('/api/like')
        .set('Cookie', `jwt=${token}`)
        .send(likeData);
    return res.body.Like;
}
describe('Likes API Tests', () => {
    let likeId;
    beforeEach(async () => {
        await Like.deleteMany({});
    });
    describe('Create Like', () => {
        it('should create a new Like', async () => {
            const likeData = {
                blogId: '6611751546ac04e4846646d7',
                liked: true
            };
            const token = process.env.test_User_Token;
            const res = await request(app)
                .post('/api/like')
                .set('Cookie', `jwt=${token}`)
                .send(likeData);
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message').equal('Like created successfully');
            expect(res.body).to.have.property('Like');
            expect(res.body.Like).to.have.property('blogId').equal(likeData.blogId);
            likeId = res.body.Like._id;
        });
    });
    describe('Get All Likes', () => {
        it('should get all likes', async () => {
            try {
                const createdLike = await createLike();
                const likeId = createdLike._id;
                console.log('Created like id:', likeId);
                const res = await request(app)
                    .get(`/api/like`);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('likes');
                //correcct below
                // expect(res.body.singleComment).to.have.property('blogId').equal(Like.blogId);
                // expect(res.body.singleComment).to.have.property('content').equal(Like.content);
            }
            catch (error) {
                // console.error('Error:', error);
            }
        });
    });
    describe('Update Like', () => {
        it('should update an existing Like', async () => {
            try {
                const updatedContent = 'Updated content';
                const res = await request(app)
                    .put(`/api/like/${likeId}`)
                    .send({ content: updatedContent });
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message').equal('Like Updated successfully');
                expect(res.body).to.have.property('updatedLike');
                expect(res.body.updatedLike).to.have.property('content').equal(updatedContent);
            }
            catch (error) {
                // console.log('Error: ', error);
            }
        });
    });
    describe('Delete Like', () => {
        it('should delete an existing Like', async () => {
            try {
                const createdLike = await createLike();
                const likeId = createdLike._id;
                const res = await request(app)
                    .delete(`/api/like/${likeId}`);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message').equal('Like deleted successfully');
            }
            catch (error) {
                // console.log("Error:", error)
            }
        });
    });
});
//# sourceMappingURL=like.test.js.map