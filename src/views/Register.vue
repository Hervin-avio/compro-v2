<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6">Register</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Nama -->
        <div>
          <label class="block text-gray-700 font-medium mb-1" for="name">Full Name</label>
          <input
            id="name"
            type="text"
            v-model="name"
            required
            placeholder="Enter your full name"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

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
          Register
        </button>
      </form>

      <p class="text-sm text-gray-600 mt-4 text-center">
        Already have an account?
        <a href="/login" class="text-blue-500 hover:underline">Login here</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

const handleRegister = () => {
  if (!name.value || !email.value || !password.value) {
    alert('Please fill in all fields!')
    return
  }

  // logika registrasi
  console.log('Name:', name.value)
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  alert('Registration successful! (simulasi)')
}
</script>
