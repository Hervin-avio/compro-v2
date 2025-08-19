<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNavbar />
    <main class="flex-grow p-6 pt-20">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
