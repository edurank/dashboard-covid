var controller = require('../../controllers/konf')();

module.exports = function (app) { 

	app.get('/paginaTeste', controller.konf);
}
