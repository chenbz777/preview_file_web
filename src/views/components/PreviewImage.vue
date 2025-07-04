<script setup>
import { ref } from 'vue';
import utilEnhance from '@/utils/utilEnhance';
import { showImagePreview } from 'vant';


const props = defineProps({
  url: {
    required: true,
    type: String,
    default: ''
  }
});

const imageList = [props.url];

const showPreview = ref(false);

const emit = defineEmits(['success', 'error']);

function onSuccess() {
  emit('success');
}

function onError() {
  emit('error');
}

function handleImagePreview() {
  if (utilEnhance.isMobile()) {
    showImagePreview(imageList);

    return;
  }

  showPreview.value = true;
}
</script>

<template>
  <BaseContainer height="100%" class="preview-file">
    <div class="preview-file__content">
      <img :src="url" alt="" class="preview-file__image" @load="onSuccess" @error="onError" />
    </div>

    <el-image-viewer v-if="showPreview" :url-list="imageList" @close="showPreview = false" />

    <template #foot>
      <div class="foot">
        <div class="btn btn--primary flex-1" @click="handleImagePreview()">
          查看原图
        </div>
        <div class="btn ml-2" @click="utilEnhance.downloadFile(url)">
          下载
        </div>
      </div>
    </template>
  </BaseContainer>
</template>

<style scoped>
.preview-file__image {
  display: block;
  width: 100%;
}
</style>