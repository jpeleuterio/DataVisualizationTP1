//Definindo as variaveis
let candidates = [];
let namescandidates = [];
let votesTurn1 = ['First Turn'];
let votesTurn2 = ['Second Turn'];
let difvotes = ['Difference between Turns'];

// Acha os presidentes do segundo turno
for (let i = 0; i < presidents.length; i++){
  if(presidents[i].value[0].id_candidate_num == 13 || presidents[i].value[0].id_candidate_num == 45){
    let nameCandidate = presidents[i].key;
    let totalTurn1 = 0;
    let totalTurn2 = 0;
    let dif = 0;

    // Para cada estado
    for (let j = 0; j < presidents[i].value.length; j++){
        // Conta o total de votos do primeiro Turno
        if (presidents[i].value[j].num_turn == 1){
          totalTurn1 += Number(presidents[i].value[j].num_votes);
        }
        // Conta o total de votos do segundo Turno
        else if (presidents[i].value[j].num_turn == 2){
          totalTurn2 += Number(presidents[i].value[j].num_votes);
        }
    }

    dif = totalTurn2 - totalTurn1;

    if(presidents[i].value[0].id_candidate_num == 13){
          let Candidate = {
            name: nameCandidate,
            id: 13,
            Turn1: totalTurn1,
            Turn2: totalTurn2,
            dif: dif
          }
          candidates.push(Candidate);
    }
    else if(presidents[i].value[0].id_candidate_num == 45) {
      let Candidate = {
        name: nameCandidate,
        id: 45,
        Turn1: totalTurn1,
        Turn2: totalTurn2,
        dif: dif
      }
      candidates.push(Candidate);
    }
  }
}

// Ordena os candidatos pela quantidade de votos no primeiro Turno
candidates.sort(function (a, b) {
  if (a.Turn1 < b.Turn1) { return 1; }
  if (a.Turn1 > b.Turn1) { return -1; }
  return 0;
});

for (let i=0; i< candidates.length; i++){

  if(candidates[i].id == 13){
    dataArray_13 =[candidates[i].Turn1/100000, candidates[i].Turn2/100000]
  }
  else{
    dataArray_45 =[candidates[i].Turn1/100000, candidates[i].Turn2/100000]
  }
}
//Criando graficos
let height = 600;
let width = 1500;

let area = d3.area()
                .x(function (d,i) {return (i+1)*500;})
                .y0(height)
                .y1(function (d) {return y(d);})
                .curve(d3.curveCardinal);


let svg1 = d3.select('#svg1').append('svg').attr('height','100%').attr('width','100%');

let y = d3.scaleLinear().domain([0,600]).range([height, 0]);
let x = d3.scaleLinear().domain([0,width]).range([0, width]);

let xAxis = d3.axisBottom(x).ticks(3);
let yAxis = d3.axisLeft(y).ticks(3).tickPadding(8).tickSize(10);

let grp1 = svg1.append('g').attr('class','grp1').attr('transform', 'translate (70,50)')
svg1.append('path')
    .attr('fill', 'none')
    .attr('stroke','darkred')
    .attr('stroke-width', '3')
    .attr('d', area(dataArray_13))

svg1.selectAll('circle.circle_13')
    .data(dataArray_13)
    .enter().append('circle')
            .attr('class','circle_13')
            .attr('cx', function (d,i) {return (i+1)*500;})
            .attr('cy', function (d) {return y(d);})
            .attr('r', '4')
            .attr('fill', 'darkred')

let grp2 = svg1.append('g').attr('class','grp2').attr('transform', 'translate (70,50)')
grp2.append('g').attr('class', 'axis y').call(yAxis);
grp2.append('g').attr('class', 'axis x').attr('transform','translate(0,'+height+')').call(xAxis);
svg1.append('path')
    .attr('fill', 'none')
    .attr('stroke','blue')
    .attr('stroke-width', '3')
    .attr('d', area(dataArray_45))

svg1.selectAll('circle.circle_45')
    .data(dataArray_45)
    .enter().append('circle')
            .attr('class','circle_45')
            .attr('cx', function (d,i) {return (i+1)*500;})
            .attr('cy', function (d) {return y(d);})
            .attr('r', '4')
            .attr('fill', 'blue')
