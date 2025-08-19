<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  if (!email.value || !password.value) {
    alert('Please fill in all fields!')
    return
  }

  // logika login bisa disesuaikan
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  alert('Login berhasil! (simulasi)')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>

      <!-- Form Login -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-gray-700 font-medium mb-1" for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            placeholder="Enter your email"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-700 font-medium mb-1" for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="Enter your password"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>

      <!-- Lupa Password -->
      <p class="text-sm text-gray-600 mt-4 text-center">
        Forgot your password?
        <router-link to="/reset" class="text-blue-500 hover:underline">Reset here</router-link>
      </p>

      <!-- Belum punya akun -->
      <p class="text-sm text-gray-600 mt-2 text-center">
        Don't have an account?
        <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
      </p>

      <!-- Kembali ke Home -->
      <p class="text-sm text-gray-600 mt-2 text-center">
        Back to Home?
        <router-link to="/" class="text-blue-500 hover:underline">Home</router-link>
      </p>


    </div>
  </div>
</template>


