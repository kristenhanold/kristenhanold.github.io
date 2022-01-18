var dataSet;

d3.json("data/samples.json").then(function(jsonData) {
    d3.select("selDataset")
        .data(jsonData.names)
    optionChanged(d3.select("#selDataset").property("value"));
});

function createBar(values, labels, hoverText) {
    var data = [{
        type: 'bar',
        x: values,
        y: labels,
        text: hoverText,
        orientation: 'h'
    }];

    var layout = {
        title: "Top 10 OTUs"
    };

    Plotly.newPlot('bar', data, layout);
}

function createBubble(x, y, text) {
    var data = [{
        type: 'bubble',
        x: x,
        y: y,
        text: text,
        mode: 'markers',
        marker: {
            size: y,
            color: x.map(value=>value)
        }
    }];

    var layout = {
        title: "OTU Values",
        xAxis: {
            title: {
                text: 'OTU ID'
            }
        }
    };

    Plotly.newPlot('bubble', data, layout);
}

function Meta(data) {
    var div = d3.select("#sample-metadata");
    div.html("")
    var list = div.append("ul");
    Object.entries(data).forEach(([key, value]) => {
        list.append("li").text(key + ": " + value);
     });
}

function optionChanged(value) {
    d3.json("data/samples.json").then(function(jsonData) {
       var metadata = incomingData.metadata.filter(data => data.id ==value);
        console.log(metadata);

        var sample = incomingData.samples.filter(data => data.id ==value);
        console.log(sample);

        createBar(sample[0].sample_values.slice(0,10), sample[0].otu_ids.slice(0, 10), sample[0].otu_labels.slice(0, 10));
        createBubble(sample[0].otu_ids, sample[0].sample_values, sample[0].otu_labels);
        Meta(metadata[0]);

    });
}

