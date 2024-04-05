import { expect } from 'chai';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../app.js';
import User from '../models/user.js';
describe('Authentication API Tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });
    describe('Create Account', () => {
        it('should create a new user account with valid input', async () => {
            const userData = {
                name: '222User',
                phone: '0786263290',
                email: '222user@gmail.com',
                password: 'Passw0RD!',
                confirmPassword: 'Passw0RD!',
            };
            const res = await request(app)
                .post('/api/user/create')
                .send(userData);
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message').equal('User Created Successfully');
            expect(res.body).to.have.property('user');
            expect(res.body.user).to.have.property('name').equal(userData.name);
            expect(res.body.user).to.have.property('email').equal(userData.email);
        });
        it('should return an error if the email is already in use', async () => {
            const existingUser = new User({
                name: '222User',
                phone: '0786263290',
                email: '222user@gmail.com',
                password: await bcrypt.hash('Passw0RD!', 10),
            });
            await existingUser.save();
            const userData = {
                name: '222User',
                phone: '0786263290',
                email: '222user@gmail.com',
                password: 'Passw0RD!',
                confirmPassword: 'Passw0RD!',
            };
            const res = await request(app)
                .post('/api/user/create')
                .send(userData);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message').equal('A user with that email already exists, if that is you.. please login or reset your password');
        });
    });
});
//# sourceMappingURL=auth.test.js.map