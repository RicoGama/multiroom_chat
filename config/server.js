/* importar módulo do framework express */
var express = require('express');

/* importar módulo consign */
var consign = require('consign');

/* importar body-parser */
var bodyParser = require('body-parser');

/* importar express validator */
var expressValidator = require('express-validator');

/* iniciar objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'view' express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configura middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua autoload das rotas, models e controllers para o objeto app */
consign()
    .include('app/routers')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* exportando o objeto app */
module.exports = app;