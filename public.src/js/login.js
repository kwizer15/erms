'use strict';

var $el;

$(function() {
  $el = $('form');
  $el.on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/auth/login',
      type: 'post',
      dataType: 'json',
      data: {
        login: $el.find('[name=login]').first().val(),
        password: $el.find('[name=password]').first().val()
        // @todo security!
      }
    });

    return false;
  });
});
