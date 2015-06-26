/* global jQuery */

(function ($) {

  "use strict";

  $(document).ready(function () {

    var socket, user = {};

    var initSocket = function () {
      socket = io();
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
      $('#form-nickname').empty().html(html);
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
