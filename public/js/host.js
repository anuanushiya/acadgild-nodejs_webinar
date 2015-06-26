/* global jQuery */

(function ($) {

  "use strict";

  $(document).ready(function () {

    var socket = io(), user = {};

    socket.on('log', function (data) {
      var message, html;
      switch(data.type){
        case "join":
          message = data.name + " has joined";
          break;
      }

      html = "<div class='content-log-entry'>" + message + "</div>";

      $('#section-logs').find('.content-log').append(html);
    });
  });

})(jQuery);
