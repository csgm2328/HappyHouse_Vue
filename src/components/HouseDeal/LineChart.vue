<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    props : ['datacollection', 'options', 'data'],
    mounted () {
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>
