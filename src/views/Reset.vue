<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6">Reset Password</h1>

      <form @submit.prevent="handleReset" class="space-y-4">
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

        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Send Reset Link
        </button>
      </form>

      <p class="text-sm text-gray-600 mt-4 text-center">
        Remember your password?
        <a href="/login" class="text-blue-500 hover:underline">Login here</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const handleReset = () => {
  if (!email.value) {
    alert('Please enter your email!')
    return
  }

  // logika reset password
  console.log('Reset email:', email.value)
  alert('Reset link sent! (simulasi)')
}
</script>
