$("#submit").on("click", function(e) {

        e.preventDefault();

    	var num = 3// $(this).  val();
    	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";


        // var searchTerm = $(this). val();
        // var start-year = $(this). val();
        // var end-year = $(this). val();
    	
        url += '?' + $.param({
    	  'api-key': "4bce339f20814296bc35821befa93d46",
    	  'q': "hurricane",
    	  'begin_date': "20170823",
    	  'end_date': "20170825"
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
              $("#article" + i).append("<p>" + result.response.docs[i].headline.main + "</p>");

              $("#article" + i).append("<p>" + result.response.docs[i].byline.original + "</p>");
              $("#article" + i).append("<p>" + result.response.docs[i].pub_date + "</p>");
              $("#article" + i).append("<p>" + result.response.docs[i].web_url + "</p>");
          }

    	}).fail(function(err) {
    	  throw err;
    	});
    });