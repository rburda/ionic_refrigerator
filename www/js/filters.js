require('angular');

module.exports = angular.module('restaurantFilters', [])
	.filter('chunk', function() {
		return function(inputArray, sizeOfChunk) {
				var chunkedArrary = [];
		    	for (var i=0; i <= inputArray.length-1; i+=sizeOfChunk) {
		      		var row = inputArray.slice(i, Math.min(i+sizeOfChunk, inputArray.length));
		      		console.log("i in row == " + i);
		      		chunkedArrary.push({"rowId": i, "elements":row});
		    	};
		    	return chunkedArrary;
		};
	});