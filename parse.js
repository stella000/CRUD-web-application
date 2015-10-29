$(function(){
	Parse.initialize("8zx2YsGjd9NRtLwwqbeJgsHzmfTXCeZEREYyLSTs", "7eouPSE2gwXS9F25Hnv51OdpJ5H4y7uMEPrGQqyw");

	var Review = Parse.Object.extend("Review")

	$('form').submit(function() {

		var userReview = new Review();
		$('form').find("input").each(function() {
			userReview.set($(this).attr("id"), $(this).val())
			/* this is the input within the form */
		});

		userReview.save(null, {
			success:getData
		});

		var title = $("#title").val()
		var comment = $("#comment"}.val()
		var rating = $("#rating").val()

		instance.set("titleName", title)
		instance.set("commentName", comment)
		instance.set("ratingNum", rating)
		
	// After setting each property, save your new instance back to your database
	
		data.save();
		$("#titleName").val('')
		$("#commentName").val('')
		$("#ratingNum").val('')
		
		return false
	});

	$('#score').raty({
		half:true,
	});

	var getData = function() {
	

	// Set up a new query for our Music class
	var query = new Parse.Query(Review)

		// Set a parameter for your query -- where the website property isn't missing
	query.notEqualTo("commentName", "")
		/* Execute the query using ".find".  When successful:
		    - Pass the returned data into your buildList function
		*/
	query.find({
		success:function(results) {
			buildList(results)
		}
		success:buildList
	})
	}

	// A function to build your list
	var buildList = function(data) {
		// Empty out your ordered list
		$("ol").empty()
		
		// Loop through your data, and pass each element to the addItem function
		data.forEach(function(d){
			addItem(d);
		})
	}
});