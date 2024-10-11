const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello employees!');
});

app.use('/books/', require('./api/books'));

app.use((req, res, next) => {
  next({ status: 404, message: 'Endpoint not found.'});
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? 'Sorry, something broke :(');
});

app.listen(PORT, () => {
    `Listening on port ${PORT}`;
});