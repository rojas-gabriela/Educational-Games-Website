const express = require('express');
const indexRouter = express.Router();

/* GET home page.*/
indexRouter.get('', async(req, res) => {
  res.render('index.html')
})

module.exports = indexRouter;
