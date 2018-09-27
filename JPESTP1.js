

var estados = d3.json("Brasil_Estados.geojson", function (data) {

                var svg= d3.select("body").append('svg').attr('height','100%').attr('width','50%');

                //Pegando dados
                var estado = svg.selectAll("g")
                                .data(data.features)
                                .enter()
                                .append('g');

                //Escolhendo projeção
                var projection = d3.geoMercator().scale(1000).translate([1400,100]);
                var path = d3.geoPath().projection(projection);

                //Desenhando caminhos
                var areas = estado.append('path')
                                    .attr('d', path)
                                    .attr('class', 'area');
                var nome_estado = svg.selectAll("path")
                                     .append('svg:title').text(function (data){return data.name; });
});
var nomes = d3.csv("presidentes.csv", function (d){
              var svg= d3.select("body").append('svg').attr('height','100%').attr('width','50%')

              //Pegando nomes e ID`s dos presidentes
              var nome = svg.selectAll("text")
                             .data(d3.map(d,function(d) {return d.id_candidate_num; }).keys())
                             .enter().append('text')
                             .attr('x', 90)
                             .attr('y',function (d) {return d.pos*50;})
                             .attr('fill','black')
                             .attr('font-size',15)
                             .attr('stroke','red')
                             .attr('stroke-width','1')
                             .attr('text-anchor','start')
                             .attr('dominant-baseline', 'middle')
                             .text(function(d) {return d.cat_candidate_name;})
});
