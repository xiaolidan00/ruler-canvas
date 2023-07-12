/**
 * 画标尺刻度Canvas
 * @param direction 方向
 * @param canvas canvas DOM
 * @param scale 缩放比例[20-200]
 * @param width 长度
 * @param height 高度
 * @param startLen 开始距离
 */
export function drawRuler(
  direction: string,
  canvas: HTMLCanvasElement,
  scale: number = 100,
  width: number,
  height: number = 24,
  startLen: number = 60
) {
  const padding = 2;
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
  const percent = scale * 0.01;
  let unit = Math.ceil(10 / percent);
  if (unit < 8) {
    unit = 8;
  }
  //计算出要绘制多少个刻度
  const scaleCount = Math.ceil(width + startLen / unit);
  if (direction == 'top') {
    canvas.width = width + startLen;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    //绘制起点
    ctx.strokeStyle = 'rgb(161, 174, 179)';
    ctx.font = '10px Arial';
    ctx.lineWidth = 0.5;
    ctx.moveTo(startLen, 0);
    ctx.lineTo(startLen, height);
    ctx.fillText('0', startLen + padding, 13);

    for (let i = 1; i <= scaleCount; i++) {
      //计算每个刻度的位置
        const step = startLen + Math.round(i * unit * percent);
        //10的倍数刻度大长度
        if (i % 10 === 0) {
          ctx.moveTo(step, 0);
          ctx.lineTo(step, height);
          //标注刻度值
          const scaleText = i * unit + '';
          ctx.fillText(scaleText, step + padding, 13);
        } else if (i % 5 === 0) {//5的倍数刻度中长度
          ctx.moveTo(step, 15);
          ctx.lineTo(step, height);
          //标注刻度值
          const scaleText = i * unit + '';
          ctx.fillText(scaleText, step + padding, 13);
        } else {//其他刻度小长度
          ctx.moveTo(step, height - 2);
          ctx.lineTo(step, height);
        }
      }
      ctx.stroke();
  } else {
    canvas.width = height;
    canvas.height = width + startLen;
    ctx.clearRect(0, 0, height, width + startLen);

    ctx.beginPath();
    //绘制起点
    ctx.strokeStyle = 'rgb(161, 174, 179)';
    ctx.font = '10px Arial';
    ctx.lineWidth = 0.5;
    ctx.moveTo(0, startLen);
    ctx.lineTo(height, startLen);
    ctx.fillText('0', padding, startLen - padding);
    //计算出要绘制多少个刻度

    for (let i = 1; i <= scaleCount; i++) {
      const step = startLen + Math.round(i * unit * percent);
      if (i % 10 === 0) {
        ctx.moveTo(0, step);
        ctx.lineTo(height, step);
        //标注刻度值
        const scaleText = unit * i + '';
        ctx.fillText(scaleText, padding, step - padding);
      } else if (i % 5 === 0) {
        ctx.moveTo(15, step);
        ctx.lineTo(height, step);
        //标注刻度值
        const scaleText = unit * i + '';
        ctx.fillText(scaleText, padding, step - padding);
      } else {
        ctx.moveTo(height - 2, step);
        ctx.lineTo(height, step);
      }
    }
    ctx.stroke();
  }
}
