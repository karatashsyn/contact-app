const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
//To make it work, we used the line above before the below(const app = require('./app')); If we made the  opposite, it would be unconfigured yet.

const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log('DB connection is successful ✔️');
  });

// // const { default: test } = require('node:test');
// const testContact = new Contact({
//   name: null,
//   number: '0000000000',
// });
// testContact
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('⚠️ ', err);
//   });
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// process.on('unhandledRejection', (err) => {
//   console.log('Unhandled Rejection');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
