<script setup>
import VueOfficePptx from '@vue-office/pptx';


defineProps({
  url: {
    required: true,
    type: String,
    default: ''
  }
});

const emit = defineEmits(['success', 'error']);

function onSuccess() {
  emit('success');
}

function onError(e) {
  console.log('e: ', e);
  emit('error');
}
</script>

<template>
  <BaseContainer height="100%" class="preview-file">
    <div class="preview-file__content">
      <VueOfficePptx :src="url" @rendered="onSuccess" @error="onError" class="preview-file__ppt" />
    </div>
  </BaseContainer>
</template>

<style scoped>
.preview-file__ppt {
  height: 100%;
}

:deep(.pptx-preview-wrapper) {
  background-color: transparent !important;
}
</style>