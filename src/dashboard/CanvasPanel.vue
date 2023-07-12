<template>
  <div id="canvasPanel" class="canvas-panel" :style="canvasStyle">
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>

    <el-row class="mb-4">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </el-row>

    <el-row class="mb-4">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round>Success</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </el-row>
    <el-calendar />
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue';
  import { useEditorStore } from '@/stores/editor';

  export default defineComponent({
    name: 'CanvasPanel',

    setup() {
      const editorStore = useEditorStore();

      onMounted(() => {});
      onBeforeUnmount(() => {});

      return {
        canvasStyle: computed(() => {
          return {
            width: editorStore.screenWidth + 'px',
            height: editorStore.screenHeight + 'px',
            backgroundColor: editorStore.backgroundColor,
            backgroundImage: editorStore.backgroundImage
              ? `url('${editorStore.backgroundImage}')`
              : ''
          };
        })
      };
    }
  });
</script>

<style scoped>
  .canvas-panel {
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
