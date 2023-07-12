<template>
  <div class="dashboard">
    <div class="dashboard-canvas" id="dashboard">
      <CanvasBg>
        <CanvasPanel></CanvasPanel>
      </CanvasBg>

      <CanvasSlider></CanvasSlider>
      <CanvasThumbnail></CanvasThumbnail>
    </div>
    <div class="dashboard-top"></div>
    <div class="dashboard-left"></div>
    <div class="dashboard-right"></div>
  </div>
</template>

<script lang="ts">
  import CanvasPanel from './CanvasPanel.vue';
  import CanvasThumbnail from './canvas-bg/CanvasThumbnail.vue';
  import CanvasSlider from './canvas-bg/CanvasSlider.vue';
  import CanvasBg from './canvas-bg/CanvasBg.vue';

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'DatapexDashboard',
    components: {
      CanvasThumbnail,
      CanvasBg,
      CanvasSlider,

      CanvasPanel
    },
    setup() {
      return {};
    }
  });
</script>
<style lang="scss" src="@/assets/vars.scss"></style>
<style lang="scss" scoped>
  .dashboard {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
  }
  .dashboard-canvas {
    background: url(../assets/images/point.svg);
    top: 60px;
    height: calc(100% - 60px);
    overflow: hidden;
    position: absolute;
    left: 200px;
    width: calc(100% - 500px);
  }
  .dashboard-top {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 60px;
    width: 100%;
    background-color: dodgerblue;
  }
  .dashboard-left {
    position: absolute;
    left: 0px;
    top: 60px;
    height: calc(100% - 60px);
    width: 200px;
    overflow: hidden;
    background-color: yellowgreen;
  }
  .dashboard-right {
    position: absolute;
    right: 0px;
    top: 60px;
    height: calc(100% - 60px);
    width: 300px;
    overflow: hidden;
    background-color: gold;
  }
</style>
