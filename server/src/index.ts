import express from 'express';
import router from './router';

const app = express();

const port = 4700;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// routes
// app.get('/api', (req, res) => {
//   res.send('Hey we are at Earth!');
// });

app.use('/api', router);

// eslint-disable-next-line no-console
console.log('Hello world!');
