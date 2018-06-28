var ctx = document.getElementById("myChart").getContext('2d');

var tagArray = [];
var counts = {};

projects.forEach(function(project) {
  project.tags.forEach(function(tag) {
    tagArray.push(tag);
  });
});

tagArray.forEach(function(tag) {
  counts[tag.tagName] = 1 + (counts[tag.tagName] || 0);
});

var tagData = [];
var colors = [];
Object.keys(counts).forEach(function(key) {
  tagData.push(counts[key]);
  colors.push("rgba(" + Math.floor(Math.random() * (75-55) + 55) + "," +
  											Math.floor(Math.random() * (255-170) + 170) + "," +
  											Math.floor(Math.random() * (255-130) + 130) + ", 1)");
});

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
        
    }
});