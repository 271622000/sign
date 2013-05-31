seajs.config({
  // Enable plugins
  plugins: ['shim'],

  // Configure alias
  alias: {
    'jquery': {
      src: 'lib/jquery.min.js',
      exports: 'jQuery'
    },
    'bootstrap' : {
      src : 'lib/bootstrap.min.js',
      exports : 'bootstrap'
    }
  }
});
