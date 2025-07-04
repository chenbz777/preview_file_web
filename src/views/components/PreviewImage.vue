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
      <img :src="url" alt="" class="preview-file__image" @load="onSuccess" @error="onError"
        @click="handleImagePreview()" />
    </div>

    <el-image-viewer v-if="showPreview" :url-list="imageList" @close="showPreview = false" />

    <template #head>
      <div class="tips">
        点击图片可以预览大图
      </div>
    </template>
  </BaseContainer>
</template>

<style scoped>
.preview-file__image {
  display: block;
  width: 100%;
}

.tips {
  padding: var(--p-1) var(--p-2);
  padding-bottom: 0;
  color: var(--text-secondary-color);
  font-size: var(--fs-2);
}
</style>