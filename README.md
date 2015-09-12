# contactCollector
Contact Collector is a cookie based people tracker wrapped in a jQuery plugin for easy implementation. Its currently a small 
side project im working on to reduce abandoned cart's on an e-commerce site. Basically Its is designed to update the server 
generated cookies with with any valid email address entered by the user on any page it is implemented on. 

Tracking the user input allows for a higher rate of cart recovery since It allows you to send a cart reminder email even when 
a user has not completed thier registration proccess.

##Settings
```javascript
//default values are shown below.

settings = {
      Cookie_Expiry: 365, //Cookie Expiry Date (Days)
      Cookie: 'cCollect', //Name of Cookie
      Always_Update: true,//Overwrite users cookie if they enter another email address
      Cookie_Path: '/',   //Path of Cookie
      Obscure_Info: true  //Coverts email address to CharCodes in an ip address like format to obsure them from plain site.
    };
```
