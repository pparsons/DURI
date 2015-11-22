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

            console.log(data);

            //Array of papers at the specific year.
            var paper = [];

            /*
             pubyear-received.html
             */

            var pubCount = 0;
            for (var i = 0; i < documents.length; i++) {
                if (documents[i]["medline_pub_year"] == pub) {
                    //paper[pubCount] = documents[i]["medline_pub_year"];
                    paper[pubCount] = documents[i];
                    pubCount++;
                    //console.log(documents[i]["medline_pub_year"]);

                }
            }


            console.log(paper.length);

            document.write("There are  " + pubCount + " of papers at " + pub);
            document.write("<br>" + "Following is details of papers");
            document.write("<br><br><br><br><br><hr>");

            for (var i = 0; i < paper.length; i++) {
                document.write((i + 1) + ". " + "Article Title: " + paper[i]["medline_article_title"] + "<br>");
                document.write("   " + "Journal Title: " + paper[i]["medline_journal_title"] + "<br>");
                document.write("Genes: " + paper[i]["genes"].toString());
                document.write("<br><br><br><hr>");
            }
        });
});

