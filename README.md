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
 >**top:** default -> 0, how far from the top do you want the element (string in px or %)

 >**originalWidth:** this is the original width you want the item to fall to (it will not get bigger than this). Size in px or integer value, default: itemWidth
 
 >**background:** default -> transparent unless you specify a hashed color code eg. #ffffff for white
 
 >**layer:** default -> 99, the z-index for this layer when it becomes sticky
 
# How to use sticky-items
>**Basic Init:**

```
$('#sticky-item').stickyItem({
    top: '10px',
    left: 'autoload',
    background: '#ffffff', 
    originalWidth: 200,
    layer:100
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
        originalWidth: 200,
        layer:100
     });
});
```