const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();

const validations = {
  register: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};

router.post('/register', celebrate(validations.register), (req, res, next) => {
  const { auth } = req.app.context;
  try {
    auth.register();
    res.send('Register Called');
  } catch (e) {
    next(e);
  }
});

module.exports = router;