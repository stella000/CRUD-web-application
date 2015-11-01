$(function(){
	Parse.initialize("8zx2YsGjd9NRtLwwqbeJgsHzmfTXCeZEREYyLSTs", "7eouPSE2gwXS9F25Hnv51OdpJ5H4y7uMEPrGQqyw");

	var Review = Parse.Object.extend("review")

	var num = 0;
	var totalRating = 0;
	var useful = 0;
	var notUseful = 0;

	$('form').submit(function(e) {
		e.preventDefault();

		var review = new Review()

		var rating = $("#rating").raty('score')
		review.set("rating",parseInt(rating))

		var title = $("#title").val()
		review.set("title", title)
			/* this is the input within the form 
			var userReview = new Review();
			$(this).find("textarea").each(function() {
			userReview.set($(this).attr("id"), $(this).val())*/

		var comment = $("#comment").val()
		review.set("comment", comment)

		review.save(null, {
			success:getData
		});
		
		return false;

	});

	$("#rating").raty({
		rating: score
	});

	$("#score").raty({
		rating: totalRating,
		readOnly:true
	});

	var getData = function() {
	// Set up a new query for our Music class
		var query = new Parse.Query(Review)

			// Set a parameter for your query -- where the website property isn't missing
			/* Execute the query using ".find".  When successful:
			    - Pass the returned data into your buildList function
			*/
		query.find({
			success:function(results) {
				buildList(results)
			}
		})
	};

	// A function to build your list
	var buildList = function(data) {
		// Empty out your ordered list
		// Loop through your data, and pass each element to the addItem function
		data.forEach(function(d){
			totalRating = totalRating + d.get("rating");
			num++;
			addItem(d);
			$("#thumbUp").click(function() {
				useful++;
			})
			$("#thumbDown").click(function() {
				notUseful++;
			})
		})
	}

	var addItem = function(d) {
		var ave = $("#score").raty({
		readOnly:true,
		score: Number(totalRating) / Number(num),
		halfShow: true
		});
		var title = d.get("title")
		var comment = d.get("comment")
		var rating =  d.get("rating")
		var sum = useful + notUseful
		var list = $('<li>' + '<h4>' + title + '</h4>' + '<h5>'+ 'Rating: ' + rating +'</h5>' +'<p>' + comment + '</p>' + '</li>')
		var summary = $(useful + 'out of' + sum + 'think the review is useful')
		list.append(summary)
		$('#newList').append(list);
	};
});