// Calculate time to graduation
var start 			= new Date(2014, 8-1, 25), // August 25, 2014
		today 			= new Date();
		graduation 	= new Date(2018, 5-1, 20), // May 20, 2018
		diff 				= 100 - ((graduation - today) / (graduation - start) * 100);
// Add percentage to title over progress bar
$("#grad_title").append(": " + Math.round(diff) + "%");
// Initialize progressbar for scroll reveal to work
$("#progressBar").progressbar({
  value: 1
});
// customize config to grow progressbar AFTER it appears
var config = {
	reset: false,
	afterReveal: function(el) {
    $("#progressBar > .ui-progressbar-value").animate({
        width: diff + "%"
    }, 'slow');
	}
};

console.log("start");
var data = new XMLHttpRequest();
data.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		loadData(this);
	}
}
data.open("GET", "resources/data.xml", true);
data.send();

function loadData(data) {
	var xmlDoc = data.responseXML;
	var xml = xmlDoc.documentElement.childNodes;
	var labs = xmlDoc.getElementsByTagName("lab");
	var hws = xmlDoc.getElementsByTagName("hw");
	var html_labs = [];
	var html_hws = [];
	for (i=0;i<labs.length;i++) {
		var name, desc, url;
		name = labs[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
		desc = labs[i].getElementsByTagName("desc")[0].childNodes[0].nodeValue;
		url = labs[i].getElementsByTagName("url")[0].childNodes[0].nodeValue;
		img = labs[i].getElementsByTagName("img")[0].childNodes[0].nodeValue;
		html_labs.push("<div class='col-md-6'><div class='portfolio-item'><a href='"+url+"'><img class='img-portfolio img-responsive' alt='" + name + "' src='" + img + "'></a><h3>"+desc+"</h3></div></div>");
	}
	for (i=0;i<hws.length;i++) {
		var name, desc, url;
		name = hws[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
		desc = hws[i].getElementsByTagName("desc")[0].childNodes[0].nodeValue;
		url = hws[i].getElementsByTagName("url")[0].childNodes[0].nodeValue;
		img = hws[i].getElementsByTagName("img")[0].childNodes[0].nodeValue;
		html_hws.push("<div class='col-md-6'><div class='portfolio-item'><a href='"+url+"'><img class='img-portfolio img-responsive' alt='" + name + "'' src='" + img + "'></a><h3>"+desc+"</h3></div></div>");
	}

	$("#labs").append(html_labs.join(""));
	$("#hws").append(html_hws.join(""));

// Initialize scroll reveal
window.sr = new ScrollReveal(config);
// Make progressbar value appear on viewport
sr.reveal("#progressBar > .ui-progressbar-value");
sr.reveal(".service-item");
sr.reveal(".portfolio-item");
}
