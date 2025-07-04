<script setup>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import utilEnhance from '@/utils/utilEnhance';

// 文件链接
const url = ref('');

// 编码后的链接
const encodingUrl = ref('');

watch(() => url.value, (_url) => {
  if (!_url) {
    encodingUrl.value = '';
    return;
  }

  encodingUrl.value = `${window.location.origin}?url=${encodeURIComponent(_url)}`;
});

// 复制编码后链接
async function copyEncodingUrl() {
  if (!url.value) {
    ElMessage.error('请输入或复制链接');
    return;
  }

  try {
    utilEnhance.copyText(encodingUrl.value);
    ElMessage.success('已复制到剪切板');
  } catch (error) {
    ElMessage.error('复制失败，请手动复制编码后链接');
  }
}

// 读取剪切板内容
async function readClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    url.value = text;
  } catch (error) {
    ElMessage.error('读取剪切板失败，请手动输入或复制链接');
  }
}
</script>

<template>
  <BaseContainer height="100vh" class="encoding">
    <div class="encoding__title">文件链接</div>
    <el-input v-model="url" :rows="8" type="textarea" placeholder="" />

    <div class="encoding__title">编码后链接</div>
    <el-input v-model="encodingUrl" :rows="8" type="textarea" placeholder="" />

    <template #foot>
      <div class="foot">
        <div class="btn btn--primary flex-1 mr-2" @click="copyEncodingUrl()">
          复制编码后链接
        </div>
        <div class="btn" @click="readClipboard()">
          读取剪切板写入文件链接
        </div>
      </div>
    </template>
  </BaseContainer>
</template>

<style scoped>
.encoding {
  /* background-color: var(--bg-tertiary-color); */
  padding: var(--p-2);
}

.encoding__title {
  font-size: var(--fs-4);
  margin-top: var(--m-4);
  margin-bottom: var(--m-2);
  font-weight: 600;
}

.foot {
  padding-top: var(--p-2);
  border-top: 1px solid var(--border-base-color);
  display: flex;
}
</style>