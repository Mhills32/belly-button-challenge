function init() {
    let selector = d3.select("#selDataset");
  
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  
    d3.json(url).then((data) => {
      let idNames = data.names;
  
      for (let i = 0; i < idNames.length; i++) {
        selector.append("option").text(idNames[i]).property("value", idNames[i]);
      }
  
      let firstSample = idNames[0];
      buildBarChart(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function buildBarChart(sample) {
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  
    d3.json(url).then((data) => {
      let samples = data.samples.find((sampleData) => sampleData.id === sample);
      let sampleValues = samples.sample_values.slice(0, 10).reverse();
      let otuIds = samples.otu_ids.slice(0, 10).map((id) => `OTU ${id}`).reverse();
      let otuLabels = samples.otu_labels.slice(0, 10).reverse();
  
      let trace = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type: "bar",
        orientation: "h"
      };
  
      let chartData = [trace];
  
      let layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
      };
  
      Plotly.newPlot("bar", chartData, layout);
    });
  }
  
  function optionChanged(newSample) {
    buildBarChart(newSample);
    buildMetadata(newSample);
  }
  
  init();
  
  function buildMetadata(sample) {
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  
    d3.json(url).then((data) => {
      let metadata = data.metadata;
      let filteredArray = metadata.filter((sampleObj) => sampleObj.id == sample);
      let result = filteredArray[0];
  
      let panel = d3.select('#sample-metadata');
  
      panel.html("");
  
      for (let key in result) {
        panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
      }
    });
  }
  