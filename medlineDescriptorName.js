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


            //do something with the data here!

            /*
             medlineDescriptor-received.html
             */
            console.log(data);


            var lowerCase = l.toLowerCase().trim();

            var count = 0;
            //var index = -1;
            //
            var papers = [ ];
            //var temp = documents[0]["medline_descriptor_name"] + ' ';
            //var names = temp.split(",");
            //console.log(names.length);
            //console.log("Request: " + l);
            //console.log(temp);
            //console.log("lowerCase: " + lowerCase);

            for (var k = 0; k < documents.length; k++) {
                var temp = documents[k]["medline_descriptor_name"] + ' ';
                var names = temp.split(",");

                for (var i = 0; i < names.length; i++) {
                    var elements = names[i] + ' ';
                    elements = elements.trim().split(" ");
                    //console.log("element: " + elements);
                    //console.log("elements.length: " + elements.length);
                    //console.log("elements[0]: " + elements[0]);
                    //console.log("elements[1]: " + elements[1]);

                    for (var j = 0; j < elements.length; j++) {
                        var tmp = elements[j];
                        tmp = tmp + ' ';
                        tmp = tmp.toLowerCase().trim();

                        //console.log("tmp: " + tmp);
                        if (tmp == lowerCase) {
                            console.log("tmp: " + tmp);
                            papers[count] = documents[i];
                            count++;

                        }
                    }

                }
            }

            //document.write("We found " + count + " papers which contain " + "\"" + l + "\"");
            document.write("Total: " + documents.length + "<br>");
            document.write("Search Keyword: " + l);
            document.write("<br><br><br><br><br><hr>");

            for (var i = 0; i < papers.length; i++) {
                document.write((i + 1) + ". " + "Article Title: " + papers[i]["medline_article_title"] + "<br>");
                document.write("   " + "Journal Title: " + papers[i]["medline_journal_title"] + "<br>");
                document.write("Genes: " + papers[i]["genes"].toString() + "<br>");
                document.write("Medline Descriptor Name: " + papers[i]["medline_descriptor_name"].toString());
                document.write("<br><br><br><hr>");
            }
            //document.write("Here is information about the paper");

            /*
             end of medlineDescriptor-received.html
             */


        });
});

