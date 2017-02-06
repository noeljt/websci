// Cache feed for ease of use
var feed1 = $("#feed1");
var feed2 = $("#feed2");

// dictionary for user statistics
var topZones = {};

// Pull all data from JSON file
$.getJSON("TwitterTweets17.json", function(data){
	$.each(data,function(key,tweet){
		if (!(tweet.text==undefined)) {

			// Initialize post to hold strings
			var post = [];
			// Bootstrap grid start
			post.push("<li class='row'><div class='col-md-12'>");
			// User Image + default image if GET fails
			post.push("<div class='image'><img class='uimg' src='"+tweet.user.profile_image_url+"' onerror='this.onerror=null;this.src=&quot;default_avatar.png&quot;'></div>");
			// Text
			post.push("<div class='text'>"+tweet.text+"</div>");
			//Boostrap grid closing
			post.push("</div></li>");
			// Add post to feed
	    feed1.append($(post.join('')).hide());

	    // Add to dictionary or increment
	    topZones[tweet.user.time_zone] = (topZones[tweet.user.time_zone] || 0) + 1;

		} else {
			console.log("Post with no text");
		}
	});

	// Tweet animation
	var top = 1
	var bottom = 6;

	$("#feed1 li:lt(5)").show();

	function topOutBottomIn(){
		// Set a stopping point for when the tweets hit the bottom
		if (top+5==$("#feed1 .row").length) {clearInterval(intervalID);}
		// Two animations
		$("#feed1 li:nth-child("+top+")").slideUp("slow");
		$("#feed1 li:nth-child("+bottom+")").slideDown("slow");
		// Increment top and bottom
		top += 1;
		bottom += 1;
	}
	// Call every 3 seconds to follow assignment instructions
	var intervalID = setInterval(topOutBottomIn, 3000);

	// Second feed
	var sortedZones = sortDict(topZones);
	console.log(sortedZones);
	for (var i=0;i<sortedZones.length;i++) {
		var zone = [];
		zone.push("<li class='row'><div class='col-md-10'><h3>"+sortedZones[i][0]+"</h3></div>");
		zone.push("<div class='col-md-2'><h3>"+sortedZones[i][1]+"</h3></div></li>");
		// Add time zone to feed
    	feed2.append($(zone.join('')).hide());
	};

	$("#feed2 li:lt(3)").show();

	var top2 = 1;
	var bottom2 = 4;

	function shortTopOutBottomIn(){
		// Set a stopping point for when the tweets hit the bottom
		if (top+3==$("#feed2 .row").length) {clearInterval(intervalID2);}
		// Two animations
		$("#feed2 li:nth-child("+top2+")").slideUp("slow");
		$("#feed2 li:nth-child("+bottom2+")").slideDown("slow");
		// Increment top and bottom
		top2 += 1;
		bottom2 += 1;
	}
	// Call every 3 seconds to follow assignment instructions
	var intervalID2 = setInterval(shortTopOutBottomIn, 5000);

});

// adapted from answer at http://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
function sortDict(dict) {
	var items = Object.keys(dict).map(function(key) {
		// Workaround for null time zone, looks bad
		if (key=="null") {return ["Mystery", dict[key]];}
		return [key, dict[key]];
	});
	items.sort(function(first, second) {
		return second[1] - first[1];
	});

	return items;
}