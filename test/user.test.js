const app = require('../app');
const request = require('supertest');

describe('Test the user path', () => {
  test('It should response the GET method', async (done) => {
    const response = await request(app).get('/user');
    expect(response.status).toBe(200);
    done();
  });

  test('It should create a new user', async (done) => {
    const payload = {
      username: 'Jane Doe',
      city: 'New York',
      street: '7th Av.',
      housenum: '5',
    };
    const response = await request(app).post('/user').send(payload);

    expect(response.status).toBe(201);
    done();
  });

  test('It should return a single user by their ID', async (done) => {
    const response = await request(app).get('/user');
    const users = response.body;
    const userCount = users.length;
    const randomIndex = Math.round(Math.random() * userCount);
    const userId = users[randomIndex].id;
    const responseById = await request(app).get(`/user/${userId}`);

    expect(responseById.status).toBe(200);
    expect(responseById.body.id === userId);
    done();
  });

  test('It should update a single user by their ID', async (done) => {
    const payload = {
      username: 'John Doe',
      city: 'New Hampshire',
      street: '9th Av.',
      housenum: '51',
    };
    const response = await request(app).get('/user');
    const users = response.body;
    const userCount = users.length;
    const randomIndex = Math.round(Math.random() * userCount);
    const userId = users[randomIndex].id;

    const responseById = await request(app)
      .put(`/user/${userId}`)
      .send(payload);

    expect(responseById.status).toBe(200);
    expect(responseById.body.username === payload.username);
    expect(responseById.body.city === payload.city);
    expect(responseById.body.street === payload.street);
    expect(responseById.body.housenum === payload.housenum);
    done();
  });

  test('It should delete a single user by their ID', async (done) => {
    const username = 'John Doe';
    const response = await request(app).get('/user');
    const user = response.body.find((user) => user.username === username);
    const responseById = await request(app).delete(`/user/${user.id}`);
    expect(responseById.status).toBe(204);
    done();
  });
});
