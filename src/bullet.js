import { descending as d3Descending } from "d3-array";
import { axisLeft as d3AxisLeft } from "d3-axis";
import { scaleLinear as d3ScaleLinear } from "d3-scale";
import { select as d3Select } from "d3-selection";
import { timerFlush as d3TimerFlush } from "d3-timer";
import "d3-transition";

export default function () {
    var orient = "left",
        reverse = false,
        vertical = false,
        ranges = bulvarRanges,
        markers = bulvarMarkers,
        measures = bulvarMeasures,
        width = 380,
        height = 30,
        xAxis = d3AxisLeft();

    // For each small multiple…
    function bulvar(g) {
        g.each(function (d, i) {
            var rangez = ranges.call(this, d, i).slice().sort(d3Descending),
                markerz = markers.call(this, d, i).slice().sort(d3Descending),
                measurez = measures.call(this, d, i).slice().sort(d3Descending),
                g2 = d3Select(this),
                extentX,
                extentY;

            var wrap = g2.select("g.wrap");
            if (wrap.empty()) wrap = g2.append("g").attr("class", "wrap");

            if (vertical) {
                extentX = height, extentY = width;
                wrap.attr("transform", "rotate(90)translate(0," + -width + ")");
            } else {
                extentX = width, extentY = height;
                wrap.attr("transform", null);
            }

            // Compute the new x-scale.
            var x1 = d3ScaleLinear()
                .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
                .range(reverse ? [extentX, 0] : [0, extentX]);

            // Retrieve the old x-scale, if this is an update.
            var x0 = this.__chart__ || d3ScaleLinear()
                .domain([0, Infinity])
                .range(x1.range());

            // Stash the new scale.
            this.__chart__ = x1;

            // Derive width-scales from the x-scales.
            var w0 = bulvarWidth(x0),
                w1 = bulvarWidth(x1);

            // Update the range rects.
            var range = wrap.selectAll("rect.range")
                .data(rangez);

            range.enter().append("rect")
                .attr("class", function (_d, i2) { return "range s" + i2; })
                .attr("width", w0)
                .attr("height", extentY)
                .attr("x", reverse ? x0 : 0)
                .merge(range)
                .transition(range)
                .attr("x", reverse ? x1 : 0)
                .attr("width", w1)
                .attr("height", extentY);

            // Update the measure rects.
            var measure = wrap.selectAll("rect.measure")
                .data(measurez);

            measure.enter().append("rect")
                .attr("class", function (_d, i2) { return "measure s" + i2; })
                .attr("width", w0)
                .attr("height", extentY / 3)
                .attr("x", reverse ? x0 : 0)
                .attr("y", extentY / 3)
                .merge(measure)
                .transition(measure)
                .attr("width", w1)
                .attr("height", extentY / 3)
                .attr("x", reverse ? x1 : 0)
                .attr("y", extentY / 3);

            // Update the marker lines.
            var marker = wrap.selectAll("line.marker")
                .data(markerz);

            marker.enter().append("line")
                .attr("class", "marker")
                .attr("x1", x0)
                .attr("x2", x0)
                .attr("y1", extentY / 6)
                .attr("y2", extentY * 5 / 6)
                .merge(marker)
                .transition(marker)
                .attr("x1", x1)
                .attr("x2", x1)
                .attr("y1", extentY / 6)
                .attr("y2", extentY * 5 / 6);

            var axis = g2.selectAll("g.axis").data([0]);
            axis.enter().append("g").attr("class", "axis");
            axis.attr("transform", vertical ? null : "translate(0," + extentY + ")")
                .call(xAxis.scale(x1));
        });
        d3TimerFlush();
    }

    // left, right, top, bottom
    bulvar.orient = function (_) {
        if (!arguments.length) return orient;
        orient = _ + "";
        reverse = orient === "right" || orient === "bottom";
        xAxis.orient((vertical = orient === "top" || orient === "bottom") ? "left" : "bottom"); // eslint-disable-line
        return bulvar;
    };

    // ranges (bad, satisfactory, good)
    bulvar.ranges = function (_) {
        if (!arguments.length) return ranges;
        ranges = _;
        return bulvar;
    };

    // markers (previous, goal)
    bulvar.markers = function (_) {
        if (!arguments.length) return markers;
        markers = _;
        return bulvar;
    };

    // measures (actual, forecast)
    bulvar.measures = function (_) {
        if (!arguments.length) return measures;
        measures = _;
        return bulvar;
    };

    bulvar.width = function (_) {
        if (!arguments.length) return width;
        width = +_;
        return bulvar;
    };

    bulvar.height = function (_) {
        if (!arguments.length) return height;
        height = +_;
        return bulvar;
    };

    bulvar.tickFormat = function (_) {
        if (!arguments.length) return xAxis.tickFormat();
        xAxis.tickFormat(_);
        return bulvar;
    };

    return bulvar;
}

function bulvarRanges(d) {
    return d.ranges;
}

function bulvarMarkers(d) {
    return d.markers;
}

function bulvarMeasures(d) {
    return d.measures;
}

function bulvarWidth(x) {
    var x0 = x(0);
    return function (d) {
        return Math.abs(x(d) - x0);
    };
}
