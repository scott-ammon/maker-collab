// define context by grabbing the div with id = myChart
var ctx = document.getElementById("myChart").getContext('2d');

var tagArray = [];
var counts = {};

// Make an array of tags by iterating through tags of each project
projects.forEach(function(project) {
  project.tags.forEach(function(tag) {
    tagArray.push(tag);
  });
});

// Create an object with distinct counts of each tagName
tagArray.forEach(function(tag) {
  counts[tag.tagName] = 1 + (counts[tag.tagName] || 0);
});

var tagData = [];
var colors = [];
var borders = [];

var colorArray = ["rgba(191, 240, 212, 0.5)",
                  "rgba(91, 97, 106, 0.5)",
                  "rgba(0, 50, 73, 0.5)",
                  "rgba(0, 126, 167, 0.5)",
                  "rgba(128, 206, 215, 0.5)",
                  "rgba(191, 240, 212, 0.5)",
                  "rgba(91, 97, 106, 0.5)",
                  "rgba(0, 50, 73, 0.5)",
                  "rgba(0, 126, 167, 0.5)",
                  "rgba(128, 206, 215, 0.5)",
                  "rgba(191, 240, 212, 0.5)"];

var borderArray = ["rgba(191, 240, 212, 1)",
                    "rgba(91, 97, 106, 1)",
                    "rgba(0, 50, 73, 1)",
                    "rgba(0, 126, 167, 1)",
                    "rgba(128, 206, 215, 1)",
                    "rgba(191, 240, 212, 1)",
                    "rgba(91, 97, 106, 1)",
                    "rgba(0, 50, 73, 1)",
                    "rgba(0, 126, 167, 1)",
                    "rgba(128, 206, 215, 1)",
                    "rgba(191, 240, 212, 1)"];

// Make array of tag counts to graph, and random color for each tag
Object.keys(counts).forEach(function(key, i) {
  tagData.push(counts[key]);
  colors.push(colorArray[i]);
  borders.push(borderArray[i]);
});

// Create chart and initialize with tag names and colors
var myChart = new Chart(ctx, {
type: 'doughnut',
  data: {
    datasets: [{
      data: tagData,
      backgroundColor: colors,
      borderColor: borders,
      borderWidth: 2
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: Object.keys(counts)
  },
  options: {
    legend: {
    	position: 'bottom',
    	fontColor: '#fff',
      labels: {
        fontSize: 16,
        fontColor: '#000'
      }
    }
  }
});