![Home Image](https://raw.githubusercontent.com/Ragers/sticky-items/master/res/img/sticky-items.jpg)

## What is this plugin for?
This is a jQuery plugin to make an html element sticky from a point on the page when scrolling down.


## Links
> * [ DEMO ](https://ragers.github.io/sticky-items/)

## Prerequisites
> * [jQuery - Hosted by Google](https://developers.google.com/speed/libraries/)

## Help
 
 You can send an email to **emoceb3@gmail.com** with _subject_ **sticky-help** if you need any help or if you got any suggestions or bug reports.
 
## API
 >**top:** default -> 0, how far from the top do you want the element (string in px or % OR you can specify an class or id of an element to autocalculate the top from that element)

 >**left:** default -> autoload, this is the left sticky position of the item (integer values only)
 
 >**originalWidth:** default -> autoload, this is the original width you want the item to fall to (it will not get bigger than this). default: itemWidth (integer values only)
 
 >**background:** default -> transparent unless you specify a hashed color code eg. #ffffff for white
 
 >**layer:** default -> 99, the z-index for this layer when it becomes sticky
 
 >**stopAt:** default -> false, set a value for the scroller to stop scrolling at. (integer values only)
 
 >**parentStyles:** default -> empty object. specify css styles to apply to the parent object at the time the item becomes sticky.
 
 >**itemStyles:** default empty object. specify  css styles to apply to the item when it becomes sticky
 
 >**childrenStyles:** default -> empty object. specify css styles to apply to the item children when the item becomes sticky
 
 >**responsive:** default -> true, set this to false if you want to disable the default responsive functionality
 
 >**debug:** default -> false, set to true if you want to see a log of information in the browser console
# How to use sticky-items
>**Basic Init:**

```
$('#sticky-item').stickyItem({
    top: '10px',
    left: 'autoload',
    background: '#ffffff', 
    stopAt: false, // default: false -> hide the element when it reaches this position.
    originalWidth: 'autoload',
    layer:100,
    parentStyles: {}, // extend styles for the parent element
    itemStyles: {}, // extend styles for the item element
    childrenStyles: {} // extend styles for the children element(s)
 });
 ```
 
 >**Default HTML Markup:**
 
 ```
 <div id="sticky-item">
    <!-- YOUR HTML STUFF TO STICKY HERE -->
 </div>
 ```
 
 >**Best Practice:**
 
 Remember to wrap your call in a **DOM Ready** event.
 
 huh, wtf you talking about?
 
 **THIS:**
 
 ```
 $(document).ready(function(){
    /*sticky code here*/
    $('#sticky-item').stickyItem({
        top: '10px',
        left: 'autoload',
        background: '#ffffff', 
        stopAt: false, // default: false -> hide the element when it reaches this position.
        originalWidth: 'autoload',
        layer:100,
        parentStyles: {}, // extend styles for the parent element
        itemStyles: {}, // extend styles for the item element
        childrenStyles: {} // extend styles for the children element(s)
     });
});
```