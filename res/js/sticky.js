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
                 margin: 0,
                 customClass: 'is-sticky',
                 originalWidth:'autoload', // sticky item max-width setting, is responsive by default up to max-width
                 background: '#faf7f7', // sticky element background, transparent default
                 stopAt: false, // hide the element when it reaches this position.
                 layer: 1000, // z-index layer
                 parentStyles: {}, // extend styles for the parent element
                 itemStyles: {}, // extend styles for the item element
                 childrenStyles: {}, // extend styles for the children element(s)
                 responsive: true, // enabled by default, set to false to disable responsive calculation
                 addWrapper: false, // add a class name for the wrapper
                 debug: false
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
            margin: 0,
            customClass: 'is-stick',
            background: 'transparent',
            stopAt: false,
            originalWidth: 'autoload',
            layer: 99,
            parentStyles: {},
            itemStyles: {},
            childrenStyles: {},
            addWrapper: false,
            responsive: true,
            debug: false
        }, options );
        var initialTop = settings.top;
        var lastCalculated = 0;
        calculateTop();
        var sticky = false;
        var stickyAt = 0;
        var visible = true;
        var item = this; // save the loaded item into a variable for later use in functions
        var itemTop = item.offset().top; // get the current position of the item on the page, so that it will only stick to the top from that point down.
        var itemWidth = item.outerWidth(); // get the width of the item on initial DOM loaded
        var windowWidth = $(window).outerWidth(); // the current window width
        var curTop = $(window).scrollTop(); // the current scroll position of the page
        if(settings.addWrapper){
            item.wrap('<div class="sticky-parent"><div class="'+settings.addWrapper+'"></div></div>');
        }else {
            item.wrap('<div class="sticky-parent"></div>');
        }
        checkLeft();
        checkTop();
        loadScroll();
        var flips = 0;
        var interval = setInterval(function(){
            sticky = false;
            stickyAt = 0;

            if(settings.parentStyles!=false) {
                item.parent().removeAttr('style');
            }
            item.removeAttr('style').removeClass(settings.customClass);
            if(settings.childrenStyles!=false) {
                item.children().removeAttr('style');
            }

            calculateTop();
            flips ++;
            if(flips>=10){
                clearInterval(interval);
            }
        },250);
        $(window).scroll(function () {
            curTop = $(window).scrollTop(); // update the current scroll position of the page
            calculateTop();
            checkSizes();
            checkLeft();
            checkTop();
            loadScroll();
        });

        $(window).resize(function () {
            windowWidth = $(window).outerWidth(); // update the window width
            recalculatePosition();
            checkSizes();
            checkLeft();
            checkTop();
            loadScroll();
        });

        function calculateTop(){
            calculatedItems = 0;
            if(typeof initialTop == 'string'){
                if(initialTop.indexOf(',') !== -1){
                    settings.top = 0;
                    var items = initialTop.split(',');
                    for(var itm in items) {
                        if($(items[itm]).html()!='undefined') {
                            settings.top += $(items[itm]).outerHeight();
                        }
                    }
                }else {
                    settings.top = $(initialTop).outerHeight();
                }
            }
        }

        function recalculatePosition(){
            if(!settings.responsive){return false;}
            calculateTop();
            curTop = $(window).scrollTop();

            settings.left = 'autoload';
            settings.originalWidth = 'autoload';

            sticky = false;
            if(settings.addWrapper) {
                item.parent().parent().removeAttr('style').removeClass(settings.customClass);
            }
            item.parent().removeAttr('style').removeClass(settings.customClass);
            item.removeAttr('style').removeClass('is-sticky');
            item.children().removeAttr('style');

            itemTop = item.offset().top;
            itemWidth = item.outerWidth();
            windowWidth = $(window).outerWidth();
            loadScroll();
        }

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
            if (settings.originalWidth == 'autoload' || settings.originalWidth==0) {
                itemWidth = item.outerWidth();
                settings.originalWidth = itemWidth;
            } else if(windowWidth < settings.originalWidth){ //if window is smaller than the item original size set the current width to the window size ;else set to originalWidth
                itemWidth = windowWidth;
            } else {
                itemWidth = settings.originalWidth;
            }
        }

        function loadScroll() {
            var tp = parseInt(settings.top) + parseInt(settings.margin);
            var lockAt = parseInt(itemTop-tp);
            if(settings.debug) {
                // console.log('%cItem Width: '+itemWidth+', Original Width: '+settings.originalWidth,debugCSS);
                console.log('%cTo Lock at: '+lockAt+ ', Current Top: '+curTop+ ', Item Top: '+itemTop+(sticky?' (locked)':' (not locked)'),debugCSS);
            }
            if(settings.stopAt!=false && curTop>=settings.stopAt && visible){
                item.parent().animate({'opacity':0},200);
                visible = false;
            }else if(!visible && curTop<settings.stopAt && settings.stopAt!=false){
                item.parent().animate({'opacity':1},200);
                visible = true;
            }
            if(lockAt!=lastCalculated){
                sticky = false;
                stickyAt = 0;
            }

            if (!sticky && stickyAt==0) {
                lastCalculated = lockAt;
                sticky = true;
                stickyAt = lockAt;
                item.css($.extend({
                    'background': settings.background,
                    'max-width': '100%',
                    'width': itemWidth,
                    'position': 'fixed',
                    'left': settings.left,
                    'top': settings.top + settings.margin,
                    'z-index': settings.layer
                }, settings.itemStyles)).addClass(settings.customClass);
                if(settings.childrenStyles!=false) {
                    item.children().css($.extend({
                        'width': itemWidth,
                        'margin': 'auto'
                    }, settings.childrenStyles));
                }
                if(settings.parentStyles!=false) {
                    if(settings.addWrapper) {
                        item.parent().parent().css($.extend({
                            'height': item.outerHeight(),
                            'width': '100%'
                        }, settings.parentStyles)).addClass(settings.customClass);;
                        item.parent().css($.extend({
                            'height': item.outerHeight(),
                            'width':'100%',
                            'position': 'fixed',
                            'left': '0',
                            'top': settings.top + settings.margin,
                            'z-index': settings.layer
                        },{}));
                    }else {
                        item.parent().css($.extend({
                            'height': item.outerHeight(),
                            'width': '100%'
                        }, settings.parentStyles)).addClass(settings.customClass);;
                    }
                }
            }

            if ((lockAt > curTop || curTop==0) && sticky) {
                stickyAt = 0;
                sticky = false;
                if(settings.parentStyles!=false) {
                    if(settings.addWrapper) {
                        item.parent().parent().removeAttr('style').removeClass(settings.customClass);
                    }
                    item.parent().removeAttr('style').removeClass(settings.customClass);
                }
                item.removeAttr('style').removeClass(settings.customClass);
                if(settings.childrenStyles!=false) {
                    item.children().removeAttr('style');
                }
            }
        }
    }
}( jQuery ));