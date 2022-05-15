// 寫死啦~ 懶得整到資料庫..
// 周星星：https://randomuser.me/api/portraits/men/3.jpg
// 王進：https://randomuser.me/api/portraits/men/19.jpg
// 唐伯虎：https://randomuser.me/api/portraits/men/4.jpg
// 光頭王：https://randomuser.me/api/portraits/men/5.jpg
const images = [
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/19.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
];
const API_URL = "https://hexschool.github.io/escape-vote/vote.json";
const people = {
  star: 0,
  gin: 0,
  tiger: 0,
  bold: 0,
};
const fetchData = async () => {
  const data = await (await fetch(API_URL)).json();
  data.forEach((item) => {
    people.star += item.周星星;
    people.gin += item.王進;
    people.tiger += item.唐伯虎;
    people.bold += item.光頭王;
  });
};

const chart = async () => {
  await fetchData();
  new Chart(document.getElementById("myChart"), {
    type: "bar",
    plugins: [
      {
        afterDraw: (chart) => {
          var ctx = chart.chart.ctx;
          var xAxis = chart.scales["x-axis-0"];
          var yAxis = chart.scales["y-axis-0"];
          xAxis.ticks.forEach((value, index) => {
            var x = xAxis.getPixelForTick(index);
            var image = new Image();
            (image.src = images[index]),
              ctx.drawImage(image, x - 65, yAxis.bottom + 20);
          });
        },
      },
    ],

    data: {
      labels: ["周星星", "王進", "唐伯虎", "光頭王"],
      datasets: [
        {
          label: "大港市議員競選投票結果",
          data: [people.star, people.gin, people.tiger, people.bold],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              padding: 140,
            },
          },
        ],
      },
    },
  });
};

chart();
