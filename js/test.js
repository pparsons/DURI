//when the page is ready
function IsDefined($Name) {
    return (window[$Name] != undefined);
}
//alert("From received html: " + l);
$(document).ready(function () {

    //results without clustering
    // var params = {
    // 	handler:"select",
    // 	query:"brca2",
    // 	core:"medline-citations",
    // 	searchFields:JSON.stringify(["catchall"]),
    // 	start:0,
    // 	rows:500,
    // 	years:JSON.stringify({min:1950, max:2016})
    // }

    //results with clustering
    var params = {
        handler: "clustering",
        query: "brca2",
        core: "medline-citations",
        searchFields: JSON.stringify(["catchall"]),
        start: 0,
        rows: 500,
        engine: 'lingo',
        years: JSON.stringify({min: 1950, max: 2016})
    }

    //ajax call. use the variable from above for the parameters
    $.ajax({
        url: "http://128.46.81.250/duri/api/search.php",
        method: "GET",
        data: params,
        cache: false
    })
        //once the ajax call is done
        .done(function (response) {
            var data = JSON.parse(response);
            var documents = data.response.docs;
            var clusters = data.clusters;

            function myTrim(x) {
                return x.replace(/^\s+|\s+$/gm,'');
            }
            function isAlpha(c) {
                return (((c >= 'a') && (c <= 'z')) || ((c >= 'A') && (c <= 'Z')));
            }


            //do something with the data here!

            /*
             labelSearch.html
             */
            //console.log(data);

            var dataArr = data;
            console.log(dataArr);
            document.write(dataArr["response"]["docs"][0]["genes"]);


            //console.log(clusters);



            /*
             end of labelSearch.html
             */


        });
});