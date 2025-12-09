<script setup>
import MobileBaseHead from './MobileBaseHead.vue';
import { ArrowLeftBold } from '@element-plus/icons-vue';


defineProps({
  title: {
    type: String,
    default: ''
  }
});

function defaultClickBack() {

  if (window.history.length <= 1) {
    // 关闭当前页面
    window.close();
    return;
  }

  window.history.back();  // 返回上一页
}
</script>

<template>
  <MobileBaseHead class="mobile-easy-head">
    <template #left>
      <div class="mobile-easy-head__left" @click="defaultClickBack()">
        <el-icon class="mobile__head__icon">
          <ArrowLeftBold />
        </el-icon>
        返回
      </div>
    </template>

    <div class="mobile-easy-head__title">{{ title }}</div>

    <template #right>
      <slot name="right"></slot>
    </template>
  </MobileBaseHead>
</template>

<style scoped>
.mobile-easy-head__left {
  display: flex;
  align-items: center;
}

.mobile-easy-head__title {
  font-weight: 600;
  /* 限制1行 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
</style>