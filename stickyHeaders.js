/*!
 * Sticky Section Headers
 *
 * Copyright (c) 2013 Florian Plank (http://www.polarblau.com/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * 
 */

(function($){
  $.fn.stickySectionHeaders = function(options) {

    var settings = $.extend({
      stickyClass     : 'sticky',
      headlineSelector: '.header'
    }, options);

    return $(this).each(function() {
      var $this = $(this);
      $(this).find('ul:first').bind('scroll.sticky', function(e) {
        $(this).find('> li').has('.header').each(function() {
          var $this      = $(this),
              top        = $this.position().top,
              height     = $this.outerHeight(),
              $head      = $this.find(settings.headlineSelector),
              headHeight = $head.outerHeight(),
              $nextHead = $this.nextAll().has('.header').first();
              if (!$nextHead.length) {              //This should be a good estimate
                $nextHead = $this.nextAll().last();
              }

          if (top < 0) {
            $this.addClass(settings.stickyClass).css('paddingTop', headHeight);
            $head.css({
              'top'  : ($nextHead.position().top < headHeight) ? ($nextHead.position().top - headHeight): '',
              'width': $this.outerWidth() - $head.cssSum('paddingLeft', 'paddingRight'),
            });
          } else {
            $this.removeClass(settings.stickyClass).css('paddingTop', '');
          }
        });
      });
    });
  };

  /* A little helper to calculate the sum of different
   * CSS properties
   *
   * EXAMPLE:
   * $('#my-div').cssSum('paddingLeft', 'paddingRight');
   */
  $.fn.cssSum = function() {
    var $self = $(this), sum = 0;
    $(arguments).each(function(i, e) {
      sum += parseInt($self.css(e) || 0, 10);
    });
    return sum;
  };

})(jQuery);
