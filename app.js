const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { sequelize } = require('./models');

const app = express();
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/', bookRoutes);
app.use('/', reviewRoutes);



app.listen(3000, async () => {
  await sequelize.sync();
  console.log('Server is running on http://localhost:3000');
});
