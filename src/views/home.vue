<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { ElLoading } from 'element-plus';
import MobileEasyHead from './components/MobileEasyHead.vue';


const route = useRoute();

const url = ref(decodeURIComponent(route.query.url || ''));

const fileSuffixToFileIcon = {
  'pdf': 'pdf',
  'doc': 'word',
  'docx': 'word',
  'xls': 'excel',
  'xlsx': 'excel',
  'ppt': 'ppt',
  'pptx': 'ppt',
  'zip': 'zip',
  'rar': 'zip',
  '7z': 'zip',
  'txt': 'txt',
  'jpg': 'image',
  'jpeg': 'image',
  'png': 'image',
  'gif': 'image',
  'bmp': 'image',
  'mp3': 'audio',
  'wav': 'audio',
  'wma': 'audio',
  'mp4': 'video',
  'avi': 'video',
  'rmvb': 'video',
  'rm': 'video',
  'flv': 'video',
  'swf': 'video',
  'wmv': 'video'
};

function getFileInfo(url) {
  // 去除查询参数
  const cleanUrl = url.split('?')[0];

  // 提取文件名（含后缀）
  const fileName = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1);

  // 提取文件类型（后缀）
  const dotIndex = fileName.lastIndexOf('.');
  const fileType = dotIndex !== -1 ? fileName.substring(dotIndex + 1).toLowerCase() : '';

  return {
    fileName,
    fileType: fileSuffixToFileIcon[fileType] || 'file'
  };
}

const componentList = {
  image: defineAsyncComponent(() => import('./components/PreviewImage.vue')),
  word: defineAsyncComponent(() => import('./components/PreviewDocx.vue')),
  excel: defineAsyncComponent(() => import('./components/PreviewExcel.vue')),
  ppt: defineAsyncComponent(() => import('./components/PreviewPpt.vue')),
  pdf: defineAsyncComponent(() => import('./components/PreviewPdf.vue')),
  file: defineAsyncComponent(() => import('./components/PreviewFile.vue'))
};

const componentName = ref('');

const title = ref('');

const loadingInstance = ElLoading.service({
  fullscreen: true,
  text: '加载中...',
  background: 'rgba(0, 0, 0, 0.7)'
});

onMounted(() => {
  if (!route.query.url) {
    loadingInstance.close();
    isError.value = true;
  }

  const { fileName, fileType } = getFileInfo(url.value);

  componentName.value = fileType;

  if (!componentList[fileType]) {
    componentName.value = 'file'; // 默认使用文件预览组件
  }

  title.value = fileName;
});

const isError = ref(false);

function onSuccess() {
  isError.value = false;
  loadingInstance.close();
}

function onError() {
  isError.value = true;
  loadingInstance.close();
}

// 下载文件
function downloadFile() {
  const a = document.createElement('a');
  a.href = url.value;
  a.download = title.value;
  a.click();
}
</script>

<template>
  <BaseContainer height="100vh" class="preview" v-if="url">
    <template #head>
      <MobileEasyHead :title="title">
        <template #right>
          <div @click="downloadFile()">下载</div>
        </template>
      </MobileEasyHead>
    </template>

    <component :is="componentList[componentName]" :url="url" @success="onSuccess" @error="onError"
      v-if="!isError && componentName && componentList[componentName]" />

    <van-empty image="error" description="文件存在不兼容情况，请下载浏览" v-if="isError" />

    <template #foot>
      <div class="foot">
        <div class="btn btn--block" @click="downloadFile()" v-if="isError">下载文件</div>
      </div>
    </template>
  </BaseContainer>

  <van-empty image="error" description="参数url为空" v-if="!url" />
</template>

<style scoped>
.preview {
  background-color: var(--bg-tertiary-color);
}

.foot {
  padding: var(--p-2);
}
</style>
