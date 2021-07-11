const express = require('express');
const geoRouter = express.Router();

geoRouter.get('', async(req, res) => {
  res.render('geo4kids.html')
})

module.exports = geoRouter;