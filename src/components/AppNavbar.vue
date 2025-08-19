<script setup>
import { ref } from "vue"

const isOpen = ref(false)
</script>

<template>
  <nav class="bg-blue-600 shadow-md fixed top-0 left-0 w-full z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-2 text-white font-bold text-xl">
          <span class="text-2xl">🚀</span>
          <span>Balanja</span>
        </div>

        <!-- Mobile menu toggle -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen" class="text-white">
            <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Menu desktop -->
        <div class="hidden md:flex space-x-6">
          <router-link to="/" class="text-white hover:text-yellow-300" exact>Home</router-link>
          <router-link to="/services" class="text-white hover:text-yellow-300">Services</router-link>
          <router-link to="/gallery" class="text-white hover:text-yellow-300">Gallery</router-link>
          <router-link to="/about" class="text-white hover:text-yellow-300">About</router-link>
          <router-link to="/contact" class="text-white hover:text-yellow-300">Contact</router-link>
          <router-link to="/login" class="text-white hover:text-yellow-300">Login</router-link>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="isOpen" class="md:hidden pb-4 space-y-2">
        <router-link to="/" class="block text-white hover:text-yellow-300" exact>Home</router-link>
        <router-link to="/services" class="block text-white hover:text-yellow-300">Services</router-link>
        <router-link to="/gallery" class="block text-white hover:text-yellow-300">Gallery</router-link>
        <router-link to="/about" class="block text-white hover:text-yellow-300">About</router-link>
        <router-link to="/contact" class="block text-white hover:text-yellow-300">Contact</router-link>
        <router-link to="/login" class="block text-white hover:text-yellow-300">Login</router-link>
      </div>
    </div>
  </nav>
</template>
