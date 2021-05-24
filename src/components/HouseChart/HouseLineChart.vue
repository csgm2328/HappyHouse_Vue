<script>
  import { Line, mixins } from 'vue-chartjs'

  const { reactiveProp } = mixins
  export default {
    extends: Line,
    mixins: [ reactiveProp ],
    data () {
      return {
        options: {
            title: {
                display: true,
                text: '월별 평균 거래가 검색'
            },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
