const express = require('express');
const mathRouter = express.Router();

mathRouter.get('', async(req, res) => {
  res.render('math4kids.html')
})

module.exports = mathRouter;