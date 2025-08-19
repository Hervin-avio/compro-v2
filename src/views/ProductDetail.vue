<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Detail Produk</h1>

    <div v-if="product" class="bg-white rounded-xl shadow-md overflow-hidden md:flex">
      <!-- Gambar Produk -->
      <div class="md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
        <img
          :src="product.thumbnail"
          alt="Thumbnail"
          class="w-full h-auto max-h-96 object-contain rounded-lg"
        />
      </div>

      <!-- Info Produk -->
      <div class="md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ product.title }}</h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>

          <p class="text-xl font-bold text-blue-600 mb-6">
            {{ toRupiah(product.price) }}
          </p>
        </div>

        <!-- Tombol Beli -->
        <button
          @click="buyProduct"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg transition"
        >
          Beli Sekarang
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      <p>Memuat detail produk...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)

const toRupiah = (usd) => {
  const kurs = 15000
  const rupiah = usd * kurs
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(rupiah)
}

onMounted(async () => {
  const id = route.params.id
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const data = await res.json()
  product.value = data
})

const buyProduct = () => {
  alert(`Kamu memilih beli: ${product.value.title}`)
}
</script>
