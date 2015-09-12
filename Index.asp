<%@ Language="VBScript" %>
  <%
dim trackingid
dim sessionid
sessionid = 1122334455
response.cookies("trid").Expires=date+365 
trackingid=HTMLDecode(request.cookies("trid"))
if trackingid="" then
   response.cookies("trid")=sessionid
   response.write("Welcome! This is the first time you are visiting this Web page." )
else
   a=Split(trim(HTMLDecode(request.cookies("trid"))),"|") 
   response.write("SessionID => " & a(0))
   if ubound(a) >=1  then
   response.write( "<br>TrackingId => "  & strfromcode(a(1)) & "<hr>")
   end if

end if
Function HTMLDecode(sText)
    Dim I
    sText = Replace(sText, "&quot;", Chr(34))
    sText = Replace(sText, "&lt;"  , Chr(60))
    sText = Replace(sText, "&gt;"  , Chr(62))
    sText = Replace(sText, "&amp;" , Chr(38))
    sText = Replace(sText, "&nbsp;", Chr(32))
    For I = 1 to 255
        sText = Replace(sText, "&#" & I & ";", Chr(I))
    Next
    HTMLDecode = sText
End Function
function strfromcode(mystr)
dim nstr
dim charArray
charArray = split(mystr,".")
for i = 0 to ubound(charArray)
    nstr = nstr + ChrW(charArray(i))
next
strfromcode = nstr
end function
%>
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="utf-8" />
      <title>Tests</title>
      <script src="js/jquery.min.js"></script>
      <script src="js/contactCollector.min.js"></script>
    </head>

    <body>
      <input type="text">
      <input type="text">
      <input type="text">
      <input type="text">
      <input type="checkbox">
      <input type="radio">
      <textarea id="email"></textarea>
      <textarea></textarea>
      <textarea></textarea>
      <textarea></textarea>
      <textarea></textarea>
      <script>
      $(document).ready(function() {
        var selectors = ['input[type="text"]', 'textarea'];
        var config = {
          Cookie_Expiry: '364',
          Cookie: 'trid'
        };
        c = $(document).collector(selectors, config);
      });
      </script>
    </body>

    </html>