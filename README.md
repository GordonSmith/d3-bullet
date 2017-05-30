# d3-bullet v4

d3 v4 port of https://github.com/d3/d3-plugins/tree/master/bullet

## Installing

`npm install @hpcc-js/d3-bullet`.

## API Reference

<a name="bullet" href="#bullet">#</a> d3.<b>bullet</b>()

Constructs a new default [bullet generator](#_bullet).

<a name="_bullet" href="#_bullet">#</a> <i>bullet</i>(<i>data</i>)

For example:

```js
var chart = d3.bullet()
    .width(width)
    .height(height);

var svg = d3.select("body").selectAll("svg")
    .data(data)
  .enter().append("svg")
    .attr("class", "bullet")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(chart);

var data = [
  {"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,225,300],"measures":[220,270],"markers":[250]},
  {"title":"Profit","subtitle":"%","ranges":[20,25,30],"measures":[21,23],"markers":[26]},
  {"title":"Order Size","subtitle":"US$, average","ranges":[350,500,600],"measures":[100,320],"markers":[550]},
  {"title":"New Customers","subtitle":"count","ranges":[1400,2000,2500],"measures":[1000,1650],"markers":[2100]},
  {"title":"Satisfaction","subtitle":"out of 5","ranges":[3.5,4.25,5],"measures":[3.2,4.7],"markers":[4.4]}
]    
```

<a name="bullet_width" href="#bullet_width">#</a> <i>bullet</i>.<b>width</b>([<i>width</i>])

If *width* is specified, sets the *width* and returns this bullet generator. If *width* is not specified, returns the current *width*, which defaults to:  ```300```

<a name="bullet_width" href="#bullet_width">#</a> <i>bullet</i>.<b>height</b>([<i>height</i>])

If *width* is specified, sets the *width* and returns this bullet generator. If *width* is not specified, returns the current *width*, which defaults to:  ```30```

