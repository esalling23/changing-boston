/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * 
 * EL Web Module global client JS
 * ==========
 */

/**
 * Waits for the first child image in the provided element to load and then dispatches provided callback.
 * @module utils
 * @param {jQuery selector} parentElem - The parent element containing image.
 * @param {function} callback - The callback function.
 */
imageLoaded = function(parentElem, callback) {

	parentElem.find('img').first().on('load', function() {

		// Image loaded, callback fires
		callback();

	})
	.each(function() {

		// Force image to dispatch 'load' (cache workaround)
	  if(this.complete) $(this).load();

	});

};

	// $.post( 
	// 			  	"/api/response/",
	// 					{promptId: 'TEST'},
	// 					function( data ) {
	// 						data.promptId = 'TEST';

	// 						if(data.error_code !== undefined) {

	// 							// if(data.error_code === 'need_content')
	// 								// $('#session-create #categories').addClass('invalid');
								
	// 							$('#session-create .error').text(data.msg).fadeIn();
								
	// 							return;
	// 						}
	// 					  window.location = data;
	// 					  // socket.emit("game:start", 'TEST');

	// 					});

