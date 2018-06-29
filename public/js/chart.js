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

// Make array of tag counts to graph, and random color for each tag
Object.keys(counts).forEach(function(key) {
  tagData.push(counts[key]);
  colors.push("rgba(" + Math.floor(Math.random() * (75-55) + 55) + "," +
  											Math.floor(Math.random() * (255-170) + 170) + "," +
  											Math.floor(Math.random() * (255-130) + 130) + ", 1)");
});

// Create chart and initialize with tag names and colors
var myChart = new Chart(ctx, {
type: 'doughnut',
  data: {
    datasets: [{
      data: tagData,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1
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
        fontColor: '#fff'
      }
    }
  }
});