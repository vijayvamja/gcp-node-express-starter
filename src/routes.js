const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();

const validations = {
  createLead: {
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      description: Joi.string(),
    }),
  },
};

router.get('/leads', async (req, res, next) => {
  const { lead } = req.app.context;
  try {
    const response = await lead.listLeads(req.body);
    res.json(response);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/lead',
  celebrate(validations.createLead),
  async (req, res, next) => {
    const { lead } = req.app.context;
    try {
      const response = await lead.createLead(req.body);
      res.json(response);
    } catch (e) {
      next(e);
    }
  },
);

module.exports = router;
