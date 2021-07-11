const express = require('express');
const fruitsRouter = express.Router();

fruitsRouter.get('', async(req, res) => {
  res.render('fruits4kids.html')
})

module.exports = fruitsRouter;