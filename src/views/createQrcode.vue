<script setup>
import { ref, onMounted } from 'vue';
import MobileEasyHead from './components/MobileEasyHead.vue';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { useRoute } from 'vue-router';

const route = useRoute();

const imageUrl = ref('');

const fileName = ref('');

onMounted(() => {
  if (!route.query.url) {
    return;
  }

  fileName.value = decodeURIComponent(route.query.fileName);

  const url = decodeURIComponent(route.query.url);

  let previewUrl = `${window.location.origin}/?url=${encodeURIComponent(url)}`;

  if (route.query.title) {
    previewUrl += `&title=${route.query.title}`;
  }

  const qrOptions = {
    width: 500,
    height: 500,
    margin: 2,
    color: {
      dark: '#000000ff',  // 黑点
      light: '#ffffffff'  // 背景
    }
  };

  QRCode.toDataURL(previewUrl, qrOptions).then(url => {
    imageUrl.value = url;
  });
});

// 下载已发布问卷二维码
function downloadQrCode(domId) {
  html2canvas(document.getElementById(domId), {
    background: '#ffffff',
    dpi: 350,
    scale: 3
  }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `${fileName.value}.png`;
    a.click();
  });
}

</script>

<template>
  <BaseContainer height="100vh" class="create-qrcode">
    <template #head>
      <MobileEasyHead title="预览二维码">
      </MobileEasyHead>
    </template>

    <div class="content">
      <div class="qrdom" id="qrdom">
        <img :src="imageUrl" alt="二维码" class="create-qrcode__image" v-if="imageUrl" />
        <div v-if="fileName" class="create-qrcode__file-name">{{ fileName }}</div>
      </div>
    </div>

    <template #foot>
      <div class="foot">
        <div class="btn btn--block" @click="downloadQrCode('qrdom')">下载</div>
      </div>
    </template>
  </BaseContainer>
</template>

<style scoped>
.create-qrcode {
  background-color: var(--bg-tertiary-color);
}

.content {
  padding: var(--p-2);
}

.foot {
  padding: var(--p-2);
  padding-top: 0;
}

.qrdom {
  background-color: #ffffff;
  border-radius: var(--br-2);
  overflow: hidden;
}

.create-qrcode__image {
  display: block;
  width: 100%;
}

.create-qrcode__file-name {
  text-align: center;
  color: var(--text-primary-color);
  font-size: var(--fs-3);
  font-weight: 500;
  word-break: break-all;
  padding: var(--p-1);
  padding-bottom: var(--p-3);
}
</style>