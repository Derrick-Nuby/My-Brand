import { expect } from 'chai';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from '../app.js';
import User from '../models/user.js';

describe('Authentication API Tests', () => {

  describe('Create Account', () => {

    beforeEach(async () => {
      await User.deleteMany({});
    });

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
      expect(res.body).to.have.property('error').equal('A user with that email already exists, if that is you.. please login or reset your password');
    });
  });

  describe('User Login', () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });
  
    it('should login a user when the correct details are entered', async () => {
      const saveNewUser = new User({
        name: '222User',
        phone: '0786263290',
        email: '222user@gmail.com',
        // password: await bcrypt.hash('Passw0RD!', 10),
        password: 'Passw0RD!',
        confirmPassword: 'Passw0RD!',
      });
      await saveNewUser.save();
  
      const userData = {
        email: '222user@gmail.com',
        password: 'Passw0RD!',
      };
  
      const res = await request(app)
        .post('/api/user/login')
        .send(userData);
  
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message').equal('User logged in successfully');
      expect(res.body).to.have.property('token');
      expect(res.headers['set-cookie']).to.be.an('array');
    });
  
    it('should return an error if the password is incorrect', async () => {
      const saveNewUser = new User({
        name: '222User',
        phone: '0786263290',
        email: '222user@gmail.com',
        password: await bcrypt.hash('Passw0RD!', 10),
      });
      await saveNewUser.save();
  
      const userData = {
        email: '222user@gmail.com',
        password: 'Passw0RD!!',
      };
  
      const res = await request(app)
        .post('/api/user/login')
        .send(userData);
  
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('error').equal('Invalid password');
    });
  
    it('should return an error if the user is not found', async () => {
      const userData = {
        email: '333user@gmail.com',
        password: 'Passw0RD!',
      };
  
      const res = await request(app)
        .post('/api/user/login')
        .send(userData);
  
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('error').equal('User not found');
    });
  });
  
});
