<template>
  <canvas
    class="canvas-thumbnail"
    :width="canvasConfig.thumbnailWrapWidth"
    :height="canvasConfig.thumbnailWrapHeight"
    ref="thumbnailRef"
    v-show="showThumbnail"
    @mousedown="onMoveStart"
    @mousemove="onMove"
    @mouseup="onMoveEnd"
    @mouseleave="onMoveEnd"
  >
  </canvas>
</template>

<script lang="ts">
  import { useEditorStore } from '@/stores/editor';
  import {
    defineComponent,
    ref,
    computed,
    reactive,
    watch,
    onMounted,
    nextTick,
    onBeforeUnmount
  } from 'vue';
  export default defineComponent({
    name: 'CanvasThumbnail',
    setup(props, context) {
      const editorStore = useEditorStore();
      const thumbnailRef = ref();
      const canvasConfig = computed(() => editorStore.canvasConfig);
      let isLock = false;
      const viewBox = computed({
        get: () => ({ viewWidth: editorStore.viewWidth, viewHeight: editorStore.viewHeight }),
        set: (v) => {
          editorStore.setViewBox(v);
        }
      });
      const unscale = computed(() => {
        if (editorStore.scale > 100) {
          return 1 / editorStore.thumbnailSize;
        } else {
          return 10;
        }
      });

      const getViewBox = () => {
        nextTick(() => {
          let dashboardDom = document.getElementById('dashboard');
          if (!dashboardDom) {
            return;
          }
          viewBox.value.viewWidth = dashboardDom.offsetWidth;
          viewBox.value.viewHeight = dashboardDom.offsetHeight;
          drawThumbnail();
        });
      };
      const drawThumbnail = () => {
        if (!isLock) {
          isLock = true;
          nextTick(() => {
            let startLen = 6;

            const ctx = thumbnailRef.value.getContext('2d');
            ctx.clearRect(
              0,
              0,
              canvasConfig.value.thumbnailWrapWidth,
              canvasConfig.value.thumbnailWrapHeight
            );
            ctx.beginPath();
            ctx.fillStyle = 'rgba(26, 103, 255, 0.5)';
            ctx.rect(
              startLen,
              startLen,
              canvasConfig.value.thumbnailWidth,
              canvasConfig.value.thumbnailHeight
            );
            ctx.fill();
            ctx.beginPath();
            ctx.strokeStyle = '#1a67ff';
            ctx.rect(
              Math.round(editorStore.scrollLeft * editorStore.thumbnailSize),
              Math.round(editorStore.scrollTop * editorStore.thumbnailSize),
              viewBox.value.viewWidth * editorStore.thumbnailSize,
              viewBox.value.viewHeight * editorStore.thumbnailSize
            );
            ctx.stroke();

            isLock = false;
          });
        }
      };
      watch(
        () => editorStore.scale,
        () => {
          drawThumbnail();
        }
      );
      watch(
        () => editorStore.screenWidth,
        () => {
          drawThumbnail();
        }
      );
      watch(
        () => editorStore.screenHeight,
        () => {
          drawThumbnail();
        }
      );
      watch(
        () => editorStore.scrollLeft,
        () => {
          drawThumbnail();
        }
      );
      watch(
        () => editorStore.scrollTop,
        () => {
          drawThumbnail();
        }
      );

      watch(
        () => editorStore.screenHeight,
        () => {
          drawThumbnail();
        }
      );
      watch(
        () => editorStore.viewHeight,
        () => {
          drawThumbnail();
        }
      );
      watch(
        () => editorStore.viewWidth,
        () => {
          drawThumbnail();
        }
      );

      onMounted(() => {
        window.addEventListener('resize', getViewBox);
        getViewBox();
      });
      onBeforeUnmount(() => {
        window.removeEventListener('resize', getViewBox);
      });
      let moveInfo = {
        startX: 0,
        startY: 0,
        isMove: false
      };
      return {
        canvasConfig,
        thumbnailRef,
        showThumbnail: computed(() => editorStore.isThumbnail),
        onMoveStart: (e: MouseEvent) => {
          moveInfo.isMove = true;
          moveInfo.startX = e.clientX;
          moveInfo.startY = e.clientY;
        },
        onMove: (e: MouseEvent) => {
          if (moveInfo.isMove) {
            let left = editorStore.scrollLeft + (e.clientX - moveInfo.startX) * unscale.value;
            let top = editorStore.scrollTop + (e.clientY - moveInfo.startY) * unscale.value;
            // console.log('thumbnail', left, top);
            editorStore.setScroll({ left, top });
            moveInfo.startX = e.clientX;
            moveInfo.startY = e.clientY;
          }
        },
        onMoveEnd: () => {
          moveInfo.isMove = false;
        }
      };
    }
  });
</script>
<style lang="scss" scoped>
  .canvas-thumbnail {
    background-color: var(--thumbnail-wrap-bg);
    position: fixed;
    right: 310px;
    bottom: 48px;
    z-index: 9;
    cursor: move;
  }
</style>
