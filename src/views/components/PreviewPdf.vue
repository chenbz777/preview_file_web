<script setup>
//引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf';


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
      <VueOfficePdf :src="url" @rendered="onSuccess" @error="onError" class="preview-file__pdf" />
    </div>
  </BaseContainer>
</template>

<style scoped>
.preview-file__pdf {
  height: 100%;
}

:deep(.vue-office-pdf-wrapper) {
  padding: 0 !important;
  background-color: transparent !important;
}
</style>