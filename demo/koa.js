const http = require('http');

class Application {
  constructor() {
    this.middlewares = [];
  }
  listen(port) {
    const server = http.createServer(async (req, res) => {
      const ctx = new Context(req, res);
      // this.middleware(ctx);
      const fn = compose(this.middlewares);
      await fn(ctx);

      ctx.res.end(ctx.body);
    });
    server.listen(port);
  }
  use(middleware) {
    this.middlewares.push(middleware);
  }
}

class Context {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
}

const app = new Application();

app.use(async (ctx, next) => {
  ctx.body = 'hello, one';
  await next();
});

app.use(async (ctx, next) => {
  ctx.body = 'hello, two';
  await next();
});

app.listen(7999);

function compose(middlewares) {
  return (ctx) => {
    const dispatch = (i) => {
      const middleware = middlewares[i];
      if (i === middlewares.length) return;
      return middleware(ctx, () => dispatch(i + 1));
    };
    return dispatch(0);
  };
}
