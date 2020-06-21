const App = require('./app');
const Auth = require('./auth');

async function setup() {
  const auth = Auth();

  return {
    auth,
  };
}

exports.app = async (...params) => {
  const context = await setup();
  const app = App(context);
  return app(...params);
};
