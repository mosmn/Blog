/* eslint-disable no-unused-vars */
const request = require('supertest');
const app = require('../app');
const initializeMongoServer = require('./mongoConfigTesting');

let mongoServer;
let token;
let server;

beforeAll(async () => {
    server = app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
    mongoServer = await initializeMongoServer();

    // Register a test user and login to get a token
    await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword', email: 'test@gmail.com', type: 'admin'});

    const res = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' });

    token = res.body.token;
});

afterAll(async () => {
    await mongoServer.stop();
    server.close();
});

describe('/blog', () => {
    let postId;
    let commentId;

    test('POST /blog/posts should return 201 status', async () => {
        const response = await request(app)
            .post('/blog/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Post', content: 'Test Content', published: true });

        postId = response.body._id;
        expect(response.statusCode).toBe(201);
    });

    test('GET /blog/posts should return 200 status', async () => {
        const response = await request(app)
            .get('/blog/posts');

        expect(response.statusCode).toBe(200);
    });

    test('GET /blog/posts/:id should return 200 status', async () => {
        const response = await request(app)
            .get(`/blog/posts/${postId}`);

        expect(response.statusCode).toBe(200);
    });

    test('PUT /blog/posts/:id should return 200 status', async () => {
        const response = await request(app)
            .put(`/blog/posts/${postId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Post', content: 'Updated Content', published: false });

        expect(response.statusCode).toBe(200);
    });

    test('PATCH /blog/posts/:id/like should return 200 status', async () => {
        const response = await request(app)
            .patch(`/blog/posts/${postId}/like`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    test('PATCH /blog/posts/:id/unlike should return 200 status', async () => {
        const response = await request(app)
            .patch(`/blog/posts/${postId}/unlike`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    test('GET /blog/posts/:id/comments should return 200 status', async () => {
        const response = await request(app)
            .get(`/blog/posts/${postId}/comments`);

        expect(response.statusCode).toBe(200);
    });

    test('POST /blog/posts/:id/comments should return 201 status', async () => {
        const response = await request(app)
            .post(`/blog/posts/${postId}/comments`)
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'Test Comment' });

        commentId = response.body._id;
        expect(response.statusCode).toBe(201);
    });

    test('PATCH /blog/comments/:id/like should return 200 status', async () => {
        const response = await request(app)
            .patch(`/blog/comments/${commentId}/like`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    test('PATCH /blog/comments/:id/unlike should return 200 status', async () => {
        const response = await request(app)
            .patch(`/blog/comments/${commentId}/unlike`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    test('DELETE /blog/posts/:id should return 204 status', async () => {
        const response = await request(app)
            .delete(`/blog/posts/${postId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(204);
    });

    test('DELETE /blog/posts/:id/comments/:commentId should return 204 status', async () => {
        const response = await request(app)
            .delete(`/blog/posts/${postId}/comments/${commentId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(204);
    });
}
);


