var keystone = require('keystone');
var Prompt = keystone.list('Prompt');

exports.create = function(req, res) {

	console.log(req.body);

	// let data = req.body;

	Prompt.model.findOne({'promptId': req.body.promptId}).exec(function(err, item){

		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			// res.apiResponse({

			// 	post: item

			// });
			
		});

	});

};
