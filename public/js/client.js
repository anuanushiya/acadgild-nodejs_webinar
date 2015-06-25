/* global jQuery */

(function ($) {

  "use strict";

  $(document).ready(function () {
    $('#form-nickname').on('submit', function (ev) {
      console.log('Form Submitted');
      ev.preventDefault();
    });
  });

})(jQuery);
