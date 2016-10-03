(function( $ ) {
    $.fn.stickyItem = function (options) {
        /*
            This library is very simple and only does 1 task really
            @author: Schalk Keun
            @script: sticky-items
            @pre-req: jquery -> https://developers.google.com/speed/libraries/
            OR
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

            @implement method:
             $(document).ready(function(){
                 $('.sticky-element').stickyItem({
                     originalWidth:1280, // sticky item max-width setting, is responsive by default up to max-width
                     background: '#faf7f7', // sticky element background, transparent default
                     layer: 1000 // z-index layer
                 });
             });
         */
        var settings = $.extend({
            background: 'transparent',
            originalWidth: 0,
            layer: 99
        }, options );

        var item = this; // save the loaded item into a variable for later use in functions
        var itemTop = item.offset().top; // get the current position of the item on the page, so that it will only stick to the top from that point down.
        var itemWidth = item.outerWidth(); // get the width of the item on initial DOM loaded
        if(settings.originalWidth==0){ // if no original width was specified, set the default width to the item width loaded into DOM.
            settings.originalWidth = itemWidth;
        }
        var windowWidth = $(window).outerWidth(); // the current window width
        var curTop = $(window).scrollTop(); // the current scroll position of the page

        loadScroll();
        $(window).scroll(function () {
            curTop = $(window).scrollTop(); // update the current scroll position of the page
            checkSizes();
            loadScroll();
        });

        $(window).resize(function () {
            windowWidth = $(window).outerWidth(); // update the window width
            checkSizes();
            loadScroll();
        });

        // checks the size of the container item to the size of the window
        function checkSizes() {
            if (windowWidth < settings.originalWidth) { //if window is smaller than the item original size set the current width to the window size ;else set to originalWidth
                itemWidth = windowWidth;
            } else {
                itemWidth = settings.originalWidth;
            }
        }

        function loadScroll() {
            if (itemTop < curTop) {
                item.css({
                    'background': settings.background,
                    'max-width': '100%',
                    'width':'100%',
                    'position': 'fixed',
                    'left': 0,
                    'top': 0,
                    'z-index': settings.layer
                }).addClass('is-sticky');
                item.children().css({
                    'width': itemWidth,
                    'margin': 'auto'
                });
            } else {
                item.removeAttr('style').removeClass('is-sticky');
                item.children().removeAttr('style');
            }
        }
    }
}( jQuery ));