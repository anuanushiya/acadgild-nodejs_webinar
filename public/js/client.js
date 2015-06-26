/* global jQuery */

(function ($) {

  "use strict";

  $(document).ready(function () {

    var socket, user = {};

    var initSocket = function () {
      socket = io();
      socket.on('broadcast', function (data) {
        renderQuestion(data);
      });
    };

    var registerUser = function () {
      var request = {
        type : 'join',
        name : user.name
      };
      socket.emit('join', request);
    };

    var welcomeUser = function () {
      var html = '<h1>Welcome ' + user.name +
        ', please wait while your host is preparing a questionnaire for you';
      $('.container').empty().html(html);
    };

    var renderQuestion = function (data) {
      var html = '<form id="form-question">' +
        '<h1>' + data.question + '</h1><br>' +
        '<label class="form-option-container" for="form-option-1">' +
          '<input id="form-option-1" type="radio" ' +
            'value="a" name="form-option-val">&nbsp;' + data.option.a + '</label>' +
        '<label class="form-option-container" for="form-option-2">' +
          '<input id="form-option-2" type="radio" ' +
            'value="b" name="form-option-val">&nbsp;' + data.option.b + '</label>' +
        '<label class="form-option-container" for="form-option-3">' +
          '<input id="form-option-3" type="radio" ' +
            'value="c" name="form-option-val">&nbsp;' + data.option.c + '</label>' +
        '<label class="form-option-container" for="form-option-4">' +
          '<input id="form-option-4" type="radio" ' +
            'value="d" name="form-option-val">&nbsp;' + data.option.d + '</label>' +
        '<br><br><br>' +
        '<input type="submit" class="pure-button pure-button-primary pure-u-1-2" ' +
          'value="Submit">' +
        '</form>';

      $('.container').empty().html(html);

      $('#form-question').off('submit').on('submit', function (ev) {
        ev.preventDefault();
        var request = {
          type : 'answer',
          user : user,
          answer : $('input[name=form-option-val]:checked').val()
        };

        socket.emit('answer', request);

        var html = '<h1>Sit tight, ' + user.name +
          '! <br>The winner will be announced shortly.';
        $('.container').empty().html(html);
      });

    };

    $('#form-nickname').on('submit', function (ev) {
      var nickname = $('#form-nickname-input').val();
      user = { name : nickname };

      ev.preventDefault();

      initSocket();
      registerUser();
      welcomeUser();
    });

  });

})(jQuery);
