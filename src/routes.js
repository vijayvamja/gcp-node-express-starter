const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();

const validations = {
  register: {
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  login: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};

router.post('/login', celebrate(validations.login), (req, res, next) => {
  const { auth } = req.app.context;
  try {
    const response = auth.login();
    res.json(response);
  } catch (e) {
    next(e);
  }
});

router.post('/register', celebrate(validations.register), (req, res, next) => {
  const { auth } = req.app.context;
  try {
    const response = auth.register();
    res.json(response);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
