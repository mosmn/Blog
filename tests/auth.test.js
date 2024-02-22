/* eslint-disable no-unused-vars */
const request = require('supertest');
const app = require('../app');
const initializeMongoServer = require('./mongoConfigTesting');

let mongoServer;

beforeAll(async () => {
    mongoServer = await initializeMongoServer();
    }
);

afterAll(async () => {
    await mongoServer.stop();
});

describe('/auth', () => {
    test('POST /auth/register should return 201 status', async () => {
        const response = await request(app)
          .post('/auth/register')
          .send({
            username: 'testuser',
            password: 'testpassword',
            email: 'test@gmail.com',
          });
        expect(response.statusCode).toBe(201);
      });
    
        test('POST /auth/login should return 200 status', async () => {
            const response = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });
            expect(response.statusCode).toBe(200);
        });
    
        test('POST /auth/login should return 400 status', async () => {
            const response = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword',
            });
            expect(response.statusCode).toBe(400);
        });
    
        test('POST /auth/login should return 400 status', async () => {
            const response = await request(app)
            .post('/auth/login')
            .send({
                username: 'wronguser',
                password: 'testpassword',
            });
            expect(response.statusCode).toBe(400);
        });
    
        test('POST /auth/login should return 400 status', async () => {
            const response = await request(app)
            .post('/auth/login')
            .send({
                username: 'wronguser',
                password: 'wrongpassword',
            });
            expect(response.statusCode).toBe(400);
        });
    }
);
