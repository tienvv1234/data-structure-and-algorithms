const express = require('express');
const app = express();
const helmet = require('helmet');
const port = 3000;

app.use(helmet());

app.get('/', (req, res) => {
    res.send('ok');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
