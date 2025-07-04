<script setup>
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

onSuccess();
</script>

<template>
  <BaseContainer height="100%">
    <van-empty image="error" description="不支持的文件类型" />
  </BaseContainer>
</template>

<style scoped>
.preview-image__image {
  display: block;
  width: 100%;
}
</style>