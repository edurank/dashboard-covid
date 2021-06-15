var controller = require('../controllers/konf')();

module.exports = function (app) { 

	app.get('/konf', controller.konf);
}
