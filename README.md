# Sticky-items
Jquery plugin to make an html element sticky from a point on the page when scrolling down.

# API
 **originalWidth:** this is the original width you want the item to fall to (it will not get bigger than this). Size in px or integer value, default: itemWidth
 
 **background:** default -> transparent unless you specify a hashed color code eg. #ffffff for white
 
 **layer:** default -> 99, the z-index for this layer when it becomes sticky
 
 # Help
 
 You can send an email to **emoceb3@gmail.com** with _subject_ **sticky-help** if you need any help or if you got any suggestions or bug reports.
 
# How to use sticky-items
**Basic Init:**

`$('#sticky-item').stickyItem({
    background: '#ffffff', originalWidth: 200,layer:100
 });`
 
 **Default HTML Markup:**
 
 &lt;div id="sticky-item"&gt;&lt;div&gt;
 &lt;!-- YOUR HTML STUFF TO STICKY HERE --&gt;
 &lt;/div&gt;&lt;/div&gt;
 
 **Best Practice:**
 
 Remember to wrap your call in a **DOM Ready** event.
 
 huh, wtf you talking about?
 
 **THIS:**
 
 `$(document).ready(function(){/*sticky code here*/});`