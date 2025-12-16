<script setup>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx';
//引入相关样式
import '@vue-office/docx/lib/index.css';


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

function onError() {
  emit('error');
}
</script>

<template>
  <BaseContainer height="100%" class="preview-file">
    <div class="preview-file__content">
      <VueOfficeDocx :src="url" @rendered="onSuccess" @error="onError" class="preview-file__docx" />
    </div>
  </BaseContainer>
</template>

<style scoped>
.preview-file__docx {
  height: 100%;
}

:deep(.docx-wrapper>section.docx) {
  box-shadow: none !important;
}

:deep(.docx-wrapper) {
  padding: 0 !important;
  background-color: transparent !important;
}

:deep(section.docx) {
  overflow: auto;
}
</style>