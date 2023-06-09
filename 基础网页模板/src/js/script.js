//======================================================
// magnetic
// addclass magnetic or magnetButton
// copy: https://codepen.io/tdesero/pen/RmoxQg
//======================================================
var magnets = document.querySelectorAll('.magnetic')
var strength = 50

magnets.forEach( (magnet) => {
  magnet.addEventListener('mousemove', moveMagnet );
  magnet.addEventListener('mouseout', function(event) {
    TweenMax.to( event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
  } );
});
function moveMagnet(event) {
  var magnetButton = event.currentTarget
  var bounding = magnetButton.getBoundingClientRect()
  //console.log(magnetButton, bounding)
  TweenMax.to( magnetButton, 1, {
    x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
    y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
    ease: Power4.easeOut
  })

  //magnetButton.style.transform = 'translate(' + (((( event.clientX - bounding.left)/(magnetButton.offsetWidth))) - 0.5) * strength + 'px,'+ (((( event.clientY - bounding.top)/(magnetButton.offsetHeight))) - 0.5) * strength + 'px)';
}
//======================================================
// End magnetic
//======================================================

$(function () {
  var Accordion = function (el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;
      var links = this.el.find('.menu-link');
      links.on('click', {
          el: this.el,
          multiple: this.multiple
      }, this.dropdown);
  };
  Accordion.prototype.dropdown = function (e) {
      var $el = e.data.el;
      $this = $(this), $next = $this.next();
      $next.slideToggle();
      $this.parent().toggleClass('unfold');
      $(".menu-link").removeClass("actived");
      $this.parent().find(".menu-link").addClass('actived');
      if (!e.data.multiple) {
          $el.find('.submenu').not($next).slideUp().parent().removeClass('unfold');
      }
      ;
  };
  var accordion = new Accordion($('#accordion'), false);
});

