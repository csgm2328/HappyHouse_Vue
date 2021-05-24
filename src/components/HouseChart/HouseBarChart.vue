<script>
  import { HorizontalBar , mixins } from 'vue-chartjs'

  const { reactiveProp } = mixins
  export default {
    extends: HorizontalBar ,
    mixins: [ reactiveProp ],
    data () {
      return {
        // options: {
        //         responsive: true,
        // },
        options: {
          indexAxis: 'y',
          legend: {
            display: true
          },
          maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    stacked: false
                }],
                xAxes: [{
                    stacked: true
                }]
            }
        }
            //         options: {
            // }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>