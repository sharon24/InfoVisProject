(function() {
	var app = angular.module('InfoVis', []);

	app.constant ('Constants', {
		State: [
        { Id: 0, ShortName: 'AL', FullName: 'Alabama' },
        { Id: 1, ShortName: 'AK', FullName: 'Alaska' },
        { Id: 2, ShortName: 'AZ', FullName: 'Arizona' },
        { Id: 3, ShortName: 'AR', FullName: 'Arkansas' },
        { Id: 4, ShortName: 'CA', FullName: 'California' },
        { Id: 5, ShortName: 'CO', FullName: 'Colorado' },
        { Id: 6, ShortName: 'CT', FullName: 'Connecticut' },
        { Id: 7, ShortName: 'DE', FullName: 'Delaware' },
        { Id: 8, ShortName: 'FL', FullName: 'Florida' },
        { Id: 9, ShortName: 'GA', FullName: 'Georgia' },
        { Id: 10, ShortName: 'HI', FullName: 'Hawaii' },
        { Id: 11, ShortName: 'ID', FullName: 'Idaho' },
        { Id: 12, ShortName: 'IL', FullName: 'Illinois' },
        { Id: 13, ShortName: 'IN', FullName: 'Indiana' },
        { Id: 14, ShortName: 'IA', FullName: 'Iowa' },
        { Id: 15, ShortName: 'KS', FullName: 'Kansas' },
        { Id: 16, ShortName: 'KY', FullName: 'Kentucky' },
        { Id: 17, ShortName: 'LA', FullName: 'Louisiana' },
        { Id: 18, ShortName: 'ME', FullName: 'Maine' },
        { Id: 19, ShortName: 'MD', FullName: 'Maryland' },
        { Id: 20, ShortName: 'MA', FullName: 'Massachusetts' },
        { Id: 21, ShortName: 'MI', FullName: 'Michigan' },
        { Id: 22, ShortName: 'MN', FullName: 'Minnesota' },
        { Id: 23, ShortName: 'MS', FullName: 'Mississippi' },
        { Id: 24, ShortName: 'MO', FullName: 'Missouri' },
        { Id: 25, ShortName: 'MT', FullName: 'Montana' },
        { Id: 26, ShortName: 'NE', FullName: 'Nebraska' },
        { Id: 27, ShortName: 'NV', FullName: 'Nevada' },
        { Id: 28, ShortName: 'NH', FullName: 'New Hampshire' },
        { Id: 29, ShortName: 'NJ', FullName: 'New Jersey' },
        { Id: 30, ShortName: 'NM', FullName: 'New Mexico' },
        { Id: 31, ShortName: 'NY', FullName: 'New York' },
        { Id: 32, ShortName: 'NC', FullName: 'North Carolina' },
        { Id: 33, ShortName: 'ND', FullName: 'North Dakota' },
        { Id: 34, ShortName: 'OH', FullName: 'Ohio' },
        { Id: 35, ShortName: 'OK', FullName: 'Oklahoma' },
        { Id: 36, ShortName: 'OR', FullName: 'Oregon' },
        { Id: 37, ShortName: 'PA', FullName: 'Pennsylvania' },
        { Id: 38, ShortName: 'RI', FullName: 'Rhode Island' },
        { Id: 39, ShortName: 'SC', FullName: 'South Carolina' },
        { Id: 40, ShortName: 'SD', FullName: 'South Dakota' },
        { Id: 41, ShortName: 'TN', FullName: 'Tennessee' },
        { Id: 42, ShortName: 'TX', FullName: 'Texas' },
        { Id: 43, ShortName: 'UT', FullName: 'Utah' },
        { Id: 44, ShortName: 'VT', FullName: 'Vermont' },
        { Id: 45, ShortName: 'VA', FullName: 'Virginia' },
        { Id: 46, ShortName: 'WA', FullName: 'Washington' },
        { Id: 47, ShortName: 'WV', FullName: 'West Virginia' },
        { Id: 48, ShortName: 'WI', FullName: 'Wisconsin' },
        { Id: 49, ShortName: 'WY', FullName: 'Wyoming' },
        { Id: 50, ShortName: 'DC', FullName: 'District of Columbia' },
        { Id: 51, ShortName: 'PR', FullName: 'Puerto Rico' }
    	]
	});

	app.controller('MainController',['$scope','$window','$http','Constants',function($scope,$window,$http,Constants) {
		var polarity,max;
		var min;
		const numberOfRanges = 3;
		var range;
		var polaritySumArr = [];
		var polarityCountArr = [];
		var polarityAvgArr = [];


		function initializeArray() {
			for (i = 0; i <= 51; i++) {
				polaritySumArr[i] = 0;
				polarityCountArr[i] = 0;
				polarityAvgArr[i] = 1;
			}
		}

		//calculate average polarity of each state
		function calcAvg() {
			var polaritySum;
			var polarityCount;

			for (i = 0; i<=51; i++) {
				polaritySum = polaritySumArr[i];
				polarityCount = polarityCountArr[i];
				if (polarityCount != 0) {
					polarityAvgArr[i] = polaritySum/polarityCount;
				}
			}
			console.log("calculated avgs");
		}

function callback () { 
	console.log('all done');
	printRanges();
 }
var itemsProcessed = 0;

		function getData() {

			var stateID;
			initializeArray();
			console.log("start getting data");
			for (j = 1; j <= 3; j++) {  //J<129

				$http.get('data/newsItemsparts/part' + j + '.json').success(function(data) {	

					if (typeof(min) =="undefined") {
						 min =data[0].polarity;
					}
					if (typeof(max) =="undefined") {
						 max =data[0].polarity;
					}
					for (i = 0; i < data.length; i++) {
						if (typeof(data[i]['georss:point']) != "undefined") {
							polarity = data[i].polarity;

							if (polarity < min) {
								min = polarity;
							}
							if (polarity > max) {
								max = polarity;
							}
							/*if (typeof(data[i]['georss:point'][0]) != "undefined") {
								console.log(data[i].title + "  polarity:",polarity + "  " + data[i]['georss:point'][0].content);
							} else {
								console.log(data[i].title + "  polarity:",polarity + "  " + data[i]['georss:point'].content);
							}*/

							if (data[i].contry == "US") {
								//alert(Constants);
								StateID = Constants.State.filter(function (items) { return items.ShortName === data[i].stateCode; })[0].Id;
								polaritySumArr[StateID] += polarity;
								polarityCountArr[StateID]++;
							}
						}
					}
					itemsProcessed++;
					    if(itemsProcessed === 3) {
     						callback();
    					}
				});
			}
			console.log("data recieved");

		}

		function printRanges () {

			calcAvg();			
			console.log("min=");
			console.log(min);
			console.log("  max=");
			console.log(max);
			console.log("\n");
			console.log(""+polaritySumArr[12]+" "+polarityCountArr[12]+" "+polarityAvgArr[12]+"");

			range = Math.abs(min)+Math.abs(max);

			for (i = 0; i < numberOfRanges; i++) {
				console.log("range ",i+1,":",min+i*range/numberOfRanges,"-",min+(i+1)*range/numberOfRanges,"\n");
			}
		}

		  getData();
  			
  	
	}]);
})();