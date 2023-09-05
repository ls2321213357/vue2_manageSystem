<template>
  <div>
    <h1>{{ title }}</h1>
    <span>数组为:</span>
    <span v-for="(item, index) in tableListInfo" :key="index">
      {{ item }}
    </span>
    <button @click="clearArray">清空数组</button>
    <canvas
      id="canvas"
      style="display: block; margin: 0 auto; border: 1px solid #ccc"
    >
      你的浏览器不支持canvas
    </canvas>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Mall',
  data() {
    return {
      title: '这是商品页面',
      tableList: [], // 定义一个私有的tableList属性
    };
  },
  mounted() {
    var image = new Image();
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var scale = 1.0;
    // 加载图片
    image.src = './image/1.jpg'; // 替换为实际的图片路径
    image.onload = function () {
      drawImage();
    };

    // 绘制图片
    function drawImage() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      var width = image.width * scale;
      var height = image.height * scale;
      var x = (canvas.width - width) / 2;
      var y = (canvas.height - height) / 2;
      context.drawImage(image, x, y, width, height);
    }

    // 监听鼠标滚轮事件
    canvas.addEventListener('wheel', function (event) {
      event.preventDefault();
      var delta = Math.sign(event.deltaY); // 获取滚动方向
      if (delta > 0) {
        scale *= 1.2; // 向下滚动缩小图片
      } else {
        scale *= 0.8; // 向上滚动放大图片
      }
      drawImage();
    });
  },
  computed: {
    tableListInfo: {
      get() {
        let data = [];
        for (let i = 1; i <= 10; i++) {
          data.push(i);
        }
        return data;
      },
      set(value) {
        this.tableList = value;
      },
    },
  },
  methods: {
    clearArray() {
      this.tableList = [];
    },
  },
};
</script>

<style></style>
