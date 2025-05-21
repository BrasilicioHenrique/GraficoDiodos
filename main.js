var tensaoSeno = 2;
var hzSeno = 2;
var tensaoZenner = 1.75;
var tensaoDiodo = 0.7;
var descarregaCapacitor = 0.999;

function desenharGrafico(button) {
    const coordenadasx = [];
    const coordenadasy = [];
    let dados = [];
    let layout = [];

    switch (button.id) {
        case "senoide":
            document.getElementById("texto").innerHTML =
                `<h2>Gráfico de uma Função Seno</h2> 
                <p>Gráfico que aparece no ociloscópio quando mede tensão / tempo<br>
                    Variáveis usadas: tensaoSeno; hzSeno</p>`;
            for (let i = -100; i <= 100; i += 0.001) {
                coordenadasx.push(i);
                coordenadasy.push(tensaoSeno * Math.sin(hzSeno * i));
            }

            dados = [{x: coordenadasx, y: coordenadasy, mode: 'lines', line: {color: 'blue'}}];
            layout = {
                title: 'Gráfico f(x) = Tensao * seno(Frequencia * x)',
                xaxis: {title: 'X', range: [-2, 10], zeroline: true},
                yaxis: {title: 'Y', range: [-3, 3], zeroline: true}
            };
            Plotly.newPlot('grafico', dados, layout);
            break;

        case "retificador":
            document.getElementById("texto").innerHTML =
                `<h2>Gráfico Diodo Retificador</h2> 
                <p>Em um circuito de CA um único diodo só deixa passar corrente no fluxo certo (diretamente polarizado), então quando o sinal da tensão for negativo, a corrente é 0. É um gráfico de meia onda completa.<br>
                    Variáveis usadas: tensaoSeno; hzSeno</p>`;
            for (let i = 0; i <= 100; i += 0.001) {
                let sinalTensao = tensaoSeno * Math.sin(hzSeno * i)
                coordenadasx.push(i);
                coordenadasy.push(Math.max(0, sinalTensao));
            }

            dados = [{x: coordenadasx, y: coordenadasy, mode: 'lines', line: {color: 'blue'}}];
            layout = {
                title: 'Gráfico de Meia Onda Completa',
                xaxis: {title: 'Tempo (s)', range: [-2, 10], zeroline: true},
                yaxis: {title: 'Tensão (V)', range: [-3, 3], zeroline: true}
            };
            Plotly.newPlot('grafico', dados, layout);
            break;

        case "ponte":
            document.getElementById("texto").innerHTML =
                `<h2>Gráfico Diodo Retificador em Ponte</h2>
                <p>A estrutura de quatro diodos em ponte permite transformação da tensão em ondas completas<br>
                    Variáveis usadas: tensaoSeno; hzSeno</p>`;
            for (let i = 0; i <= 100; i += 0.001) {
                let sinalTensao = Math.abs(tensaoSeno * Math.sin(hzSeno * i));
                coordenadasx.push(i);
                coordenadasy.push(sinalTensao);
            }

            dados = [{x: coordenadasx, y: coordenadasy, mode: 'lines', line: {color: 'blue'}}];
            layout = {
                title: 'Gráfico de Onda Completa',
                xaxis: {title: 'Tempo (s)', range: [-2, 10], zeroline: true},
                yaxis: {title: 'Tensão (V)', range: [-3, 3], zeroline: true}
            };
            Plotly.newPlot('grafico', dados, layout);
            break;

        case "diodoCapacitor":
            document.getElementById("texto").innerHTML =
                `<h2>Gráfico diodo retificador com Capacitor</h2>
                <p>Gráfico de um diodo retificador em ponte junto também de um capacitor que filtra a tensão, deixando-a mais constante.<br>
                    Variáveis usadas: tensaoSeno; hzSeno; descarregaCapacitor</p>`;
            tensaoCapacitor = 0;
            for (let i = 0; i <= 100; i += 0.001) {
                let sinalTensao = Math.abs(tensaoSeno * Math.sin(hzSeno * i));
                tensaoCapacitor = Math.max(sinalTensao, tensaoCapacitor ** descarregaCapacitor);
                coordenadasx.push(i);
                coordenadasy.push(tensaoCapacitor);
            }

            dados = [{x: coordenadasx, y: coordenadasy, mode: 'lines', line: {color: 'blue'}}];
            layout = {
                title: 'Gráfico de Onda Completa com Filtro',
                xaxis: {title: 'Tempo (s)', range: [-2, 10], zeroline: true},
                yaxis: {title: 'Tensão (V)', range: [-3, 3], zeroline: true}
            };
            Plotly.newPlot('grafico', dados, layout);
            break;

        case "diodoZenner":
            document.getElementById("texto").innerHTML =
                `<h2>Gráfico Diodo Zenner de onda completa</h2>
                <p>Depois dos diodos em ponte, tem um diodo zenner que regula a tensão máxima da onda<br>
                    Variáveis usadas: tensaoSeno; hzSeno; tensaoZennerSeno`;
            for (let i = 0; i <= 100; i += 0.001) {
                let sinalTensao = Math.abs(tensaoSeno * Math.sin(hzSeno * i))
                coordenadasx.push(i);
                coordenadasy.push(Math.min(sinalTensao, tensaoZenner));
            }

            dados = [{x: coordenadasx, y: coordenadasy, mode: 'lines', line: {color: 'blue'}}];
            layout = {
                title: 'Gráfico de Onda Completa com regulador',
                xaxis: {title: 'X', range: [-2, 10], zeroline: true},
                yaxis: {title: 'Tensão (V)', range: [-3, 3], zeroline: true}
            };
            Plotly.newPlot('grafico', dados, layout);
            break;

        case "diodoZennerCapacitor":
            document.getElementById("texto").innerHTML =
                `<h2>Gráfico Diodo Zenner de onda completa com filtro</h2>
                <p>Depois dos diodos em ponte, tem um diodo zenner que regula a tensão máxima da onda<br>
                    Variáveis usadas: tensaoSeno; hzSeno; descarregaCapacitor; tensaoZenner`;
            tensaoCapacitor = 0;
            for (let i = 0; i <= 100; i += 0.001) {
                let sinalTensao = Math.abs(tensaoSeno * Math.sin(hzSeno * i));
                tensaoCapacitor = Math.max(sinalTensao, tensaoCapacitor ** descarregaCapacitor);
                coordenadasx.push(i);
                coordenadasy.push(Math.min(tensaoCapacitor, tensaoZenner))
            }

            dados = [{x: coordenadasx, y: coordenadasy, mode: 'lines', line: {color: 'blue'}}];
            layout = {
                title: 'Gráfico de Onda Completa filtrada e regulada',
                xaxis: {title: 'X', range: [-2, 10], zeroline: true},
                yaxis: {title: 'Tensão (V)', range: [-3, 3], zeroline: true}
            };
            Plotly.newPlot('grafico', dados, layout);
            break;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        case "ideal":
            document.getElementById("texto").innerHTML =
                `<h2>Gráfico Diodo Ideal</h2> 
                <p>Não conduz com tensão menor que 0, mas a partir de 0V, ele conduz uma corrente constante</p>`;
            for (let i = -1; i <= 10; i += 0.01) {
                if (i <= 0) {
                    coordenadasx.push(i);
                    coordenadasy.push(0);
                } else {
                    coordenadasx.push(0);
                    coordenadasy.push(i);
                }
            }

            dados = [{x: coordenadasx, y: coordenadasy, mode: 'lines', line: {color: 'blue'}}];
            layout = {
                title: "Gráfico Diodo Ideal",
                xaxis: {title: "Tensão (V)", range: [-1, 1], zeroline: true},
                yaxis: {title: "Corrente (A)", range: [-1, 2], zeroline: true}
            };
            Plotly.newPlot('grafico', dados, layout);
            break;

        case "diodo":
            document.getElementById("texto").innerHTML =
                `<h2>Gráfico Diodo como fonte</h2>
                <p>Não conduz com tensão menor que 0,7V, mas a partir disso, ele conduz uma corrente constante<br>
                    Variáveis usadas: tensaoDiodo`;
            for (let i = -1; i <= 10; i += 0.01) {
                if (i < tensaoDiodo) {
                    coordenadasx.push(i);
                    coordenadasy.push(0);
                } else {
                    coordenadasx.push(tensaoDiodo);
                    coordenadasy.push(i);
                }
            }

            dados = [{x: coordenadasx, y: coordenadasy, mode: 'lines', line: {color: 'blue'}}];
            layout = {
                title: "Gráfico Diodo",
                xaxis: {title: "Tensão (V)", range: [-1, 1], zeroline: true},
                yaxis: {title: "Corrente (A)", range: [-1, 2], zeroline: true}
            };
            Plotly.newPlot('grafico', dados, layout);
            break;

        case "real":
            document.getElementById("texto").innerHTML =
                `<h2>Gráfico Diodo Real</h2>
                <p>Conduz muito pouco até que chegue no seu ponto Q (0,7V), a partir desse ponto, ele conduz normalmente</p>`;
            for (let i = -1; i <= 1; i += 0.01) {
                coordenadasx.push(i);
                coordenadasy.push(1e-12 * (Math.exp(i / 0.02585) - 1));
            }

            dados = [{x: coordenadasx, y: coordenadasy, mode: 'lines', line: {color: 'blue'}}];
            dados.push({x: [0, 0.7008, 1], y: [2, 0.5985, 0], mode: 'lines', line: { color: 'black'}});
            dados.push({x: [0.7008], y: [0.5985], mode: "markers+text", text: "Q", textposition: "top-right", marker: {color: 'black'}});

            layout = {
                title: 'Gráfico Diodo Real',
                xaxis: {title: 'Tensão (V)', range: [-1, 1], zeroline: true},
                yaxis: {title: 'Corrente (A)', range: [-1, 2], zeroline: true},
                showlegend: false
            };
            Plotly.newPlot('grafico', dados, layout);
            break;

        case "zenner":
            document.getElementById("texto").innerHTML =
                `<h2>Gráfico Diodo Zenner</h2>
                <p>Diodo que funciona normalmente quando polarizado diretamente, mas quando é inversamente, ele conduz quando chega no Vz.<br>
                    Variáveis usadas: tensaoZenner`;
            for (let i = -tensaoZenner-1; i <= tensaoZenner+1; i += 0.01) {
                coordenadasx.push(i);
                if (i >= 0) {
                    coordenadasy.push(1e-12 * (Math.exp(i / 0.02585) - 1));
                } else if (i <= tensaoZenner) {
                    coordenadasy.push(-1e-3 * (Math.exp((Math.abs(i) - Math.abs(tensaoZenner)) / 0.01) - 1));
                } else {
                    coordenadasy.push(1e-12);
                }
            }

            dados = [{x: coordenadasx, y: coordenadasy, mode: 'lines', line: {color: 'blue'}}];
            layout = {
                title: 'Gráfico Diodo Zenner',
                xaxis: {title: 'Tensão (V)', range: [-tensaoZenner-1, tensaoZenner+1], zeroline: true},
                yaxis: {title: 'Corrente (A)', range: [-tensaoZenner-1, tensaoZenner+1], zeroline: true}
            };
            Plotly.newPlot('grafico', dados, layout);
            break;
    }
}