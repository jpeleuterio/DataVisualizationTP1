//Definindo as proporções da pagina
let height = 600;
let width = 1400;
let height_1 = 27;
let width_1 = 72;
let scale_1 = 180;
let scale_2 = width/(2.2);

//-------------->PRIMEIRA "TELA" - Exibicao GERAL<------------------------------------------------------------------------

//Escolhendo projeção
let projection = d3.geoMercator().scale(scale_2).center([-34,-15]);
let path = d3.geoPath().projection(projection);

d3.queue()
  .defer(d3.json, "data/br-states.json")
  .await(draw);

function draw(error,data){

  if(error) throw error;

  //Pega dados
  let states = topojson.feature(data, data.objects.estados).features ;
  let state_borders = topojson.feature(data, data.objects.estados) ;

  //Cria o svg
  let svg0= d3.select("#svg0").append('svg')
              .attr('height', height).attr('width', (width/2));
  let g0 = svg0.append("g");

    //Definindo cor
   g0.attr('class', 'state_general')
     .selectAll('path')
     .data(states)
     .enter().append('path')
     .style('fill', function (d){
            //Busca partido mais votado no estado
            let win = StateWinner(d.id)
            //Retorna a cor do partido
            return color_win(win);
     })
     .attr('d', path);

  //Contornos
  g0.append('path')
   .datum(state_borders)
   .attr('d', path)
   .attr('class','state_borders_gen');
}

//Função ganhadores
function StateWinner(statew){
let winner = "";
let votes = 0;
let candidate = "";

for (let j=0; j< 11; j++){
    candidate = presidents[j];
    for (let i = 0; i< candidate.value.length ; i++){
      if (candidate.value[i].num_turn == 1){
          if (candidate.value[i].cat_state == statew){
              if(Number(candidate.value[i].num_votes) > votes){
                votes = Number(candidate.value[i].num_votes);
                winner = candidate.value[i].cat_party;
              }
          }
      }
    }
}
return winner;
}

//Escala de cores
function color_win(party){
  let colore ="#FF0000";
  if(party == "PSTU")       {colore = '#FF0000';}
  else if(party == "PRTB")  {colore = '#FFFF00';}
  else if(party == "PCB")   {colore = '#FF0000';}
  else if(party == "PSOL")  {colore = '#CFB53B';}
  else if(party == "PV")    {colore = '#00330';}
  else if(party == "PSC")   {colore = '#7FFF00';}
  else if(party == "PSDC")  {colore = '#007FFF';}
  else if(party == "PCO")   {colore = '#97694F';}
  else if(party == "PT")    {colore = '#CC0000';}
  else if(party == "PSDB")  {colore = '#0000FF';}
  else if(party == "PSB")   {colore = '#FF6600';}
  return colore;
}

//-------------->SEGUNDA "TELA" - Exibicao POR CANDIDATO<------------------------------------------------------------------

//Define as projecoes como Mercator
let projection_1 = d3.geoMercator()
  .scale(scale_1)
  .center([-52, -15])
  .translate([width_1/2, height_1 / 2]);

// Define o desenho do mapa via variavel
let path_1 = d3.geoPath()
  .projection(projection_1);

//Recebe os arquivos
d3.queue()
  .defer(d3.json, "data/br-states.json")
  .await(drawmap);

//Criando svgs nas posicoes a direita
let svg1 = d3.select("#svg1").append('svg')
            .attr('height', height_1);

let svg2 = d3.select("#svg2").append('svg')
            .attr('height', height_1);

let svg3 = d3.select("#svg3").append('svg')
            .attr('height', height_1);

let svg4 = d3.select("#svg4").append('svg')
            .attr('height', height_1);

let svg5 = d3.select("#svg5").append('svg')
            .attr('height', height_1);

let svg6 = d3.select("#svg6").append('svg')
            .attr('height', height_1);

let svg7 = d3.select("#svg7").append('svg')
            .attr('height', height_1);

let svg8 = d3.select("#svg8").append('svg')
            .attr('height', height_1);

let svg9 = d3.select("#svg9").append('svg')
            .attr('height', height_1);

let svg10 = d3.select("#svg10").append('svg')
            .attr('height', height_1);

let svg11 = d3.select("#svg11").append('svg')
            .attr('height', height_1);

let g1 = svg1.append("g");
let g2 = svg2.append("g");
let g3 = svg3.append("g");
let g4 = svg4.append("g");
let g5 = svg5.append("g");
let g6 = svg6.append("g");
let g7 = svg7.append("g");
let g8 = svg8.append("g");
let g9 = svg9.append("g");
let g10 = svg10.append("g");
let g11 = svg11.append("g");

//Definindo funcao de desenho dos mapas
function drawmap(error, data) {
    if(error) throw error;

    //Estatos e bordas
    let states = topojson.feature(data, data.objects.estados).features ;
    let state_borders = topojson.feature(data, data.objects.estados) ;

    // 1Pres - Desenha e preenche
    g1.attr('class', 'state')
      .selectAll('path')
      .data(states)
      .enter().append('path')
      .style('fill', function (d){
        //Calcula a porcetagem e retorna a cor relativa
        let percentage = StatePercentagePresidents(d.id, presidents[0]);
        return color(percentage, presidents[0]);})
      .attr('d', path_1);

    g1.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

    // 2Pres - Desenha e preenche
    g2.attr('class', 'state')
      .selectAll('path')
      .data(states)
      .enter().append('path')
      .style( 'fill', function (d){
        //Calcula a porcetagem e retorna a cor relativa
        let percentage = StatePercentagePresidents(d.id, presidents[1]);
        return color(percentage, presidents[1]);})
      .attr('d', path_1);

    g2.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

    // 3Pres - Desenha e preenche
    g3.attr('class', 'state')
      .selectAll('path')
      .data(states)
      .enter().append('path')
      .style( 'fill', function (d){
        //Calcula a porcetagem e retorna a cor relativa
        let percentage = StatePercentagePresidents(d.id, presidents[2]);
        return color(percentage, presidents[2]);})
      .attr('d', path_1);

    g3.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

    // 4Pres - Desenha e preenche
    g4.attr('class', 'state')
        .selectAll('path')
        .data(states)
        .enter().append('path')
        .style( 'fill', function (d){
          //Calcula a porcetagem e retorna a cor relativa
          let percentage = StatePercentagePresidents(d.id, presidents[3]);
          return color(percentage, presidents[3]);})
        .attr('d', path_1);

    g4.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

    // 5Pres - Desenha e preenche
    g5.attr('class', 'state')
        .selectAll('path')
        .data(states)
        .enter().append('path')
        .style( 'fill', function (d){
          //Calcula a porcetagem e retorna a cor relativa
          let percentage = StatePercentagePresidents(d.id, presidents[4]);
          return color(percentage, presidents[5]);})
        .attr('d', path_1);

    g5.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

    // 6Pres - Desenha e preenche
    g6.attr('class', 'state')
        .selectAll('path')
        .data(states)
        .enter().append('path')
        .style( 'fill', function (d){
          //Calcula a porcetagem e retorna a cor relativa
          let percentage = StatePercentagePresidents(d.id, presidents[5]);
          return color(percentage, presidents[5]);})
        .attr('d', path_1);

    g6.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

    // 7Pres - Desenha e preenche
    g7.attr('class', 'state')
        .selectAll('path')
        .data(states)
        .enter().append('path')
        .style( 'fill', function (d){
          //Calcula a porcetagem e retorna a cor relativa
          let percentage = StatePercentagePresidents(d.id, presidents[6]);
          return color(percentage,presidents[6]);})
        .attr('d', path_1);

    g7.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

    // 8Pres - Desenha e preenche
    g8.attr('class', 'state')
        .selectAll('path')
        .data(states)
        .enter().append('path')
        .style( 'fill', function (d){
          //Calcula a porcetagem e retorna a cor relativa
          let percentage = StatePercentagePresidents(d.id, presidents[7]);
          return color(percentage, presidents[7]);})
        .attr('d', path_1);

    g8.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

    // 9Pres - Desenha e preenche
    g9.attr('class', 'state')
        .selectAll('path')
        .data(states)
        .enter().append('path')
        .style( 'fill', function (d){
          //Calcula a porcetagem e retorna a cor relativa
          let percentage = StatePercentagePresidents(d.id, presidents[8]);
          return color(percentage, presidents[8]);})
        .attr('d', path_1);

    g9.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

    // 10Pres - Desenha e preenche
    g10.attr('class', 'state')
        .selectAll('path')
        .data(states)
        .enter().append('path')
        .style( 'fill', function (d){
          //Calcula a porcetagem e retorna a cor relativa
          let percentage = StatePercentagePresidents(d.id, presidents[9]);
          return color(percentage, presidents[9]);})
        .attr('d', path_1);

    g10.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

    // 11Pres - Desenha e preenche
    g11.attr('class', 'state')
        .selectAll('path')
        .data(states)
        .enter().append('path')
        .style( 'fill', function (d){
          //Calcula a porcetagem e retorna a cor relativa
          let percentage = StatePercentagePresidents(d.id, presidents[10]);
          return color(percentage, presidents[10]);})
        .attr('d', path_1);

    g11.append('path')
      .datum(state_borders)
      .attr('d', path_1)
      .attr('class','state_borders');

}

//Calculo da porcentagem de votos recebida por estado dado o CANDIDATO
function StatePercentagePresidents(state, candidate){
      let total = 0;
      let state_total = 0;
      let percentage = 0;

      for (let i = 0; i< candidate.value.length ; i++){
        if (candidate.value[i].num_turn == 1){
            total += Number(candidate.value[i].num_votes);
            if (candidate.value[i].cat_state == state){
              state_total = Number(candidate.value[i].num_votes)
            }
        }
      }

      percentage = (state_total/total)*100
      return percentage;
}

//Escala de cores
function color(percentage, candidate){
let colore = '#000000';

  if(candidate.value[0].cat_party == "PSTU"){
    let colore = d3.scaleLinear().domain([1, 50]).range(['#FFFFFF', '#FF0000']);
  }
  else if(candidate.value[0].cat_party == "PRTB"){
    let colore = d3.scaleLinear().domain([1,50]).range(['#FFFFFF','#FFFF00']);
  }
  else if(candidate.value[0].cat_party == "PCB"){
    let colore = d3.scaleLinear().domain([1,50]).range(['#FFFF00','#FF0000']);
  }
  else if(candidate.value[0].cat_party == "PSOL"){
    let colore = d3.scaleLinear().domain([1,50]).range(['#FFFFFF','#CFB53B']);
  }
  else if(candidate.value[0].cat_party == "PV"){
    let colore = d3.scaleLinear().domain([1,50]).range(['#FFFFFF','#00330']);
  }
  else if(candidate.value[0].cat_party == "PSC"){
    let colore = d3.scaleLinear().domain([1,50]).range(['#FFFFFF','#7FFF00']);
  }
  else if(candidate.value[0].cat_party == "PSDC"){
    let colore = d3.scaleLinear().domain([1,50]).range(['#FFFFFF','#007FFF']);
  }
  else if(candidate.value[0].cat_party == "PCO"){
    let colore = d3.scaleLinear().domain([1,50]).range(['#FFFFFF','#97694F']);
  }
  else if(candidate.value[0].cat_party == "PT"){
    let colore = d3.scaleLinear().domain([1,50]).range(['#FFFFFF','#CC0000']);
  }
  else if(candidate.value[0].cat_party == "PSDB"){
    let colore = d3.scaleLinear().domain([1,50]).range(['#FFFFFF','#0000FF']);
  }
  else if(candidate.value[0].cat_party == "PSB"){
    let colore = d3.scaleLinear().domain([1,50]).range(['#FFFFFF','#FF6600']);
  }
  return colore;
}
