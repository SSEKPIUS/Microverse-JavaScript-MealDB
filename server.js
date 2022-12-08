const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');

const compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
);
<<<<<<< HEAD

// Serve the files on port 3000.
=======
>>>>>>> 18-05pt-set-up-the-project-with-webpack-and-jest-group-task
app.listen(3000, () => {
  console.log('Example app listening on port 3000!\n');
});