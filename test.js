function httpGet(theUrl)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();    
}
httpGet("https://en.wikipedia.org/wiki/List_of_IOC_country_codes");






// var req = new XMLHttpRequest();

// req.open('GET', 'proxy.php?url=https://en.wikipedia.org/wiki/List_of_IOC_country_codes', false);
// req.send(null);

// if(req.status == 200) {
//    alert(req.responseText);
// }



// fetch("https://en.wikipedia.org/wiki/List_of_IOC_country_codes")
// .then((result) => { return result.text(); })
// .then((content) => { document.getElementById("ID").innerHTML = content; });



// function getFlags() {
//   currPage = 1;
//   movie = $("#movie-title").val();
//   $.ajax({
//     url: "https://en.wikipedia.org/wiki/List_of_IOC_country_codes",
//     type: "GET",
//     success: (data) => {
//       console.log(data.results);
//     },
//   });
// }
// getFlags();