import request from 'supertest';
import app from '../app.js';
describe('User Authentication Middleware', () => {
    it('should pass authentication and set user data in request object when valid token is provided', (done) => {
        const jwtSecret = process.env.JWT_SECRET;
        const user = {
            id: '222User',
            username: 'testuser',
            isAdmin: true,
        };
        // const token = jwt.sign(user, 'jwtSecret');
        const token = process.env.test_Admin_Token;
        request(app)
            .get('/api/message')
            .set('Cookie', `jwt=${token}`)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            // expect(res.body.id).to.equal('66116d85308986744dfb81df');
            // expect(res.body.username).to.equal('Admin');
            // expect(res.body.isAdmin).to.equal(true);
            done();
        });
    });
    it('should return 401 when no token is provided', (done) => {
        request(app)
            .get('/api/message')
            .expect(401)
            .end(done);
    });
    it('should return 403 when an invalid token is provided', (done) => {
        const invalidToken = 'invalidToken';
        request(app)
            .get('/api/message')
            .set('Cookie', `jwt=${invalidToken}`)
            .expect(403)
            .end(done);
    });
});
//# sourceMappingURL=middleAuth.test.js.map