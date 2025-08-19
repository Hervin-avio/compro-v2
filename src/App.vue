<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from './layouts/DefaultLayout.vue'
import BlankLayout from './layouts/BlankLayout.vue'

// Ambil route aktif
const route = useRoute()

// Mapping nama layout ke komponen layout
const layouts = {
  DefaultLayout,
  BlankLayout
}

// Tentukan layout yang sedang aktif
const currentLayout = computed(() => {
  const layoutName = route.meta.layout || 'DefaultLayout'
  return layouts[layoutName] || DefaultLayout
})
</script>

<template>
  <!-- Gunakan layout yang dipilih -->
  <component :is="currentLayout" />
</template>
