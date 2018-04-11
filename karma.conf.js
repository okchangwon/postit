'use strict';

var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    reporters: ['mocha'],
    webpack: {
      mode: 'development',
      module: webpackConfig.module,
      plugins: webpackConfig.plugins
    },
    frameworks: ['mocha'],
    files: [
      './src/**/__tests__/*.test.js'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      './src/**/__tests__/*.test.js': ['webpack']
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },
    webpackMiddleware: {
      noInfo: true //please don't spam the console when running in karma!
    },
    singleRun: false
  });
};
