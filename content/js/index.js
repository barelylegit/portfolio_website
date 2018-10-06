$(document).ready(function() {
    // Changes the duration of the carousel before changing
    jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 1000  // 1 second

    // Controls the page scrolling on link clicks instead of instant page jumps
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
    
    // Controls the delay for the hexagons to come into view from left to right and top to bottom
    var delay = 0;
    $(".hex-wrapper").each(function(){
        $(this).css("animation-delay", delay + "s");
        delay += .2;
    })

    delay = 0;

    $(".hex-info").each(function(){
        $(this).css("animation-delay", delay + "s");
        delay += .2;
    })
    
    delay = 0;

    $(".hexagon").each(function(){
        $(this).css("animation-delay", delay + "s");
        delay += .1;
    })
    
    // Checks if an element is scrolled into view
    function isScrolledIntoView(elem) {
        // Dynamically determines the window size and determines the top and bottom of the current view
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        // Determines the element's position
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        // Returns true if the element has been scrolled into view
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    // Animations on scroll into view
    $(window).scroll(function() {
        $('.scroll-fadeIn').each(function() {
            if (isScrolledIntoView(this)) {
                $(this).addClass('fadeIn');
            }
        })

        $('.scroll-fadeInLeft').each(function() {
            if (isScrolledIntoView(this)) {
                $(this).addClass('fadeInLeft');
            }
        })

        $('.scroll-fadeInRight').each(function() {
            if (isScrolledIntoView(this)) {
                $(this).addClass('fadeInRight');
            }
        })

        $('.scroll-fadeInUp').each(function() {
            if (isScrolledIntoView(this)) {
                $(this).addClass('fadeInUp');
            }
        })

        $('.scroll-flipInY').each(function() {
            if (isScrolledIntoView(this)) {
                $(this).addClass('flipInY');
                $(this).css("opacity", 1); // flipIn won't overide opacity
            }
        })
    })
});