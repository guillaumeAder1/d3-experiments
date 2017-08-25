
(function() {
    // Define our constructor
    param = {
        dom:null
    };
    margin = 5;
    this.d3Grouping = function() {        
        param = Object.assign(param, arguments[0]);        
        init();

        /**
         * public methodes
         */ 
        return {
            _do: function(){
                console.log(param)
            }
        }
    }
    /**
     * Private methodes
     */
    init = function(){       
        var data = _getDataValue();
        // create SVG
        var svg = d3.select(param.dom).append('svg')
            .attr("width", 300)
            .attr("height", 500);

        // INIT group postion center
        var groups = svg.selectAll('circle').data(data).enter()
            .append('g')
                .attr('transform',  function(d,i){return "translate(" + d.cx + ", " + d.cy + ")";})
                .append('circle')
                    .attr('r', 20)
                    .style('fill', '#a20707');

        // ANIMATION LOOP
        groups.transition().delay(500)
            .on('start', function repeat(){
                d3.active(this)
                    .attr('transform', function(d,i){ return "scale(1.5,1.5)" })
                .transition()
                    .attr('transform', function(d,i){ return "scale(1,1)" })
                .transition()
                    .on('start', repeat);                    
            });           
                    
    }
    /**
     * center and display element X axis
     */
    _getXpos = function(index, nbrDots, radius, dimenssion) {
        var center = (dimenssion / 2);
        var offset = (radius * 2) + margin;
        var isEven = (nbrDots % 2 === 0) ? true : false;
        if (isEven) {
            if (index < nbrDots / 2) {
                var final = center - (offset * (nbrDots / 2 - index))
            } else {
                var final = center + (offset * (index - nbrDots / 2))
            }
        } else {
            var midIndex = Math.floor(nbrDots / 2);
            if (index < midIndex) {
                var final = center - (offset * (nbrDots / 2 - index))
            } else {
                var final = center + (offset * (index - nbrDots / 2))
            }
        }
        return final + radius
    }

    _getDataValue = function(){
        var circles = new Array(6).fill({
            r: 20
        });
        var csCircles = circles.map(function(circle, index) {
            return {
                r: circle.r,
                cx: _getXpos(index, 6, 20, 300),
                cy: 20
            }
        }, this);
        return csCircles;
    }

    
  }());