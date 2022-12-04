jQuery(document).ready(function () {
  dynamicCssVariables();
  searchBoxFocus();
  toggleBootstrapTogglesOnHover();
  megamenuOpenaddClassToBody();
  dynamicDimensionParent();
  customVideoControls();
  listToggler();
  allSlidersInitialise();
  filterMobileToggler();
  flagsDropdown();
  InputAddClassOnFocus();
  modalVideo();

  // pdp page 
  productSpotlightGallery();

});

/***************************/
// dynamic css variables
function dynamicCssVariables() {
  var containerOffset = jQuery(".container").offset().left;
  var containerWidth = jQuery(".container").width();
  var siteHeaderHeight = jQuery(".siteHeader").innerHeight();
  var siteFooterHeight = jQuery(".siteFooter").innerHeight();
  var productListGridheight = jQuery(".product-list-grid").innerHeight();
  jQuery("body").css({
    "--containerOffset": containerOffset + "px",
    "--siteHeaderHeight": siteHeaderHeight + "px",
    "--siteFooterHeight": siteFooterHeight + "px",
    "--productListGridheight": productListGridheight + "px",
    "--containerWidth": containerWidth + "px"
  });

  jQuery(window).resize(function () {
    dynamicCssVariables();
  });
}

/***************************/
function searchBoxFocus() {
  jQuery(".header-search .form-control")
    .focus(function () {
      jQuery(this).parent().addClass("focus");
    })
    .blur(function () {
      jQuery(this).parent().removeClass("focus");
    });
}

/***************************/
// general bootstrap togglers on hover
function toggleBootstrapTogglesOnHover() {
  // dropdown
  jQuery(".dropdown").hover(function (e) {
    jQuery(".dropdown").not(this).find(".dropdown-menu").removeClass("show");
  });

  // nav pills
  jQuery(".nav-pills.hoverPills .nav-link,.hoverTabs .nav-link").mouseenter(
    function () {

      // jQuery(this).delay(300).click();
      // var targetID = jQuery(this).attr("id");
      // var targetNode = jQuery(this)
      //   .parent()
      //   .next()
      //   .find("[aria-labelledby=" + targetID + "]");
      // jQuery(targetNode).delay(300).siblings().removeClass("active show");


      // megamenu scroll
      if (jQuery(window).width() < 1200) {
        jQuery("#megaMenu").animate(
          {
            scrollTop: jQuery(this).parent().siblings(".tab-content").offset().top,
          },
          "slow"
        );
      }
    }
  );
}

/***************************/
//navbar
function megamenuOpenaddClassToBody() {
  jQuery('[data-bs-target="#megaMenu"]').click(function () {
    if (jQuery(this).hasClass("collapsed")) {
      jQuery("body").removeClass("megaMenu-active");
    } else {
      jQuery("body").addClass("megaMenu-active");
    }
  });
}

/***************************/
// sliders
/***************************/
function allSlidersInitialise() {
  homeBanner();
  movingStripBar();
  fullWidthSliders();
  testimonialsSlider();
  productsGridMinimalSliders();
}
//homepage banner
function homeBanner() {
  $(".mainBanner .slider").slick({
    infinite: false,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 3100,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  $(".mainBanner .slider").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      if (Math.abs(nextSlide - currentSlide) == 1) {
        direction = nextSlide - currentSlide > 0 ? "right" : "left";
      } else {
        direction = nextSlide - currentSlide > 0 ? "left" : "right";
      }
      if (direction == "left") {
        $(".mainBanner .slider").addClass("lefted");
      } else {
        $(".mainBanner .slider").removeClass("lefted");
      }

      // left edge
      if (slick.currentSlide == 1) {
        $(".mainBanner .slider").addClass("left-edged");
      } else {
        $(".mainBanner .slider").removeClass("left-edged");
      }

      // right edge
      if (
        slick.currentSlide + 1 >=
        slick.slideCount - slick.options.slidesToShow
      ) {
        $(".mainBanner .slider").addClass("right-edged");
      } else {
        $(".mainBanner .slider").removeClass("right-edged");
      }
    }
  );
}

// gold rate panel
function movingStripBar() {
  $(".moving-stripbar").each(function () {
    var repeatingContent = $(this).html();
    $(this).append(repeatingContent);
    $(this).append(repeatingContent);
    $(this).slick({
      slidesToShow: 5,
      autoplaySpeed: 0,
      speed: 3000,
      cssEase: "linear",
      autoplay: true,
      infinite: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  });
}
// full width sliders
function fullWidthSliders() {
  $(".slider-full-width").slick();
}

// testimonials slider
function testimonialsSlider() {
  $(".testimonials .slider").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    dots: true,
    dotsClass: "custom_paging",
    pauseOnHover: false,

    customPaging: function (slider, i) {
      return i + 1 + "/" + slider.slideCount / 3;
    },

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,

          customPaging: function (slider, i) {
            return i + 1 + "/" + slider.slideCount / 2;
          },
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

          customPaging: function (slider, i) {
            return i + 1 + "/" + slider.slideCount;
          },
        },
      },
    ],
  });
}

// products grid-minimal slider
function productsGridMinimalSliders() {
  function productsGridFour() {
    $(".products-grid-minimal.grid-four").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      infinite: true,
      speed: 300,
      autoplaySpeed: 2000,

      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });
  }
  function productsGridThree() {
    $(".products-grid-minimal.grid-three").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      infinite: true,
      speed: 300,
      autoplaySpeed: 2000,

      responsive: [
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });
  }

  productsGridFour();
  productsGridThree();

  $('.featured-categories [data-bs-toggle="pill"]').on(
    "shown.bs.tab",
    function () {
      $(".products-grid-minimal.grid-four").slick("unslick");
      productsGridFour();
    }
  );
}

/***************************/
//for elements which need dynamic dimensions
function dynamicDimensionParent() {
  function action() {
    $(".dynamic-dimension-parent > *").each(function () {
      var width = $(this).innerWidth();
      var height = $(this).innerHeight();
      // square based on width
      if ($(this).parent().hasClass(".dynamicHeight")) {
        $(this).innerHeight(width);
      }
      // square based on height
      else if ($(this).parent().hasClass(".dynamicWidth")) {
        $(this).innerWidth(height);
      }
      // aspect ratio based on width
      else if ($(this).parent().hasClass("aspect-ratio-dynamicHeight")) {
        var ratioWidth = jQuery(this).parent().attr("aspect-ratio-width");
        var ratioHeight = jQuery(this).parent().attr("aspect-ratio-height");

        var calculated_height = (ratioHeight / ratioWidth) * width;
        $(this).innerHeight(calculated_height);
      }
    });
  }

  action();
  jQuery(window).resize(function () {
    setTimeout(function () { action(); }, 300);
  });
}

/***************************/
// custom video player
function customVideoControls() {
  // play video on button click
  $(".btn-play").click(function () {
    var container = $(this).closest(".video-inn");
    $(container).find("video").get(0).play();
    $(container).addClass("playing");

    //stop all other video
    $(".video-inn")
      .not(container)
      .removeClass("playing click-paused")
      .find("video")
      .get(0).currentTime = 0;
    $(".video-inn").not(container).find("video").get(0).pause();
  });

  // pause video on video click
  $(".video-inn video").click(function () {
    var container = $(this).closest(".video-inn");
    var video = $(container).find("video");

    $(container).toggleClass("click-paused");
    if ($(container).hasClass("click-paused")) {
      $(video).get(0).pause();
    } else {
      $(video).get(0).play();
    }
  });

  // "play video" cursor
  $(".video-inn").append(`<span class="playCursor"></span>`);
  $(".video-inn").on("mousemove", function (e) {
    var container = $(this);
    $(".playCursor").css({
      left: e.pageX - $(container).offset().left,
      top: e.pageY - $(container).offset().top,
    });
  });

  // manage cursor in and out
  $(".video-inn").mouseenter(function () {
    $(this).addClass("cursorInside").find(".btn-play").click();
  });

  $(".video-inn").mouseleave(function () {
    $(this).removeClass("cursorInside");

    //stop on mouse leave
    $(this)
      .removeClass("playing click-paused")
      .find("video")
      .get(0).currentTime = 0;
    $("video").trigger("pause");
  });
}

/***************************/
//list toggler
function listToggler() {
  function chekIfSlidable() {
    $(".list-toggler").each(function () {
      if ($(this).hasClass("toggle-mobile")) {
        if ($(window).width() < 576) {
          $(this).next("ul").hide();
          $(this).addClass("slidable");
        } else {
          $(this).next("ul").show();
          $(this).removeClass("slidable");
        }
      } else if ($(this).hasClass("toggle-tab")) {
        if ($(window).width() < 767) {
          $(this).next("ul").hide();
          $(this).addClass("slidable");
        } else {
          $(this).next("ul").show();
          $(this).removeClass("slidable");
        }
      } else {
        if (!$(this).hasClass("active")) $(this).next("ul").hide();
        $(this).addClass("slidable");
      }
    });
  }
  chekIfSlidable();

  $(window).resize(function () {
    chekIfSlidable();
  });

  $(".list-toggler").click(function () {
    if ($(this).hasClass("slidable")) {
      $(this).toggleClass("active");
      $(this).next("ul").slideToggle();
    }
  });
}
// filterToggler
function filterMobileToggler() {

  function isSlidable() {
    if ($(window).width() < 992) {
      $(".filter-header").addClass("slidable");
      $(".filter-header").next(".filter-content").hide();
    } else {
      $(".filter-header").removeClass("slidable");
      $(".filter-header").next(".filter-content").show();
    }
  }

  function action() {
    $(".filter-header.slidable").click(function (e) {
      if (!$(e.target).is("a")) {
        $(this).next(".filter-content").slideToggle();
      }
    });
  }

  isSlidable();
  action();

  $(window).resize(function () {
    isSlidable();
  })

}

function productSpotlightGallery() {
  $('.main-product .slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav'
  });

  $('.thumbnails.slider-nav').slick({
    slidesToShow: 5,
    vertical: true,
    verticalSwiping: true,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
          arrows: false,
          verticalSwiping: false,
        },
      },
    ],
  });
}

/**********/
// Flag select dropdown

function flagsDropdown() {

  function formatState(state) {
    if (!state.id) {
      return state.text;
    }
    var baseUrl = "images/icons";
    var $state = $(
      '<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
    );
    return $state;
  };


  $('select.country').select2({

    templateResult: formatState,
    templateSelection: formatState,
    minimumResultsForSearch: -1
  });
}

/**********/
// for css Input state management
function InputAddClassOnFocus() {
  $("form input, .form input, form textarea, .form textarea").each(function () {

    var userinput = $(this).val();

    if (userinput === ' ') {
      userinput = '';
    }

    if (userinput.length) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }

    $(this).change(function () {
      userinput = $(this).val();
      if (userinput.length) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    })
  });

}



/**********/
// Modal video controls
function modalVideo() {
  jQuery(".modal-video-trigger").click(function () {
    var targetModal = jQuery(this).attr("data-bs-target");
    jQuery(targetModal).find("video").get(0).play();
  })


  $(".modal-video video").click(function () {
    var video = $(this);
    var container = $(this).parent();

    $(container).toggleClass("click-paused");
    if ($(container).hasClass("click-paused")) {
      $(video).get(0).pause();
    } else {
      $(video).get(0).play();
    }
  });


  $(".modal-video").on('hide.bs.modal', function (e) {
    var video = $(this).find("video");
    var container = $(this).find(".modal-body");

    $(container).removeClass("click-paused");
    $(video).get(0).currentTime = 0;
    $(video).get(0).pause();
  });
}