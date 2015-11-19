/**
 * Created by paulparsons on 11/18/15.
 */

//when the page is ready
$(document).ready(function() {

	//results without clustering
	//var params = {
	//	handler:"select",
	//	query:"brca2",
	//	core:"medline-citations",
	//	searchFields:JSON.stringify(["catchall"]),
	//	start:0,
	//	rows:500,
	//	years:JSON.stringify({min:1950, max:2016})
	//}

	//results with clustering
	var params = {
		handler:"clustering",
		query:"brca2",
		core:"medline-citations",
		searchFields:JSON.stringify(["catchall"]),
		start:0,
		rows:500,
		engine:'lingo',
		years:JSON.stringify({min:1950, max:2016})
	}

		//ajax call. use the variable from above for the parameters
		$.ajax({
			url: "http://128.46.81.250/duri/api/search.php",
			method: "GET",
			data: params,
			cache: false
		})
			//once the ajax call is done
			.done(function(response) {
				var data = JSON.parse(response);
				var documents = data.response.docs;
				var clusters = data.clusters;

				//do something with the data here!
			});
});
