let departamentos = ["TI", "RH", "Financeiro", "Administração"];
var dados = '<%= teste %>';
let colorHex = ['#FB3640', '#EFCA08', '#43AA8B', '#253D5B'];
console.log(dados);

var ctx = document.getElementById("myPieChart").getContext('2d');
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    datasets: [{
      data: dados,
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#34a2ff'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
    labels: departamentos
  },
  options: {
    responsive: true,
    legend: {
      labels: {
          fontColor: "white",
          fontSize: 18
      }
  },
    animation: {
      duration: 1500,
      easing: 'easeInQuint',
    },
    plugins: {

      datalabels: {
        color: '#fff',
        /*anchor: 'end',
        align: 'start',
        offset: -10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 25,*/
        backgroundColor: (context) => {
          return context.dataset.backgroundColor;
        },
        font: {
          weight: 'bold',
          size: '15'
        },
        formatter: (value) => {
          return value + '%';
        }
      }
    }
  }
});
