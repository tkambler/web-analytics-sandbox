import { setupWorker, rest } from 'msw';
import cookies from 'js-cookie';

const users = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@fakesite.local',
    password: '123',
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@fakesite.local',
    password: 'abc',
  },
];

const handlers = [
  rest.get('/api/session', (req, res, ctx) => {

    const user = (() => {
      const userId = parseInt(cookies.get('session_user_id'), 10);
      if (userId) {
        return users.find(user => user.id === userId);
      }
    })();

    if (user) {
      return res(
        ctx.json({
          data: user,
        })
      );
    } else {
      return res(
        ctx.status(404),
      );
    }

  }),
  rest.post('/api/session', (req, res, ctx) => {

    const body: any = req.body;

    const user = users.find(user => user.email === body.email);
    if (user?.password !== body.password) {
      return res(
        ctx.status(404),
      );
    }

    cookies.set('session_user_id', user.id);
    const { password, ...data } = user;

    return res(
      ctx.json({
        data,
      }),
    );

  }),
  rest.delete('/api/session', (req, res, ctx) => {

    cookies.remove('session_user_id', null);

    return res(
      ctx.status(200),
    );

  }),
];

export const worker = setupWorker(...handlers);

worker.start();
