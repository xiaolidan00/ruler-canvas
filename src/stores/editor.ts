import { defineStore } from 'pinia';

export const useEditorStore = defineStore('editor', {
  state: () => ({
    isMoveCanvas: false,
    isThumbnail: true,
    viewWidth: 1000,
    viewHeight: 800,
    scale: 100, //缩放
    scrollTop: 0,
    scrollLeft: 0,
    screenWidth: 1920,
    screenHeight: 1080,

    //bg
    backgroundColor: '#FFFFFF',
    backgroundImage: ''
  }),
  getters: {
    scale() {
      return this.$state.scale;
    },
    percent() {
      return this.scale * 0.01;
    },
    thumbnailSize() {
      if (this.scale > 100) {
        return 10 / this.scale;
      } else {
        return 0.1;
      }
    },
    viewWidth() {
      return this.$state.viewWidth;
    },
    viewHeight() {
      return this.$state.viewHeight;
    },
    scrollTop() {
      return this.$state.scrollTop;
    },
    scrollLeft() {
      return this.$state.scrollLeft;
    },
    screenWidth() {
      return this.$state.screenWidth;
    },
    screenHeight() {
      return this.$state.screenHeight;
    },

    showWidth() {
      return this.screenWidth * (this.scale < 100 ? 1 : this.percent) + 400;
    },
    showHeight() {
      return this.screenHeight * (this.scale < 100 ? 1 : this.percent) + 400;
    },
    isMoveCanvas() {
      return this.$state.isMoveCanvas;
    },
    canvasConfig() {
      return {
        thumbnailWidth: Math.ceil(this.screenWidth * this.thumbnailSize * this.percent),
        thumbnailHeight: Math.ceil(this.screenHeight * this.thumbnailSize * this.percent),
        thumbnailWrapWidth: Math.ceil(this.showWidth * this.thumbnailSize),
        thumbnailWrapHeight: Math.ceil(this.showHeight * this.thumbnailSize)
      };
    }
  },
  actions: {
    setViewBox(data: { width: number; height: number }) {
      this.$state.viewWidth = data.width;
      this.$state.viewHeight = data.height;
    },
    setScroll({ left, top }: { left: number; top: number }) {
      const distance = 60;
      if (left < 0) {
        left = 0;
      } else if (left > this.showWidth - this.viewWidth - distance) {
        left = this.showWidth - this.viewWidth - distance;
      }
      if (top < 0) {
        top = 0;
      } else if (top > this.showHeight - this.viewHeight - distance) {
        top = this.showHeight - this.viewHeight - distance;
      }

      this.$state.scrollLeft = Math.round(left);
      this.$state.scrollTop = Math.round(top);
    },
    setMoveCanvas(data: boolean) {
      this.$state.isMoveCanvas = data;
    },
    setScale(data: number) {
      this.$state.scale = data;
    },
    setThumbnail(data: boolean) {
      this.$state.isThumbnail = data;
    }
  }
});
