/* global jQuery */

(function ($) {

  "use strict";

  $(document).ready(function () {

    var socket, user = {};

    var initSocket = function () {
      socket = io();
    };

    var registerUser = function () {
      var request = user;
      socket.emit('join', request);
    };

    var welcomeUser = function () {
      var html = '<h1>Welcome ' + user.name +
        ', Please wait while our host is preparing the questionnaire for you';
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
