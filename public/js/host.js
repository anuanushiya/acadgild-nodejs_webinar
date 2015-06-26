/* global jQuery */

(function ($) {

  "use strict";

  $(document).ready(function () {

    var socket = io(), user = {};

    $('#form-quiz').on('submit', function (ev) {
      ev.preventDefault();
      var request = {};

      request.question = $('#section-quiz-question').val();
      request.option = {
        a : $('#section-quiz-op1').val(),
        b : $('#section-quiz-op2').val(),
        c : $('#section-quiz-op3').val(),
        d : $('#section-quiz-op4').val()
      };
      request.answer = $('#section-quiz-answer').val();
      request.type = 'question';

      socket.emit('submit', request);

    });

    socket.on('log', function (data) {
      var message, html;
      switch(data.type){
        case "join":
          message = data.name + " has joined room";
          break;
        case "question":
          message = "'" + data.question + "' has been broadcasted to everyone";
          break;
        case "answer":
          message = data.user.name + " has answered - " + data.answer;
          break;
      }

      html = "<div class='content-log-entry'>" + message + "</div>";

      $('#section-logs').find('.content-log').append(html);
    });
  });

})(jQuery);
