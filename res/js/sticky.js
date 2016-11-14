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
                 top: 0,
                 left: 'autoload',
                 originalWidth:1280, // sticky item max-width setting, is responsive by default up to max-width
                 background: '#faf7f7', // sticky element background, transparent default
                 layer: 1000, // z-index layer
                 parentStyles: {}, // extend styles for the parent element
                 itemStyles: {}, // extend styles for the item element
                 childrenStyles: {} // extend styles for the children element(s)
             });
         });
         */
        if(this.html() === undefined){
            return;
        }
        var debugCSS ='color: orange; font-size: 14px;';
        var settings = $.extend({
            top: 0,
            left: 'autoload',
            background: 'transparent',
            originalWidth: 0,
            layer: 99,
            parentStyles: {},
            itemStyles: {},
            childrenStyles: {},
            debug: false
        }, options );

        var sticky = false;
        var item = this; // save the loaded item into a variable for later use in functions
        var itemTop = item.offset().top; // get the current position of the item on the page, so that it will only stick to the top from that point down.
        var itemWidth = item.outerWidth(); // get the width of the item on initial DOM loaded
        if(settings.originalWidth==0){ // if no original width was specified, set the default width to the item width loaded into DOM.
            settings.originalWidth = itemWidth;
        }
        var windowWidth = $(window).outerWidth(); // the current window width
        var curTop = $(window).scrollTop(); // the current scroll position of the page
        item.wrap('<div></div>');
        checkLeft();
        checkTop();
        loadScroll();
        $(window).scroll(function () {
            curTop = $(window).scrollTop(); // update the current scroll position of the page
            checkSizes();
            checkLeft();
            checkTop();
            loadScroll();
        });

        $(window).resize(function () {
            windowWidth = $(window).outerWidth(); // update the window width
            checkSizes();
            checkLeft();
            checkTop();
            loadScroll();
        });

        function checkTop(){
            if(!sticky) {
                itemTop = item.offset().top;
            }
        }

        function checkLeft(){
            if(settings.left=='autoload' || settings.left!=0){
                settings.left = item.offset().left;
            }
        }

        // checks the size of the container item to the size of the window
        function checkSizes() {
            if (windowWidth < settings.originalWidth) { //if window is smaller than the item original size set the current width to the window size ;else set to originalWidth
                itemWidth = windowWidth;
            } else {
                itemWidth = settings.originalWidth;
            }
        }

        function loadScroll() {
            var tp = parseInt(settings.top);
            if(settings.debug) {
                console.log('%cTo Lock at: '+(itemTop-tp)+', Current Top: '+curTop,debugCSS);
            }
            if ((itemTop-tp) < curTop) {
                sticky = true;
                item.css($.extend({
                    'background': settings.background,
                    'max-width': '100%',
                    'width':itemWidth,
                    'position': 'fixed',
                    'left': settings.left,
                    'top': settings.top,
                    'z-index': settings.layer
                },settings.itemStyles)).addClass('is-sticky');
                item.children().css($.extend({
                    'width': itemWidth,
                    'margin': 'auto'
                }, settings.childrenStyles));
                item.parent().css($.extend({'height':item.outerHeight(),'width':'100%'},settings.parentStyles));
            } else {
                sticky = false;
                item.parent().removeAttr('style');
                item.removeAttr('style').removeClass('is-sticky');
                item.children().removeAttr('style');
            }
        }
    }
}( jQuery ));