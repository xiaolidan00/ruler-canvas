<template>
  <div class="canvas-bg" :style="bgStyle">
    <div :style="canvasStyle" class="canvas-panel-wrap">
      <slot></slot>
    </div>

    <canvas ref="topRulerRef" class="canvas-ruler top" :style="topStyle"></canvas>
    <canvas ref="leftRulerRef" class="canvas-ruler left" :style="leftStyle"></canvas>
    <i class="canvas-ruler-cross"></i>

    <div
      class="canvas-move"
      v-show="isMoveCanvas"
      @mousedown="onMoveCanvasDown"
      @mouseup="onMoveCanvasUp"
    ></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, computed, watch, nextTick, onBeforeUnmount } from 'vue';
  import { drawRuler } from './drawRuler.ts';
  import { useEditorStore } from '@/stores/editor';
  import { keyCode } from '@/data/keyCode';

  export default defineComponent({
    name: 'CanvasBg',

    setup() {
      const editorStore = useEditorStore();
      const topRulerRef = ref();
      const leftRulerRef = ref();
      const isMoveCanvas = computed(() => editorStore.isMoveCanvas);
      watch(
        () => editorStore.screenWidth,
        () => {
          refreshRuler();
        }
      );
      watch(
        () => editorStore.screenHeight,
        () => {
          refreshRuler();
        }
      );
      watch(
        () => editorStore.scale,
        () => {
          refreshRuler();
        }
      );

      let isRuler = false;
      const refreshRuler = () => {
        if (!isRuler) {
          isRuler = true;
          nextTick(() => {
            drawRuler('top', topRulerRef.value, editorStore.scale, editorStore.showWidth, 24, 60);
            drawRuler('left', leftRulerRef.value, editorStore.scale, editorStore.showWidth, 24, 60);
            isRuler = false;
          });
        }
      };
      const scrollLeft = computed(() => {
        return editorStore.scrollLeft - 24;
      });
      const scrollTop = computed(() => {
        return editorStore.scrollTop - 24;
      });
      const onKeyAction = (e: KeyboardEvent) => {
        if (e.keyCode == keyCode.space) {
          editorStore.setMoveCanvas(!editorStore.isMoveCanvas);
        }
      };
      const onWheelAction = (e: WheelEvent) => {
        if (isMoveCanvas.value) {
          if (e.wheelDelta > 0) {
            editorStore.setScale(editorStore.scale + 1);
          } else {
            editorStore.setScale(editorStore.scale - 1);
          }
        }
      };
      onMounted(() => {
        window.addEventListener('keydown', onKeyAction);
        window.addEventListener('wheel', onWheelAction);
        refreshRuler();
      });
      onBeforeUnmount(() => {
        window.removeEventListener('keydown', onKeyAction);
        window.removeEventListener('wheel', onWheelAction);
      });
      let moveInfo = {
        startX: 0,
        startY: 0
      };
      return {
        topRulerRef,
        leftRulerRef,
        topStyle: computed(() => ({
          left: -scrollLeft.value + 'px'
        })),
        leftStyle: computed(() => ({ top: -scrollTop.value + 'px' })),
        isMoveCanvas,
        bgStyle: computed(() => ({
          width: editorStore.showWidth + 'px',
          height: editorStore.showHeight + 'px'
        })),
        canvasStyle: computed(() => ({
          left: -scrollLeft.value + 'px',
          top: -scrollTop.value + 'px',
          width: editorStore.screenWidth + 'px',
          height: editorStore.screenHeight + 'px',
          transform: `scale(${editorStore.scale * 0.01})`
        })),
        scrollLeft,
        scrollTop,
        onMoveCanvasDown: (e: MouseEvent) => {
          e.stopPropagation();

          moveInfo = {
            startX: e.clientX,
            startY: e.clientY
          };
        },
        onMoveCanvasUp: (e: MouseEvent) => {
          e.stopPropagation();
          let left = scrollLeft.value - (e.clientX - moveInfo.startX);
          let top = scrollTop.value - (e.clientY - moveInfo.startY);
          //   console.log('move', left, top);
          editorStore.setScroll({ left, top });
        }
      };
    }
  });
</script>

<style lang="scss" scoped>
  .canvas-ruler-cross {
    display: inline-block;
    width: 24px;
    height: 24px;
    position: absolute;

    background-color: var(--ruler-bg);
  }
  .canvas-panel-wrap {
    position: absolute;
    box-shadow: var(--canvas-shadow) 0 0 30px 0;
    transform-origin: left top;
    margin-left: 60px;
    margin-top: 60px;
  }
  .canvas-move {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: var(--move-bg);
    cursor: move;
  }

  .canvas-ruler {
    position: absolute;
    transform-origin: left top;
    // cursor: ew-resize;
    background-color: var(--ruler-bg);

    &.left {
      top: 24px;
      left: 0px;
    }

    &.top {
      top: 0px;
      left: 24px;
    }
  }
</style>
