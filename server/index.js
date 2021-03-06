const express = require('express');
const favicon = require('serve-favicon');
const middleware = require('./middleware');
const routes = require('./routes');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const options = {
  setHeaders: function (res, path) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'content-type'); 
  }
};

app.use(middleware.auth.session);
app.use(express.static(path.join(__dirname, '/../dist'), options));
app.use(favicon(path.join(__dirname, '/../dist/images','favicon.png')));
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());

app.use('/', routes.auth);

app.use('/search', routes.search);

app.use('/send', routes.send);

app.use('*', routes.fallback);

app.listen(port, _ => {
  console.log(`Server connected to port number: ${port}`);
});