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

	angular.module('selectedNumberOfClasses', [])
	app.controller('MainController',['$scope','$window','$http','Constants',function($scope,$window,$http,Constants) {
		var polarity,max,min;
		var polarity1,max1,min1;
		var polarity2,max2,min2;
		$scope.seed;
		$scope.colorPickedByUser = 0;
		$scope.runColorTest = false;
		$scope.numberOfRanges = 3;
		$scope.numberOfPresetsColor = 9;
		$scope.presetsColors = [{cBlindSupported:true,col1:[1,133,113],col2:[166,97,26]},{cBlindSupported:true,col1:[200,28,139],col2:[77,172,38]},{cBlindSupported:true,col1:[123,50,148],col2:[0,136,55]},
		{cBlindSupported:true,col1:[230,97,1],col2:[94,60,153]},{cBlindSupported:true,col1:[202,0,32],col2:[5,113,176]},{cBlindSupported:false,col1:[202,0,32],col2:[64,64,64]}
		,{cBlindSupported:true,col1:[215,25,28],col2:[44,123,182]} ,{cBlindSupported:false,col1:[215,25,28],col2:[26,150,65]}
		,{cBlindSupported:false,col1:[215,25,28],col2:[43,131,186]}];
		const minOpacity = 0.10;
		const maxOpacity = 0.50;
		var range;
		$scope.ranges = [];
		var ranges = []
		var polaritySumArr = [];
		var polarityCountArr = [];
		var polarityAvgArr = [];
		var range1PolaritySum = [];
		var range1PolarityCount = [];
		var range1PolarityAvg = [];
		var range2PolaritySum = [];
		var range2PolarityCount = [];
		var range2PolarityAvg = [];
		$scope.numberInEachRange = [];
		$scope.firstname = "John";
		var ColorScheme;
		var baseColor1 = [1,133,113];
		var baseColor2 = [166,97,26];
		var opacityRange;

		if (typeof(localStorage.srcString) === "undefined") {
			localStorage.srcString = "Barack Obama";			
		}
		$scope.subject = "Search term: " + localStorage.srcString;

		if ((typeof(localStorage.date1start) === "undefined") || (localStorage.date1start === "Invalid Date")) {
			localStorage.date1start = new Date("01/01/2016");
		}
		$scope.date1start = new Date(localStorage.date1start);
		if ((typeof(localStorage.date1end) === "undefined") || (localStorage.date1end === "Invalid Date")) {
			localStorage.date1end = new Date("03/31/2016");
		}
		$scope.date1end = new Date(localStorage.date1end);
		if ((typeof(localStorage.date2start) === "undefined") || (localStorage.date2start === "Invalid Date")) {
			localStorage.date2start = new Date("04/01/2016");
		}
		$scope.date2start = new Date(localStorage.date2start);
		if ((typeof(localStorage.date2end) === "undefined") || (localStorage.date2end === "Invalid Date")) {
			localStorage.date2end = new Date("08/28/2016");
		}
		$scope.date2end = new Date(localStorage.date2end);

		if (localStorage.addedNewColor === "true") {
			$scope.presetsColors.push({cBlindSupported:false,col1:[localStorage.R1,localStorage.G1,localStorage.B1],col2:[localStorage.R2,localStorage.G2,localStorage.B2]});
			$scope.numberOfPresetsColor = 10;
		}

		//
		$scope.legendPicked = function(index) { 
			sColors = all(".legened-item");
			if (sColors[index].className.includes("selected")) {
				sColors[index].className = "legened-item";
			} else {
				sColors[index].className = "legened-item selected";
			}
			var element = document.getElementById("keywordMap1");
			element.parentNode.removeChild(element);
			element = document.getElementById("map-container");
			element.innerHTML= "<div id=\"keywordMap1\" ></div>";
			DataMapInit();
		}

		//
		$scope.updateNumberOfClasses = function(selected) {
			$scope.numberOfRanges = Math.sqrt(selected);
			callback();
		}

		//
		$scope.colorCheckChange = function(status) {
			$scope.seed = Math.floor((Math.random() * 100) + 1); 
			$scope.runColorTest = status;

			var element = document.getElementById("keywordMap1");
			element.parentNode.removeChild(element);
			element = document.getElementById("map-container");
			element.innerHTML = "<div id=\"keywordMap1\" ></div>";
			DataMapInit();
		}

		// Change color by user picked color scheme
		$scope.colorPicked = function(index) {
			$scope.colorPickedByUser = index;

			sColorsLegend = all(".legened-item");
			for (i = 0; i < sColorsLegend.length; i++) {
				sColorsLegend[i].className = "legened-item";
			}

			var cIndex = index;
			for (var j = 0; j < $scope.numberOfRanges; j++) {
				for (var q = 0; q < $scope.numberOfRanges; q++) {
					var key ='c' + (j*$scope.numberOfRanges+q+1)
					ColorScheme[key] = "rgba(" + $scope.colorRanges[cIndex][j][q][0] + "," + $scope.colorRanges[cIndex][j][q][1]
						+ "," +	$scope.colorRanges[cIndex][j][q][2] + "," + $scope.colorRanges[cIndex][j][q][3] + ')';
				}
			}
		
			var element = document.getElementById("keywordMap1");
			element.parentNode.removeChild(element);
			element = document.getElementById("map-container");
			element.innerHTML = "<div id=\"keywordMap1\" ></div>";
			DataMapInit();
			element = document.getElementById("loader");
			if (element != null ) {
				element.parentNode.removeChild(element);
			}

			sColor=$(".colorPresetItem.selected");
			if (sColor != null) {
				if (sColor.className.includes("ng-hide")) {
					sColor.className = "colorPresetItem ng-hide";
				} else {
					sColor.className = "colorPresetItem";
				}
			}

			sColors = all(".colorPresetItem");
			sColors[index].className = "colorPresetItem selected";
		}

		// 
		function $(selector) {
			return document.querySelector(selector);
		}

		// 
		function all(selector) {
			return document.querySelectorAll(selector);
		}
		
		// Check search query
		function checkName(data,searchString) {
			if (searchString.trim().length == 0) {
				return true;
			}
			if (typeof(data['emm:entity']) != "undefined") {
				if (typeof(data['emm:entity'][0]) != "undefined") {	
					for (g = 0; g < data['emm:entity'].length; g++) {
						if (data['emm:entity'][g].name.toLowerCase() === searchString.toLowerCase()) {
							return true;	
						}
					}	 
				} else {
					if (data['emm:entity'].name.toLowerCase() === searchString.toLowerCase()) {
						return true;
					}
				}
			}
			if (typeof(data['nlp:entity']) != "undefined") {
				if (typeof(data['nlp:entity']["PERSON"]) != "undefined") {
					for (g = 0; g < data['nlp:entity']["PERSON"].length; g++) {
						if (data['nlp:entity']["PERSON"][g].toLowerCase() === searchString.toLowerCase()) {
							return true;
						}
					}
				}
			}
		}

		// Initializes the polarity arrays
		function initializeArray() {
			for (i = 0; i <= 51; i++) {
				polaritySumArr[i] = 0;
				polarityCountArr[i] = 0;
				polarityAvgArr[i] = 1;
			}
		}

		// Initializes the polarity arrays
		function InitializeRangeArray() {
			for (i = 0; i <= 51; i++) {
				range1PolaritySum[i] = 0;
				range1PolarityCount[i] = 0;
				range1PolarityAvg[i] = 0;
				range2PolaritySum[i] = 0;
				range2PolarityCount[i] = 0;
				range2PolarityAvg[i] = 0;
			}
		}

		// Calculate average polarity of each state
		function calcRangeAvg() {
			var polarity1Sum,polarity2Sum;
			var polarity1Count,polarity2Count;

			for (i = 0; i<=51; i++) {
				polarity1Sum = range1PolaritySum[i];
				polarity1Count = range1PolarityCount[i];
				polarity2Sum = range2PolaritySum[i];
				polarity2Count = range2PolarityCount[i];
				if (polarity1Count != 0) {
					range1PolarityAvg[i] = polarity1Sum/polarity1Count;
				}
				if (polarity2Count != 0) {
					range2PolarityAvg[i] = polarity2Sum/polarity2Count;
				}
				if (i == 0) {
					min1 = range1PolarityAvg[i];
					max1 = range1PolarityAvg[i];
					min2 = range2PolarityAvg[i];
					max2 = range2PolarityAvg[i];
				} else {
					if (range1PolarityAvg[i] < min1) {
						min1 = range1PolarityAvg[i];
					}
					if (range1PolarityAvg[i] > max1) {
						max1 = range1PolarityAvg[i];
					}
					if (range2PolarityAvg[i] < min2) {
						min2 = range2PolarityAvg[i];
					}
					if (range2PolarityAvg[i] > max2) {
						max2 = range2PolarityAvg[i];
					}
				}
			}
			console.log("calculated range avgs");
		}

		// Continue the running after stopping
		function callback () { 
			console.log('all done');
			printRanges();
			setColorScheme();
			countInEachRange();
			angular.element(document).ready(function() {
    			$scope.colorPicked(0);
			});
		}

		// 
		function countInEachRange() {
			for (i = 0; i < 16; i++) {
				$scope.numberInEachRange[i] = 0;
			}	
			for (i = 0; i <= 51; i++) {
				for (k = 0; k < $scope.numberOfRanges; k++) {
					for (j = 0; j < $scope.numberOfRanges; j++) {
						if ((range1PolarityAvg[i] <= ranges[j][1]) && (range2PolarityAvg[i] <= ranges[k][1])) {
							$scope.numberInEachRange[(k+j*$scope.numberOfRanges)]++;
							j = $scope.numberOfRanges;
							k = $scope.numberOfRanges;
						}
					}
				}
			}
		}

		var itemsProcessed = 0;

		// Get the data from the DB and filter by search query/dates
		function getData(srcString) {
			var stateID;
			var searchString = srcString;
			InitializeRangeArray();
			console.log("start getting data");
			for (j = 1; j <= 30; j++) {  //J<52
				$http.get('data/newsItemsparts/part' + j + '.json').success(function(data) {
					for (i = 0; i < data.length; i++) {
						polarity = data[i].polarity;
						if (checkName(data[i],searchString)) {
							var currDateStr = data[i]['dc:date'];
							var split1 = currDateStr.split("T");
							var split2 = split1[0].split("-");
							var currDate = new Date(split2[0],split2[1]-1,split2[2]);

							if ((currDate >= new Date(localStorage.date1start)) && (currDate <= new Date(localStorage.date1end))) {
								polarity1 = data[i].polarity;
								StateID = Constants.State.filter(function (items) { return items.ShortName === data[i].stateCode; })[0].Id;
								range1PolaritySum[StateID] += polarity1;
								range1PolarityCount[StateID]++;
							}

							if ((currDate >= new Date(localStorage.date2start)) && (currDate <= new Date(localStorage.date2end))) {
								polarity2 = data[i].polarity;
								StateID = Constants.State.filter(function (items) { return items.ShortName === data[i].stateCode; })[0].Id;
								range2PolaritySum[StateID] += polarity2;
								range2PolarityCount[StateID]++;
							}
						}
					}
					itemsProcessed++;
					if (itemsProcessed ===30) {
						callback();
					}
				});
			}
			console.log("data recieved");
		}

		// Filter by date ranges
		$scope.filterData = function() {
			console.log("filtering");
			var StateID;
			var range1startstr = document.getElementById("startdatepicker1").value;
			var range1start = range1startstr.split("/");
			var date1start = new Date(range1start[2],range1start[0]-1,range1start[1]);
			var range1endstr = document.getElementById("enddatepicker1").value;
			var range1end = range1endstr.split("/");
			var date1end = new Date(range1end[2],range1end[0]-1,range1end[1]);
			var range2startstr = document.getElementById("startdatepicker2").value;
			var range2start = range2startstr.split("/");
			var date2start = new Date(range2start[2],range2start[0]-1,range2start[1]);
			var range2endstr = document.getElementById("enddatepicker2").value;
			var range2end = range2endstr.split("/");
			var date2end = new Date(range2end[2],range2end[0]-1,range2end[1]);

			localStorage.date1start = new Date(date1start);
			localStorage.date2start = new Date(date2start);
			localStorage.date1end = new Date(date1end);
			localStorage.date2end = new Date(date2end);
			location.reload(); 
		}

		// Check ranges
		function printRanges() {
			calcRangeAvg();
			if (max1 >= max2) {
				max = max1;
			} else {
				max = max2;
			}

			if (min1 >= min2) {
				min = min1;
			} else {
				min = min2;
			}
			console.log("min=");
			console.log(min);
			console.log("  max=");
			console.log(max);

			if (max >= 0 && min >= 0) {
				range = max-min;
			} else if (min < 0 && max >= 0)  {
				range = max-math.abs(min);
			} else if (min < 0 && max < 0) {
				range = math.abs(max)-math.abs(min);
			}

			var numOfRanges = $scope.numberOfRanges;
			for (i = 0; i < numOfRanges; i++) {
				ranges[i] = [];
				ranges[i][0] = min+i*range/numOfRanges;
				ranges[i][1] = min+(i+1)*range/numOfRanges;
				console.log("range " + (i+1) + ":" + ranges[i][0] + "-" + ranges[i][1]);

				$scope.ranges[i] = [];
				$scope.ranges[i][0] = (parseFloat(ranges[i][0])).toFixed(2);
				$scope.ranges[i][1] = (parseFloat(ranges[i][1])).toFixed(2);
			}
		}

		// Calculates the new color
		function calc2dOpacity (colorIndex,op1,op2) {
			var newOp = op1+(op2*(1-op1));
			var r = Math.round(($scope.presetsColors[colorIndex].col1[0]*op1+$scope.presetsColors[colorIndex].col2[0]*op2*(1-op1))/newOp);
			if (r > 255) {
				r = 255;
			}
			var b = Math.round(($scope.presetsColors[colorIndex].col1[1]*op1+$scope.presetsColors[colorIndex].col2[1]*op2*(1-op1))/newOp);
			if (b > 255) {
				b = 255;
			}
			var g = Math.round(($scope.presetsColors[colorIndex].col1[2]*op1+$scope.presetsColors[colorIndex].col2[2]*op2*(1-op1))/newOp);
			if (g >255) {
				g = 255;
			}
			return [r,b,g,newOp];
		}

		// Set a new color scheme
		function setColorScheme() {
			range = (maxOpacity-minOpacity)/($scope.numberOfRanges-1);
			var opacityRange = [];
			$scope.colorRanges = [];
			for (i = 0; i < $scope.numberOfRanges; i++) {
				opacityRange[i]=minOpacity+i*range;
			}
			for (var i = 0; i < $scope.numberOfPresetsColor; i++) {
				$scope.colorRanges[i] = [];
			}
			for (var i = 0; i < $scope.numberOfPresetsColor; i++) {
				for (var j = 0; j < $scope.numberOfRanges; j++) {
					$scope.colorRanges[i][j] = [];
				}
			}
			for (var i = 0;i<$scope.numberOfPresetsColor;i++) {
				for (var j = 0; j<$scope.numberOfRanges; j++) {
					for (var q = 0; q < $scope.numberOfRanges; q++) {
						$scope.colorRanges[i][j][q] = calc2dOpacity(i,opacityRange[j],opacityRange[q]);
					}

				}
			}

			ColorScheme ={
				c1:'',
				c2:'',
				c3:'',
				c4:'',
				c5:'',
				c6:'',
				c7:'',
				c8:'',
				c9:'',
				c10:'',
				c11:'',
				c12:'',
				c13:'',
				c14:'',
				c15:'',
				c16:'',
			};
			var cIndex = 0;
			for (var j = 0; j < $scope.numberOfRanges; j++) {
				for (var q = 0; q < $scope.numberOfRanges; q++) {
					var key = 'c' + (j*$scope.numberOfRanges+q+1)
					ColorScheme[key] = "rgba(" + $scope.colorRanges[cIndex][j][q][0] + "," + $scope.colorRanges[cIndex][j][q][1]
						+ "," +	$scope.colorRanges[cIndex][j][q][2] + "," + $scope.colorRanges[cIndex][j][q][3]+')';
				}
			}
		}

		// Initializes the defaulet site color schemes
		$scope.initDefaultColors = function() {
			sColor=$(".colorPresetItem");
			sColor.className="colorPresetItem selected";
		}
		
		// Filter the DB with the new search wuery
		$scope.executeQuery = function(person) {
			localStorage.srcString = person;
			location.reload(); 
		}

		function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
		function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
		function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
		function cutHex(h) {return (h.charAt(0) == "#") ? h.substring(1,7):h}

		// Add a new color scheme. also saved in local storage
		$scope.addNewColor = function(col1,col2) {
			R1 = hexToR(col1);
			G1 = hexToG(col1);
			B1 = hexToB(col1);

			R2 = hexToR(col2);
			G2 = hexToG(col2);
			B2 = hexToB(col2);

			localStorage.addedNewColor = true;
			localStorage.R1 = R1;
			localStorage.G1 = G1;
			localStorage.B1 = B1;
			localStorage.R2 = R2;
			localStorage.G2 = G2;
			localStorage.B2 = B2;
			location.reload();
		}

		// Set the color of a state
		function setColorByIndex(index) {
			sColors = all(".legened-item");
			isSelcted = $(".legened-item.selected");

			for (i = 0; i < $scope.numberOfRanges; i++) {
				for  (j = 0; j < $scope.numberOfRanges; j++) {
					if ($scope.runColorTest === true) {
						index = (($scope.seed + index) % ($scope.numberOfRanges*$scope.numberOfRanges))+1;
						if ((sColors[index-1].className.includes("selected")) || (isSelcted == null)) { 
							return ("c" + (index));
						} else {
							return ("black");
						}
					} else {
						if ((range1PolarityAvg[index] <= ranges[j][1]) && (range2PolarityAvg[index] <= ranges[i][1])) {
							if ((sColors[i+j*$scope.numberOfRanges].className.includes("selected")) || (isSelcted == null)) {
								return ("c" + (i+j*$scope.numberOfRanges+1));
							} else {
								return ("black");
							}
						}
					}
				}
			}
		}

		// Initiate the data map
		function DataMapInit () {
			var keywordMap1 = new Datamap({
				scope: 'usa',
				element: document.getElementById("keywordMap1"),
				geographyConfig: {
					highlightBorderColor: '#bada55',

					highlightFillColor: '#FC8D59',
					popupTemplate: function(geography, data) {
						return '<div class="hoverinfo" style="font-size10px;">' + geography.properties.name +'<br>' +' Electoral Votes:' +  data.electoralVotes + '<br>' +'Average polarity period1:' +data.average1+ 
						'<br>' +'Average polarity period2:' + data.average2 +
						'<br>' +'number of articles on range 1:' + data.count1 +
						'<br>' +'number of articles on range 2:' + data.count2 
					},
					highlightBorderWidth: 3,
				},
				fills: ColorScheme,
				data:{
					"AZ": {
						"fillKey": setColorByIndex(2),
						"electoralVotes": 11,
						"average1":range1PolarityAvg[2],
						"average2":range2PolarityAvg[2],
						"count1":range1PolarityCount[2],
						"count2":range2PolarityCount[2]
					},
					"CO": {
						"fillKey": setColorByIndex(5),
						"electoralVotes": 9,
						"average1":range1PolarityAvg[5],
						"average2":range2PolarityAvg[5],
						"count1":range1PolarityCount[5],
						"count2":range2PolarityCount[5]
					},
					"DE": {
						"fillKey": setColorByIndex(7),
						"electoralVotes": 3,
						"average1":range1PolarityAvg[7],
						"average2":range2PolarityAvg[7],
						"count1":range1PolarityCount[7],
						"count2":range2PolarityCount[7]
					},
					"FL": {
						"fillKey": setColorByIndex(8),
						"electoralVotes": 29,
						"average1":range1PolarityAvg[8],
						"average2":range2PolarityAvg[8],
						"count1":range1PolarityCount[8],
						"count2":range2PolarityCount[8]
					},
					"GA": {
						"fillKey": setColorByIndex(9),
						"electoralVotes": 16,
						"average1":range1PolarityAvg[9],
						"average2":range2PolarityAvg[9],
						"count1":range1PolarityCount[9],
						"count2":range2PolarityCount[9]
					},
					"HI": {
						"fillKey": setColorByIndex(10),
						"electoralVotes": 4,
						"average1":range1PolarityAvg[10],
						"average2":range2PolarityAvg[10],
						"count1":range1PolarityCount[10],
						"count2":range2PolarityCount[10]
					},
					"ID": {
						"fillKey": setColorByIndex(11),
						"electoralVotes": 4,
						"average1":range1PolarityAvg[11],
						"average2":range2PolarityAvg[11],
						"count1":range1PolarityCount[11],
						"count2":range2PolarityCount[11]
					},
					"IL": {
						"fillKey": setColorByIndex(12),
						"electoralVotes": 20, 
						"average1":range1PolarityAvg[12],
						"average2":range2PolarityAvg[12],
						"count1":range1PolarityCount[12],
						"count2":range2PolarityCount[12]
					},
					"IN": {
						"fillKey":setColorByIndex(13),
						"electoralVotes": 11,
						"average1":range1PolarityAvg[13],
						"average2":range2PolarityAvg[13],
						"count1":range1PolarityCount[13],
						"count2":range2PolarityCount[13]
					},
					"IA": {
						"fillKey": setColorByIndex(14),
						"electoralVotes": 6,
						"average1":range1PolarityAvg[14],
						"average2":range2PolarityAvg[14],
						"count1":range1PolarityCount[14],
						"count2":range2PolarityCount[14]
					},
					"KS": {
						"fillKey": setColorByIndex(15),
						"electoralVotes": 6,
						"average1":range1PolarityAvg[15],
						"average2":range2PolarityAvg[15],
						"count1":range1PolarityCount[15],
						"count2":range2PolarityCount[15]
					},
					"KY": {
						"fillKey": setColorByIndex(16),
						"electoralVotes": 8,
						"average1":range1PolarityAvg[16],
						"average2":range2PolarityAvg[16],
						"count1":range1PolarityCount[16],
						"count2":range2PolarityCount[16]
					},
					"LA": {
						"fillKey":setColorByIndex(17),
						"electoralVotes": 8,
						"average1":range1PolarityAvg[17],
						"average2":range2PolarityAvg[17],
						"count1":range1PolarityCount[17],
						"count2":range2PolarityCount[17]
					},
					"MD": {
						"fillKey": setColorByIndex(19),
						"electoralVotes": 10,
						"average1":range1PolarityAvg[19],
						"average2":range2PolarityAvg[19],
						"count1":range1PolarityCount[19],
						"count2":range2PolarityCount[19]
					},
					"ME": {
						"fillKey": setColorByIndex(18),
						"electoralVotes": 4,
						"average1":range1PolarityAvg[18],
						"average2":range2PolarityAvg[18],
						"count1":range1PolarityCount[18],
						"count2":range2PolarityCount[18]
					},
					"MA": {
						"fillKey": setColorByIndex(20),
						"electoralVotes": 11,
						"average1":range1PolarityAvg[20],
						"average2":range2PolarityAvg[20],
						"count1":range1PolarityCount[20],
						"count2":range2PolarityCount[20]
					},
					"MN": {
						"fillKey": setColorByIndex(22),
						"electoralVotes": 10,
						"average1":range1PolarityAvg[22],
						"average2":range2PolarityAvg[22],
						"count1":range1PolarityCount[22],
						"count2":range2PolarityCount[22]
					},
					"MI": {
						"fillKey":setColorByIndex(21),
						"electoralVotes": 16,
						"average1":range1PolarityAvg[21],
						"average2":range2PolarityAvg[21],
						"count1":range1PolarityCount[21],
						"count2":range2PolarityCount[21]
					},
					"MS": {
						"fillKey": setColorByIndex(23),
						"electoralVotes": 6,
						"average1":range1PolarityAvg[23],
						"average2":range2PolarityAvg[23],
						"count1":range1PolarityCount[23],
						"count2":range2PolarityCount[23]
					},
					"MO": {
						"fillKey": setColorByIndex(24),
						"electoralVotes": 10,
						"average1":range1PolarityAvg[24],
						"average2":range2PolarityAvg[24],
						"count1":range1PolarityCount[24],
						"count2":range2PolarityCount[24]
					},
					"MT": {
						"fillKey":setColorByIndex(25),
						"electoralVotes": 3,
						"average1":range1PolarityAvg[25],
						"average2":range2PolarityAvg[25],
						"count1":range1PolarityCount[25],
						"count2":range2PolarityCount[25]
					},
					"NC": {
						"fillKey": setColorByIndex(32),
						"electoralVotes": 15,
						"average1":range1PolarityAvg[32],
						"average2":range2PolarityAvg[32],
						"count1":range1PolarityCount[32],
						"count2":range2PolarityCount[32]
					},
					"NE": {
						"fillKey": setColorByIndex(26),
						"electoralVotes": 5,
						"average1":range1PolarityAvg[26],
						"average2":range2PolarityAvg[26],
						"count1":range1PolarityCount[26],
						"count2":range2PolarityCount[26]
					},
					"NV": {
						"fillKey": setColorByIndex(27),
						"electoralVotes": 6,
						"average1":range1PolarityAvg[27],
						"average2":range2PolarityAvg[27],
						"count1":range1PolarityCount[27],
						"count2":range2PolarityCount[27]
					},
					"NH": {
						"fillKey": setColorByIndex(28),
						"electoralVotes": 4,
						"average1":range1PolarityAvg[28],
						"average2":range2PolarityAvg[28],
						"count1":range1PolarityCount[28],
						"count2":range2PolarityCount[28]
					},
					"NJ": {
						"fillKey": setColorByIndex(29),
						"electoralVotes": 14,
						"average1":range1PolarityAvg[29],
						"average2":range2PolarityAvg[29],
						"count1":range1PolarityCount[29],
						"count2":range2PolarityCount[29]
					},
					"NY": {
						"fillKey": setColorByIndex(31),
						"electoralVotes": 29,
						"average1":range1PolarityAvg[31],
						"average2":range2PolarityAvg[31],
						"count1":range1PolarityCount[31],
						"count2":range2PolarityCount[31]
					},
					"ND": {
						"fillKey": setColorByIndex(33),
						"electoralVotes": 3,
						"average1":range1PolarityAvg[33],
						"average2":range2PolarityAvg[33],
						"count1":range1PolarityCount[33],
						"count2":range2PolarityCount[33]
					},
					"NM": {
						"fillKey": setColorByIndex(30),
						"electoralVotes": 5,
						"average1":range1PolarityAvg[30],
						"average2":range2PolarityAvg[30],
						"count1":range1PolarityCount[30],
						"count2":range2PolarityCount[30]
					},
					"OH": {
						"fillKey":setColorByIndex(34),
						"electoralVotes": 18,
						"average1":range1PolarityAvg[34],
						"average2":range2PolarityAvg[34],
						"count1":range1PolarityCount[34],
						"count2":range2PolarityCount[34]
					},
					"OK": {
						"fillKey": setColorByIndex(35),
						"electoralVotes": 7,
						"average1":range1PolarityAvg[35],
						"average2":range2PolarityAvg[35],
						"count1":range1PolarityCount[35],
						"count2":range2PolarityCount[35]
					},
					"OR": {
						"fillKey":setColorByIndex(36),
						"electoralVotes": 7,
						"average1":range1PolarityAvg[36],
						"average2":range2PolarityAvg[36],
						"count1":range1PolarityCount[36],
						"count2":range2PolarityCount[36]
					},
					"PA": {
						"fillKey": setColorByIndex(37),
						"electoralVotes": 20,
						"average1":range1PolarityAvg[37],
						"average2":range2PolarityAvg[37],
						"count1":range1PolarityCount[37],
						"count2":range2PolarityCount[37]
					},
					"RI": {
						"fillKey": setColorByIndex(38),
						"electoralVotes": 4,
						"average1":range1PolarityAvg[38],
						"average2":range2PolarityAvg[38],
						"count1":range1PolarityCount[38],
						"count2":range2PolarityCount[38]
					},
					"SC": {
						"fillKey": setColorByIndex(39),
						"electoralVotes": 9,
						"average1":range1PolarityAvg[39],
						"average2":range2PolarityAvg[39],
						"count1":range1PolarityCount[39],
						"count2":range2PolarityCount[39]
					},
					"SD": {
						"fillKey": setColorByIndex(40),
						"electoralVotes": 3,
						"average1":range1PolarityAvg[40],
						"average2":range2PolarityAvg[40],
						"count1":range1PolarityCount[40],
						"count2":range2PolarityCount[40]
					},
					"TN": {
						"fillKey": setColorByIndex(41),
						"electoralVotes": 11,
						"average1":range1PolarityAvg[41],
						"average2":range2PolarityAvg[41],
						"count1":range1PolarityCount[41],
						"count2":range2PolarityCount[41]
					},
					"TX": {
						"fillKey": setColorByIndex(42),
						"electoralVotes": 38,
						"average1":range1PolarityAvg[42],
						"average2":range2PolarityAvg[42],
						"count1":range1PolarityCount[42],
						"count2":range2PolarityCount[42]
					},
					"UT": {
						"fillKey": setColorByIndex(43),
						"electoralVotes": 6,
						"average1":range1PolarityAvg[43],
						"average2":range2PolarityAvg[43],
						"count1":range1PolarityCount[43],
						"count2":range2PolarityCount[43]
					},
					"WI": {
						"fillKey": setColorByIndex(48),
						"electoralVotes": 10,
						"average1":range1PolarityAvg[48],
						"average2":range2PolarityAvg[48],
						"count1":range1PolarityCount[48],
						"count2":range2PolarityCount[48]
					},
					"VA": {
						"fillKey": setColorByIndex(45),
						"electoralVotes": 13,
						"average1":range1PolarityAvg[45],
						"average2":range2PolarityAvg[45],
						"count1":range1PolarityCount[45],
						"count2":range2PolarityCount[45]
					},
					"VT": {
						"fillKey": setColorByIndex(44),
						"electoralVotes": 3,
						"average1":range1PolarityAvg[44],
						"average2":range2PolarityAvg[44],
						"count1":range1PolarityCount[44],
						"count2":range2PolarityCount[44]
					},
					"WA": {
						"fillKey": setColorByIndex(46),
						"electoralVotes": 12,
						"average1":range1PolarityAvg[46],
						"average2":range2PolarityAvg[46],
						"count1":range1PolarityCount[46],
						"count2":range2PolarityCount[46]
					},
					"WV": {
						"fillKey": setColorByIndex(47),
						"electoralVotes": 5,
						"average1":range1PolarityAvg[47],
						"average2":range2PolarityAvg[47],
						"count1":range1PolarityCount[47],
						"count2":range2PolarityCount[47]
					},
					"WY": {
						"fillKey": setColorByIndex(49),
						"electoralVotes": 3,
						"average1":range1PolarityAvg[49],
						"average2":range2PolarityAvg[49],
						"count1":range1PolarityCount[49],
						"count2":range2PolarityCount[49]
					},
					"CA": {
						"fillKey": setColorByIndex(4),
						"electoralVotes": 55,
						"average1":range1PolarityAvg[4],
						"average2":range2PolarityAvg[4],
						"count1":range1PolarityCount[4],
						"count2":range2PolarityCount[4]
					},
					"CT": {
						"fillKey": setColorByIndex(6),
						"electoralVotes": 7,
						"average1":range1PolarityAvg[6],
						"average2":range2PolarityAvg[6],
						"count1":range1PolarityCount[6],
						"count2":range2PolarityCount[6]
					},
					"AK": {
						"fillKey": setColorByIndex(1),
						"electoralVotes": 3,
						"average1":range1PolarityAvg[1],
						"average2":range2PolarityAvg[1],
						"count1":range1PolarityCount[1],
						"count2":range2PolarityCount[1]
					},
					"AR": {
						"fillKey": setColorByIndex(3),
						"electoralVotes": 6,
						"average1":range1PolarityAvg[3],
						"average2":range2PolarityAvg[3],
						"count1":range1PolarityCount[3],
						"count2":range2PolarityCount[3]
					},
					"AL": {
						"fillKey": setColorByIndex(0),
						"electoralVotes": 9,
						"average1":range1PolarityAvg[0],
						"average2":range2PolarityAvg[0],
						"count1":range1PolarityCount[0],
						"count2":range2PolarityCount[0]
					},
					"DC": {
						"fillKey": setColorByIndex(50),
						"electoralVotes": 3,
						"average1":range1PolarityAvg[50],
						"average2":range2PolarityAvg[50],
						"count1":range1PolarityCount[50],
						"count2":range2PolarityCount[50]
					}
				}
			});
			keywordMap1.labels({"fontSize": 15});
		}

		getData(localStorage.srcString);

	}]);
})();