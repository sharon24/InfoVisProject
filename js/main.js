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
	var polarity,max,min;
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
			DataMapInit();
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

							StateID = Constants.State.filter(function (items) { return items.ShortName === data[i].stateCode; })[0].Id;
							polaritySumArr[StateID] += polarity;
							polarityCountArr[StateID]++;
						}
					}
					itemsProcessed++;
					if (itemsProcessed === 3) {
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

function DataMapInit () {
	var keywordMap1 = new Datamap({
		scope: 'usa',
		element: document.getElementById("keywordMap1"),
		geographyConfig: {
			highlightBorderColor: '#bada55',

			highlightFillColor: '#FC8D59',
			popupTemplate: function(geography, data) {
				return '<div class="hoverinfo" style="font-size:40px;">' +geography.properties.name  +'<br>' +' Electoral Votes:' +  data.electoralVotes + '<br>' +'Average polarity:' +data.average
			},
			highlightBorderWidth: 3,
		},
//http://api.geonames.org/countrySubdivision?lat=28.6535391673714&lng=-82.4751710549983&username=demo
fills: {
	Positive1to20: '#80ff80',
	Positive21to40: '#33ff33',
	Positive41to60: '#00e600',
	Positive61to80: '#008000',
	Positive81to100 :"#003300",
	Ambivalent:"#ffffff",
	negative1to20: '#ffcccc',
	negative21to40: '#ff6666',
	negative41to60: '#ff0000',
	negative61to80: '#990000',
	negative81to100 :"#330000",

},
data:{
	"AZ": {
		"fillKey": "Positive1to20",
		"electoralVotes": 11,
		"average":polarityAvgArr[2]
	},
	"CO": {
		"fillKey": "Positive21to40",
		"electoralVotes": 9,
		"average":polarityAvgArr[5]
	},
	"DE": {
		"fillKey": "negative1to20",
		"electoralVotes": 3,
		"average":polarityAvgArr[7]
	},
	"FL": {
		"fillKey": "Ambivalent",
		"electoralVotes": 29,
		"average":polarityAvgArr[8]
	},
	"GA": {
		"fillKey": "Ambivalent",
		"electoralVotes": 16,
		"average":polarityAvgArr[9]
	},
	"HI": {
		"fillKey": "negative81to100",
		"electoralVotes": 4,
		"average":polarityAvgArr[10]
	},
	"ID": {
		"fillKey": "negative81to100",
		"electoralVotes": 4,
		"average":polarityAvgArr[11]
	},
	"IL": {
		"fillKey": "Positive21to40",
		"electoralVotes": 20,
		"average":polarityAvgArr[12]
	},
	"IN": {
		"fillKey": "Positive81to100",
		"electoralVotes": 11,
		"average":polarityAvgArr[13]
	},
	"IA": {
		"fillKey": "Positive81to100",
		"electoralVotes": 6,
		"average":polarityAvgArr[14]
	},
	"KS": {
		"fillKey": "Positive21to40",
		"electoralVotes": 6,
		"average":polarityAvgArr[15]
	},
	"KY": {
		"fillKey": "Ambivalent",
		"electoralVotes": 8,
		"average":polarityAvgArr[16]
	},
	"LA": {
		"fillKey": "negative81to100",
		"electoralVotes": 8,
		"average":polarityAvgArr[17]
	},
	"MD": {
		"fillKey": "negative81to100",
		"electoralVotes": 10,
		"average":polarityAvgArr[19]
	},
	"ME": {
		"fillKey": "negative81to100",
		"electoralVotes": 4,
		"average":polarityAvgArr[18]
	},
	"MA": {
		"fillKey": "negative41to60",
		"electoralVotes": 11,
		"average":polarityAvgArr[20]
	},
	"MN": {
		"fillKey": "negative41to60",
		"electoralVotes": 10,
		"average":polarityAvgArr[22]
	},
	"MI": {
		"fillKey": "negative41to60",
		"electoralVotes": 16,
		"average":polarityAvgArr[21]
	},
	"MS": {
		"fillKey": "negative41to60",
		"electoralVotes": 6,
		"average":polarityAvgArr[23]
	},
	"MO": {
		"fillKey": "negative41to60",
		"electoralVotes": 10,
		"average":polarityAvgArr[24]
	},
	"MT": {
		"fillKey": "Positive61to80",
		"electoralVotes": 3,
		"average":polarityAvgArr[25]
	},
	"NC": {
		"fillKey": "Positive61to80",
		"electoralVotes": 15,
		"average":polarityAvgArr[32]
	},
	"NE": {
		"fillKey": "Positive61to80",
		"electoralVotes": 5,
		"average":polarityAvgArr[26]
	},
	"NV": {
		"fillKey": "negative21to40",
		"electoralVotes": 6,
		"average":polarityAvgArr[27]
	},
	"NH": {
		"fillKey": "negative21to40",
		"electoralVotes": 4,
		"average":polarityAvgArr[28]
	},
	"NJ": {
		"fillKey": "negative21to40",
		"electoralVotes": 14,
		"average":polarityAvgArr[29]
	},
	"NY": {
		"fillKey": "negative21to40",
		"electoralVotes": 29,
		"average":polarityAvgArr[31]
	},
	"ND": {
		"fillKey": "Ambivalent",
		"electoralVotes": 3,
		"average":polarityAvgArr[33]
	},
	"NM": {
		"fillKey": "Ambivalent",
		"electoralVotes": 5,
		"average":polarityAvgArr[30]
	},
	"OH": {
		"fillKey": "Ambivalent",
		"electoralVotes": 18,
		"average":polarityAvgArr[34]
	},
	"OK": {
		"fillKey": "Ambivalent",
		"electoralVotes": 7,
		"average":polarityAvgArr[35]
	},
	"OR": {
		"fillKey": "negative1to20",
		"electoralVotes": 7,
		"average":polarityAvgArr[36]
	},
	"PA": {
		"fillKey": "negative1to20",
		"electoralVotes": 20,
		"average":polarityAvgArr[37]
	},
	"RI": {
		"fillKey": "negative1to20",
		"electoralVotes": 4,
		"average":polarityAvgArr[38]
	},
	"SC": {
		"fillKey": "negative1to20",
		"electoralVotes": 9,
		"average":polarityAvgArr[39]
	},
	"SD": {
		"fillKey": "Positive41to60",
		"electoralVotes": 3,
		"average":polarityAvgArr[40]
	},
	"TN": {
		"fillKey": "Positive41to60",
		"electoralVotes": 11,
		"average":polarityAvgArr[41]
	},
	"TX": {
		"fillKey": "Positive41to60",
		"electoralVotes": 38,
		"average":polarityAvgArr[42]
	},
	"UT": {
		"fillKey": "Positive41to60",
		"electoralVotes": 6,
		"average":polarityAvgArr[43]
	},
	"WI": {
		"fillKey": "Positive1to20",
		"electoralVotes": 10,
		"average":polarityAvgArr[48]
	},
	"VA": {
		"fillKey": "Positive1to20",
		"electoralVotes": 13,
		"average":polarityAvgArr[45]
	},
	"VT": {
		"fillKey": "Positive1to20",
		"electoralVotes": 3,
		"average":polarityAvgArr[44]
	},
	"WA": {
		"fillKey": "Positive1to20",
		"electoralVotes": 12,
		"average":polarityAvgArr[46]
	},
	"WV": {
		"fillKey": "Positive1to20",
		"electoralVotes": 5,
		"average":polarityAvgArr[47]
	},
	"WY": {
		"fillKey": "Positive1to20",
		"electoralVotes": 3,
		"average":polarityAvgArr[49]
	},
	"CA": {
		"fillKey": "Positive1to20",
		"electoralVotes": 55,
		"average":polarityAvgArr[4]
	},
	"CT": {
		"fillKey": "Positive61to80",
		"electoralVotes": 7,
		"average":polarityAvgArr[6]
	},
	"AK": {
		"fillKey": "Positive61to80",
		"electoralVotes": 3,
		"average":polarityAvgArr[1]
	},
	"AR": {
		"fillKey": "Positive61to80",
		"electoralVotes": 6,
		"average":polarityAvgArr[3]
	},
	"AL": {
		"fillKey": "Positive61to80",
		"electoralVotes": 9,
		"average":polarityAvgArr[0]
	},
	"DC": {
		"fillKey": "Positive61to80",
		"electoralVotes": 3,
		"average":polarityAvgArr[50]
	}
}
});
keywordMap1.labels({"fontSize": 15});
}



getData();


}]);
})();