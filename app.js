const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

const pagesRouter = require('./routers/pages');
const pizzasRouter = require('./routers/pizzas');

app.use('/', pagesRouter);
app.use('/pizzas', pizzasRouter);

app.listen(port, () => {
  console.log('App Express listening on port ' + port);
});
