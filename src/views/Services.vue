<script setup>
import { ref, onMounted, watch, computed } from 'vue'

const products = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const limit = ref(12)
const totalProducts = ref(0)
const expanded = ref({})
const searchQuery = ref("")
const selectedImage = ref(null) // untuk popup gambar

// Format harga ke Rupiah
const toRupiah = (usd) => {
  const kurs = 15000
  const rupiah = usd * kurs
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(rupiah)
}

// Fetch data produk
const fetchProducts = async (page = 1) => {
  try {
    const skip = (page - 1) * limit.value
    const res = await fetch(`https://dummyjson.com/products?limit=${limit.value}&skip=${skip}`)
    const data = await res.json()

    products.value = data.products
    totalProducts.value = data.total
    totalPages.value = Math.ceil(data.total / limit.value)

    expanded.value = {}
  } catch (error) {
    console.error("Gagal fetch data:", error)
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchProducts(page)
  }
}

watch(limit, () => {
  currentPage.value = 1
  fetchProducts()
})

onMounted(() => {
  fetchProducts()
})

// Produk yang difilter pencarian
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Services - Product List</h1>

    <!-- Search Bar -->
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <label for="perPage" class="text-gray-700 font-medium">Show per page:</label>
        <select id="perPage" v-model="limit" class="border rounded px-2 py-1">
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
      </div>

      <!-- Input Search -->
      <input v-model="searchQuery" type="text" placeholder="Cari produk..." class="border rounded px-3 py-2 w-64" />
    </div>

    <!-- Daftar Produk -->
    <div v-if="filteredProducts.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in filteredProducts" :key="product.id"
        class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
        <img :src="product.thumbnail" :alt="product.title"
          class="w-full h-40 object-cover rounded-md mb-3 cursor-pointer" @click="selectedImage = product.thumbnail" />
        <h2 class="text-lg font-semibold text-gray-900">{{ product.title }}</h2>

        <!-- Deskripsi -->
        <p class="text-gray-600 text-sm mb-2">
          {{ expanded[product.id] ? product.description : product.description.slice(0, 60) + (product.description.length
            > 60 ? '...' : '') }}
        </p>
        <button v-if="product.description.length > 60" @click="expanded[product.id] = !expanded[product.id]"
          class="text-blue-500 text-xs mb-2">
          {{ expanded[product.id] ? 'Read less' : 'Read more' }}
        </button>

        <!-- Harga -->
        <p class="font-bold text-blue-600 mb-3">{{ toRupiah(product.price) }}</p>

        <!-- Tombol Beli -->
        <router-link :to="`/product/${product.id}`"
          class="block w-full bg-blue-500 text-white py-2 text-center rounded-lg hover:bg-blue-600 transition">
          Beli
        </router-link>
      </div>
    </div>

    <!-- Jika hasil search kosong -->
    <div v-else class="text-center text-gray-500 mt-8">
      Produk tidak ditemukan
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8 space-x-2">
      <button @click="changePage(1)" :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        First
      </button>

      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Prev
      </button>

      <span class="px-3 py-1 bg-blue-500 text-white rounded">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Next
      </button>

      <button @click="changePage(totalPages)" :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Last
      </button>
    </div>

    <!-- Popup Gambar -->
    <div v-if="selectedImage" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div class="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl max-h-[90vh] flex flex-col items-center">
        <!-- Tombol Close -->
        <button @click="selectedImage = null"
          class="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600">
          ✕
        </button>

        <!-- Gambar -->
        <img :src="selectedImage" alt="Preview" class="max-w-full max-h-[80vh] object-contain rounded" />
      </div>
    </div>
  </div>
</template>
