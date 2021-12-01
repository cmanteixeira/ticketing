import request from 'supertest';
import { app } from '../../app';

it('Returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test',
      password: 'qwerty',
    })
    .expect(400);
});

it('Returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test1@gmail.com',
      password: '',
    })
    .expect(400);
});

it('Fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'qwerty' })
    .expect(400);
});

it('Fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'qwerty',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'qwerty1',
    })
    .expect(400);
});

it('Respons with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'qwerty',
    })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'qwerty',
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
