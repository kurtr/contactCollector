# contactCollector
Contact Collector is a cookie based people tracker wrapped in a jQuery plugin for easy implementation. Its currently a small 
side project im working on to reduce abandoned cart's on an e-commerce site. Basically Its is designed to update the server 
generated cookies with with any valid email address entered by the user on any page it is implemented on. 

Tracking the user input allows for a higher rate of cart recovery since It allows you to send a cart reminder email even when 
a user has not completed thier registration proccess.

##Prerequisites

* [jQuery](https://github.com/jquery/jquery)
* A server side language (If you want to add Session Id's to Cookies)

##Getting Started
Simply include jQuery and contactCollector.js in your html page and initialize the plugin.
```javascript
var selectors = [
 'input[type="text"]',
 'textarea'
];
var settings = {
  Cookie_Expiry: '364',
  Cookie: 'trid'
};

$(document).collector(selectors, settings);
```

##Settings (Object)
```javascript
//default values are shown below.

var settings = {
      Cookie_Expiry: 365, //Cookie Expiry Date (Days)
      Cookie: 'cCollect', //Name of Cookie to update
      Always_Update: true,//Overwrite users cookie if they enter another email address
      Cookie_Path: '/',   //Path of Cookie
      Obscure_Info: true  //Coverts email address to CharCodes in an ip address like format to obsure them from plain site.
    };
```

##Selectors (Array)
Contact Collector uses jQuery selectors without modification.
```javascript
var selectors = [
 ':input', //All input elements
 'input#email', //Input with id='email'
 'div.module-body input[name="register"]' //Input with name='register' in div with class='module-body'
];
```
