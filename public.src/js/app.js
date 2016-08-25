'use strict';

var datas;

var listen = function($el) {
	$el.on('submit', function(e) {
		e.preventDefault();
		datas = {
			'name': $el.find('[name=name]').first().val(),
			'phone': $el.find('[name=phone]').first().val()
		};
		submit(datas, {
			success: modalSuccess,
			error: modalError
		});
	return false;
	});
}

var submit = function(datas, options) {
	$.ajax({
		url:'/signs',
		type: 'post',
		dataType: 'json',
		data: datas,
		success: options.success,
		error: options.error
	});
}

var modalSuccess = function(data) {
	$('#signup').html('<h4 class="alert alert-success">Merci ' + data.name + ', Nous prendrons rapidement contact avec vous par téléphone au numéro suivant : '+data.phone+'</h4>');
}


var modalError = function(data) {
	$('#signup').html('<h4 class="alert alert-warning">Votre demande est actuellement en cours de soummission.<br>Veuillez patientez quelques secondes</h4>');
	setTimeout(function(){submit(datas, {
		success: modalSuccess,
		error: modalError
	})},1000);
}

$(function() {
	listen($('#signup form'));

});
