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
	$scope.numberOfRanges = 3;
	$scope.numberOfPresetsColor=6;
	$scope.presetsColors = [{col1:[1,133,113],col2:[166,97,26]},{col1:[200,28,139],col2:[77,172,38]},{col1:[123,50,148],col2:[0,136,55]},
	{col1:[230,97,1],col2:[94,60,153]},{col1:[202,0,32],col2:[5,113,176]},{col1:[202,0,32],col2:[64,64,64]}];
	const minOpacity=0.20;
	const maxOpacity=0.80;
	var range;
	var polaritySumArr = [];
	var polarityCountArr = [];
	var polarityAvgArr = [];
	var ColorScheme;

	var baseColor1=[1,133,113];
	var baseColor2=[166,97,26];
	var opacityRange;

	$scope.colorPicked= function(index) {
		sColor=$(".selected");
		sColor.className="colorPresetItem";
		sColors=all(".colorPresetItem");
        sColors[index].className="colorPresetItem selected";

   		var cIndex=index;
		for (var j=0; j<$scope.numberOfRanges; j++) {
			for (var q=0; q<$scope.numberOfRanges; q++) {
				var key ='c' +(j*$scope.numberOfRanges+q+1)
				ColorScheme[key]="rgba(" +$scope.colorRanges[cIndex][j][q][0] + "," +$scope.colorRanges[cIndex][j][q][1]
				+ "," +	$scope.colorRanges[cIndex][j][q][2] + "," +$scope.colorRanges[cIndex][j][q][3]+')';
			}
		}
		var element = document.getElementById("keywordMap1");
		element.parentNode.removeChild(element);
		element=document.getElementById("keywordMapParent");
		element.innerHTML= "<div id=\"keywordMap1\" style=\"position: relative; width: 90%; height: 600px;\"></div>";
		//keywordMap1
		DataMapInit();
	}

	function $(selector) {
    	return document.querySelector(selector);
	}

	function all(selector) {
    	return document.querySelectorAll(selector);
	}


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
			setColorScheme();
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

	for (i = 0; i < $scope.numberOfRanges; i++) {
		console.log("range ",i+1,":",min+i*range/$scope.numberOfRanges,"-",min+(i+1)*range/$scope.numberOfRanges,"\n");
	}
}


function calc2dOpacity (colorIndex,op1,op2) {
	var newOp=op1+(op2*(1-op1));
	var r=Math.round(($scope.presetsColors[colorIndex].col1[0]*op1+$scope.presetsColors[colorIndex].col2[0]*op2*(1-op1))/newOp);
	if (r>255) {
		r=255;
	}
	var b=Math.round(($scope.presetsColors[colorIndex].col1[1]*op1+$scope.presetsColors[colorIndex].col2[1]*op2*(1-op1))/newOp);
	if (b>255) {
		b=255;
	}

	var g=Math.round(($scope.presetsColors[colorIndex].col1[2]*op1+$scope.presetsColors[colorIndex].col2[2]*op2*(1-op1))/newOp);
	if (g>255) {
		g=255;
	}
	return [r,b,g,newOp];

}

function setColorScheme() {
	range = (maxOpacity-minOpacity)/($scope.numberOfRanges-1);
	var opacityRange =[];
	$scope.colorRanges=[];
	for (i = 0; i < $scope.numberOfRanges; i++) {
		opacityRange[i]=minOpacity+i*range;
	}

	
	for (var i=0;i<$scope.numberOfPresetsColor;i++){
		$scope.colorRanges[i]=[];
	}

	for (var i=0;i<$scope.numberOfPresetsColor;i++){
		for (var j=0; j<$scope.numberOfRanges; j++) {
		$scope.colorRanges[i][j]=[];
		}
	}
	for (var i=0;i<$scope.numberOfPresetsColor;i++){
		for (var j=0; j<$scope.numberOfRanges; j++) {
			for (var q=0; q<$scope.numberOfRanges; q++) {
				$scope.colorRanges[i][j][q]=calc2dOpacity(i,opacityRange[j],opacityRange[q]);
			}

		}
	}

ColorScheme ={
	c1:'',
	c2:'',
	c3:'',
	c4:'',
	c5 :'',
	c6:'',
	c7:'',
	c8:'',
	c9:'',
	};
var cIndex=0;
	for (var j=0; j<$scope.numberOfRanges; j++) {
		for (var q=0; q<$scope.numberOfRanges; q++) {
			var key ='c' +(j*$scope.numberOfRanges+q+1)
			ColorScheme[key]="rgba(" +$scope.colorRanges[cIndex][j][q][0] + "," +$scope.colorRanges[cIndex][j][q][1]
			+ "," +	$scope.colorRanges[cIndex][j][q][2] + "," +$scope.colorRanges[cIndex][j][q][3]+')';
		}
	}

	



}

$scope.initDefaultColors =function()  {
	sColor=$(".colorPresetItem");
	sColor.className="colorPresetItem selected";
}


function DataMapInit () {



	var keywordMap1 = new Datamap({
		scope: 'usa',
		element: document.getElementById("keywordMap1"),
		geographyConfig: {
			highlightBorderColor: '#bada55',

			highlightFillColor: '#FC8D59',
			popupTemplate: function(geography, data) {
				return '<div class="hoverinfo" style="font-size:40px;">' +geography.properties.name +'<br>' +' Electoral Votes:' +  data.electoralVotes + '<br>' +'Average polarity:' +data.average
			},
			highlightBorderWidth: 3,
		},
fills: ColorScheme,
data:{
	"AZ": {
		"fillKey": "c1",
		"electoralVotes": 11,
			"average":polarityAvgArr[2]
	},
	"CO": {
		"fillKey": "c2",
		"electoralVotes": 9,
		"average":polarityAvgArr[5]
	},
	"DE": {
		"fillKey": "c7",
		"electoralVotes": 3,
		"average":polarityAvgArr[7]
	},
	"FL": {
		"fillKey": "c6",
		"electoralVotes": 29,
		"average":polarityAvgArr[8]
	},
	"GA": {
		"fillKey": "c6",
		"electoralVotes": 16,
		"average":polarityAvgArr[9]
	},
	"HI": {
		"fillKey": "c9",
		"electoralVotes": 4,
		"average":polarityAvgArr[10]
	},
	"ID": {
		"fillKey": "c9",
		"electoralVotes": 4,
		"average":polarityAvgArr[11]
	},
	"IL": {
		"fillKey": "c2",
		"electoralVotes": 20,
		"average":polarityAvgArr[12]
	},
	"IN": {
		"fillKey": "c5",
		"electoralVotes": 11,
		"average":polarityAvgArr[13]
	},
	"IA": {
		"fillKey": "c5",
		"electoralVotes": 6,
		"average":polarityAvgArr[14]
	},
	"KS": {
		"fillKey": "c2",
		"electoralVotes": 6,
		"average":polarityAvgArr[15]
	},
	"KY": {
		"fillKey": "c6",
		"electoralVotes": 8,
		"average":polarityAvgArr[16]
	},
	"LA": {
		"fillKey": "c9",
		"electoralVotes": 8,
		"average":polarityAvgArr[17]
	},
	"MD": {
		"fillKey": "c9",
		"electoralVotes": 10,
		"average":polarityAvgArr[19]
	},
	"ME": {
		"fillKey": "c9",
		"electoralVotes": 4,
		"average":polarityAvgArr[18]
	},
	"MA": {
		"fillKey": "c9",
		"electoralVotes": 11,
		"average":polarityAvgArr[20]
	},
	"MN": {
		"fillKey": "c9",
		"electoralVotes": 10,
		"average":polarityAvgArr[22]
	},
	"MI": {
		"fillKey": "c9",
		"electoralVotes": 16,
		"average":polarityAvgArr[21]
	},
	"MS": {
		"fillKey": "c9",
		"electoralVotes": 6,
		"average":polarityAvgArr[23]
	},
	"MO": {
		"fillKey": "c9",
		"electoralVotes": 10,
		"average":polarityAvgArr[24]
	},
	"MT": {
		"fillKey": "c4",
		"electoralVotes": 3,
		"average":polarityAvgArr[25]
	},
	"NC": {
		"fillKey": "c4",
		"electoralVotes": 15,
		"average":polarityAvgArr[32]
	},
	"NE": {
		"fillKey": "c4",
		"electoralVotes": 5,
		"average":polarityAvgArr[26]
	},
	"NV": {
		"fillKey": "c8",
		"electoralVotes": 6,
		"average":polarityAvgArr[27]
	},
	"NH": {
		"fillKey": "c8",
		"electoralVotes": 4,
		"average":polarityAvgArr[28]
	},
	"NJ": {
		"fillKey": "c8",
		"electoralVotes": 14,
		"average":polarityAvgArr[29]
	},
	"NY": {
		"fillKey": "c8",
		"electoralVotes": 29,
		"average":polarityAvgArr[31]
	},
	"ND": {
		"fillKey": "c6",
		"electoralVotes": 3,
		"average":polarityAvgArr[33]
	},
	"NM": {
		"fillKey": "c6",
		"electoralVotes": 5,
		"average":polarityAvgArr[30]
	},
	"OH": {
		"fillKey": "c6",
		"electoralVotes": 18,
		"average":polarityAvgArr[34]
	},
	"OK": {
		"fillKey": "c6",
		"electoralVotes": 7,
		"average":polarityAvgArr[35]
	},
	"OR": {
		"fillKey": "c7",
		"electoralVotes": 7,
		"average":polarityAvgArr[36]
	},
	"PA": {
		"fillKey": "c7",
		"electoralVotes": 20,
		"average":polarityAvgArr[37]
	},
	"RI": {
		"fillKey": "c7",
		"electoralVotes": 4,
		"average":polarityAvgArr[38]
	},
	"SC": {
		"fillKey": "c7",
		"electoralVotes": 9,
		"average":polarityAvgArr[39]
	},
	"SD": {
		"fillKey": "c3",
		"electoralVotes": 3,
		"average":polarityAvgArr[40]
	},
	"TN": {
		"fillKey": "c3",
		"electoralVotes": 11,
		"average":polarityAvgArr[41]
	},
	"TX": {
		"fillKey": "c3",
		"electoralVotes": 38,
		"average":polarityAvgArr[42]
	},
	"UT": {
		"fillKey": "c3",
		"electoralVotes": 6,
		"average":polarityAvgArr[43]
	},
	"WI": {
		"fillKey": "c1",
		"electoralVotes": 10,
		"average":polarityAvgArr[48]
	},
	"VA": {
		"fillKey": "c1",
		"electoralVotes": 13,
		"average":polarityAvgArr[45]
	},
	"VT": {
		"fillKey": "c1",
		"electoralVotes": 3,
		"average":polarityAvgArr[44]
	},
	"WA": {
		"fillKey": "c1",
		"electoralVotes": 12,
		"average":polarityAvgArr[46]
	},
	"WV": {
		"fillKey": "c1",
		"electoralVotes": 5,
		"average":polarityAvgArr[47]
	},
	"WY": {
		"fillKey": "c1",
		"electoralVotes": 3,
		"average":polarityAvgArr[49]
	},
	"CA": {
		"fillKey": "c1",
		"electoralVotes": 55,
		"average":polarityAvgArr[4]
	},
	"CT": {
		"fillKey": "c4",
		"electoralVotes": 7,
		"average":polarityAvgArr[6]
	},
	"AK": {
		"fillKey": "c4",
		"electoralVotes": 3,
		"average":polarityAvgArr[1]
	},
	"AR": {
		"fillKey": "c4",
		"electoralVotes": 6,
		"average":polarityAvgArr[3]
	},
	"AL": {
		"fillKey": "c4",
		"electoralVotes": 9,
		"average":polarityAvgArr[0]
	},
	"DC": {
		"fillKey": "c4",
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