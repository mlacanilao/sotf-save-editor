const express = require('express');
const app = express()
const port = 443

app.set('view engine', 'ejs');

// To use js/css files.
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  // Index refers to index.ejs
  res.render('index');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
