const server = require('./app');

server.listen(process.env.PORT, () => {
  console.log(`Server is listening at port ${process.env.PORT}`);
})