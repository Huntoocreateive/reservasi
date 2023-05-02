const express = require('express');
const router = express.Router();
const reservasi = require('../services/reservasi');

/* GET message. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await reservasi.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting message `, err.message);
    next(err);
  }
});

/* POST message */
router.post('/', async function(req, res, next) {
  try {
    res.json(await reservasi.create(req.body));
  } catch (err) {
    console.error(`Error while creating message`, err.message);
    next(err);
  }
});

module.exports = router;