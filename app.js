$("#submit").on("click", function(e) {

    e.preventDefault();

	var num = $("#num-recs").val();

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var webURLString = "";

    var searchTerm = $("#search-term").val();
    var beginDate = $("#begin-date").val();
    var endDate = $("#end-date").val();

    if(!beginDate) {
        beginDate = "20170101";
    }

    if(!endDate) {
        endDate = "20171231";
    }
	
    url += '?' + $.param({
	  'api-key': "4bce339f20814296bc35821befa93d46",
	  'q': searchTerm,
	  'begin_date': beginDate,
	  'end_date': endDate
    });

	$.ajax({

	  url: url,
	  method: 'GET',

	})

    .done(function(result) {

	  console.log(result);
	  console.log(result.response.docs[0]);
	  if (result.response.docs.length < num) {
		  num = result.response.docs.length;
	  }
	  
	  for (var i = 0; i < num; i++) {
          $("#responses").append("<div id = 'article" + i + "'> </div>");
          $("#article" + i).attr("class", "article");
          $("#article" + i).append("<p class=\"headline-main\">" + result.response.docs[i].headline.main + "</p>");

          webURLString = ""
          $("#article" + i).append("<p class=\"byline\">" + result.response.docs[i].byline.original + "</p>");
          $("#article" + i).append("<p class=\"pub-date\">" + result.response.docs[i].pub_date + "</p>");
          $("#article" + i).append("<p class=\"web-url\"><a href=\"" + result.response.docs[i].web_url + "\"></p>" +
                                                                    result.response.docs[i].web_url + "</a>");
      }

	}).fail(function(err) {
	  throw err;
	});
});

$("#clear").on("click", function() {
    $("#responses").empty();

});