/**
 * Created by paulparsons on 11/18/15.
 */


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
             param-received.html
             */
            console.log(data);

            var count = 0;


            var request = l;

            for (var i = 0; i < request.length; i++){
                if(!isAlpha(request.charAt(i))){
                    request[i] = " ";
                }
            }


            console.log("after " + request);
            request = request.toLowerCase();
            console.log("after2 " + request);

            var labels = [];

            for (var i = 0; i < clusters.length; i++) {
                var label = clusters[i]["labels"] + '';
                label = label.toLowerCase();

                //console.log(label);
                var str = label.split(" ");
                for (var j = 0; j < str.length; j++) {
                    if (request == str[j]) {
                        labels[count] = clusters[i]["labels"];
                        count++;
                    }

                }

            }

            document.write("The data set contains " + request + " " + count + " of " + clusters.length);
            document.write("<br><br><br><br><br><hr>");
            for (var i = 0; i < labels.length; i++) {
                document.write((i + 1) + ". " + "Label(s): " + labels[i]);
                document.write("<br><br><br><hr>");
            }


            /*
             end of param-received.html
             */


        });
});

