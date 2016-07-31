(function() {
	var app = angular.module('InfoVis', []);
	app.controller('MainController',['$scope', '$window','$http', function($scope, $window,$http){
		var polarity,max,min;
		const numberOfRanges=3;
		var range;
		function getData() {
for (j = 1; j < 4; j++) {  //J<129
	$http.get('data/newsItemsparts/part'+j+'.json').success(function(data) {
		if (j==1) {
			max=min=data[0].polarity;
		}

		for (i = 0; i < data.length; i++) {
			if (typeof (data[i]['georss:point']) != "undefined") {
				polarity=data[i].polarity;

				if (polarity<min) {
					min=polarity;
				}
				if (polarity>max) {
					max=polarity;
				}
				if (typeof(data[i]['georss:point'][0]) != "undefined") {
					console.log(data[i].title +"  polarity:",polarity+"  "+data[i]['georss:point'][0].content);
				} else {
					console.log(data[i].title +"  polarity:",polarity+"  "+data[i]['georss:point'].content);
				}


			}
		}
	});
}





}
$.when(getData(),printRanges()).done(function(a1,  a2) {
	alert("asas");
});
//getData();
 //   printRanges();




function printRanges () {
	console.log("min=");
	console.log(min);
	console.log("  max=");
	console.log(max);
	console.log("\n");

	range=Math.abs(min)+Math.abs(max);


	for (i = 0; i < numberOfRanges; i++) {
		console.log("range ",i+1,":",min+i*range/numberOfRanges,"-",min+(i+1)*range/numberOfRanges,"\n");
	}
}


}]);

})();