var btn = document.getElementById('button');
var p = document.getElementById('p');

btn.onclick = function() {
  $.ajax({
    url: '/test',
    data: {
      name: '123',
    },
    type: 'GET',
    success: function (res) {
      p.innerHTML = JSON.stringify(res);
    }
  })
};

