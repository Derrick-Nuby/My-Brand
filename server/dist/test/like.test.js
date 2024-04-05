import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import Like from '../models/like.js';
describe('Like API Tests', () => {
    let likeId;
    beforeEach(async () => {
        await Like.deleteMany({});
    });
    describe('Create Like', () => {
        it('should create a new like with valid input', async () => {
            const likeData = {
                blogId: 'some_blog_id',
                liked: true,
            };
            const res = await request(app)
                .post('/api/like/create')
                .send(likeData);
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message').equal('Like created successfully');
            expect(res.body).to.have.property('Like');
            expect(res.body.Like).to.have.property('blogId').equal(likeData.blogId);
            expect(res.body.Like).to.have.property('liked').equal(likeData.liked);
            likeId = res.body.Like._id;
        });
    });
    describe('Update Like', () => {
        it('should update an existing like', async () => {
            const updatedLike = false;
            const res = await request(app)
                .put(`/api/like/${likeId}`)
                .send({ liked: updatedLike });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').equal('Like Updated successfully');
            expect(res.body).to.have.property('updatedLike');
            expect(res.body.updatedLike).to.have.property('liked').equal(updatedLike);
        });
    });
    describe('Delete Like', () => {
        it('should delete an existing like', async () => {
            const res = await request(app).delete(`/api/like/${likeId}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').equal('Like deleted successfully');
        });
    });
});
//# sourceMappingURL=like.test.js.map