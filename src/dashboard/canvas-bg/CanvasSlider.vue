<template>
  <div class="canvas-slider">
    <el-tooltip placement="top" effect="light">
      <template #content>
        <div class="operation-tip-item">
          <div>按下空格键，可移动画布</div>
          <div>按下空格键，滚动鼠标滑轮可放缩画布</div>
        </div>
      </template>
      <i class="el-icon-thumb" />
    </el-tooltip>
    <el-input-number v-model="scalePercent" :min="20" :max="200" size="small"></el-input-number>
    <el-slider
      size="small"
      v-model="scalePercent"
      :min="20"
      :max="200"
      :step="5"
      style="width: 100px; margin: 0 12px"
    ></el-slider>

    <el-tooltip placement="top">
      <template #content> 实际大小 </template>
      <i class="el-icon-full-screen" @click="onRealCanvas" />
    </el-tooltip>
    <el-tooltip placement="top">
      <template #content> 适应屏幕大小 </template>
      <i class="el-icon-aim" @click="onFitCanvas" />
    </el-tooltip>
    <i
      class="el-icon-monitor"
      :style="{ color: showThumbnail ? 'dodgerblue' : 'rgba(0,0,0,0.5)' }"
      @click="onMagic"
    ></i>
  </div>
</template>

<script lang="ts">
  import { useEditorStore } from '@/stores/editor';

  import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';

  //下方状态栏
  export default defineComponent({
    name: 'CanvasSlider',
    setup() {
      const store = useEditorStore();

      const scalePercent = computed({
        get: () => store.scale,
        set: (value) => {
          store.setScale(value);
        }
      });
      const showThumbnail = computed({
        get: () => store.$state.isThumbnail,
        set: (value) => {
          store.setThumbnail(value);
        }
      });

      const onFitCanvas = () => {
        store.setScale(
          parseInt(
            //@ts-ignore
            ((document.getElementById('dashboard').offsetHeight - 84) / store.screenHeight) * 100
          )
        );
      };
      const onRealCanvas = () => {
        store.setScale(100);
      };
      const onMagic = () => {
        showThumbnail.value = !showThumbnail.value;
      };

      return {
        showThumbnail,

        scalePercent,

        //method
        onMagic,
        onFitCanvas,
        onRealCanvas
      };
    }
  });
</script>
<style lang="scss" scoped>
  .operation-tip-item > div {
    color: var(--el-color-primary);
    background: rgba(26, 103, 255, 0.1);
    padding: 5px 10px;
  }

  .operation-tip-item > div:not(:last-child) {
    margin-bottom: 8px;
  }

  i {
    font-size: 16px;
    color: var(--slider-icon);
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  :deep(.el-input-number__decrease) {
    border: none;
    background: none;
  }

  :deep(.el-input-number__increase) {
    border: none;
    background: none;
  }

  :deep(.el-input__wrapper) {
    border: none;
    border-radius: 0;
    background: none;
    box-shadow: none;
  }

  .el-input-number--small {
    width: 84px;
  }

  $line: solid 1px var(--canvas-slider-border);

  .canvas-slider {
    display: flex;
    position: fixed;
    bottom: 10px;
    right: 310px;
    background-color: var(--slider-bg);
    height: 32px;
    justify-content: flex-end;
    align-items: center;
    border: $line;
    z-index: 9;
    border-radius: 2px;
    padding: 0 16px;
  }
</style>
