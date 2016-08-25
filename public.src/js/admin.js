var getDatas = function(next) {
  $.ajax({
    url: '/signs',
    type: 'get',
    dataType: 'json',
    success: next,
    error: function(data) {
      console.error(data);
      getDatas();
    }
  });
}

var showDatas = function(data) {
  $.each(data, function(key, value) {
    $el.append('<tr><th>' + value._id + '</th><td>' + value.name + '</td><td>' + value.phone + '</td></tr>');
  })

}

$(function() {
  $el = $('#signsList');
  getDatas(showDatas);
  var socket = io.connect('http://127.0.0.1:3000');
  socket.on('newSign', function(sign) {
    showDatas([sign]);
  })
});
