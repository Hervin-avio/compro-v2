<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

// --- BANNERS (URL online, bisa dari API kamu sendiri) ---
const banners = ref([
  { id: 1, img: "/src/assets/image/banner1.jpg", alt: "Promo Diskon Besar" },
  { id: 2, img: "/src/assets/image/banner2.png", alt: "Promo Diskon Besar" },
  { id: 3, img: "/src/assets/image/banner3.jpg", alt: "Promo Diskon Besar" }, 
  { id: 5, img: "/src/assets/image/banner5.jpg", alt: "Promo Diskon Besar" },
  { id: 6, img: "/src/assets/image/banner6.jpg", alt: "Promo Diskon Besar" },

]);


// --- SHORTCUTS (dummy) ---
const shortcuts = ref([
  { id: 1, label: "Lihat Semua", emoji: "📦" },
  { id: 2, label: "Promo", emoji: "🔥" },
  { id: 3, label: "Tagihan", emoji: "💳" },
  { id: 4, label: "Elektronik", emoji: "📱" },
  { id: 5, label: "Sport", emoji: "🏃" },
  { id: 6, label: "Perlindungan", emoji: "🛡️" },
])

// --- PROMO BANNER (gambar online) ---
const promoBanner = {
  title: "Member baru? Ini promomu!",
  desc: "Cashback sampai 99% 🎉",
  img: "/src/assets/image/banner2.png", alt: "Promo Diskon Besar",
}

// --- PRODUK dari API ---
const products = ref([])
const loadingProducts = ref(true)
const errorProducts = ref(null)

// (opsional) simple konversi ke IDR biar enak dilihat
const USD_TO_IDR = 16000
const toIDR = (n) => "Rp " + Math.round(n * USD_TO_IDR).toLocaleString("id-ID")

async function loadProducts() {
  loadingProducts.value = true
  errorProducts.value = null
  try {
    const res = await fetch("https://dummyjson.com/products?limit=12")
    const data = await res.json()
    products.value = (data?.products || []).map((p) => ({
      id: p.id,
      title: p.title,
      price: toIDR(p.price),
      discount: p.discountPercentage ? `-${Math.round(p.discountPercentage)}%` : "",
      img: p.thumbnail || p.images?.[0],
    }))
  } catch (e) {
    errorProducts.value = "Gagal memuat produk."
    console.error(e)
  } finally {
    loadingProducts.value = false
  }
}

// --- CAROUSEL LOGIC (tanpa library) ---
const current = ref(0)
let timer = null
const intervalMs = 2500

function next() {
  current.value = (current.value + 1) % banners.value.length
}
function prev() {
  current.value = (current.value - 1 + banners.value.length) % banners.value.length
}
function goTo(i) {
  current.value = i
}
function startAuto() {
  stopAuto()
  timer = setInterval(next, intervalMs)
}
function stopAuto() {
  if (timer) clearInterval(timer)
}

onMounted(() => {
  startAuto()
  loadProducts()
})
onBeforeUnmount(() => stopAuto())
</script>

<template>
  <div class="space-y-6">

    <!-- CAROUSEL -->
    <div class="relative w-full h-[350px] md:h-[400px] overflow-hidden rounded-2xl shadow bg-gray-50"
      @mouseenter="stopAuto" @mouseleave="startAuto">
      <!-- wrapper -->
      <div class="flex h-full w-full transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${current * 100}%)` }">
        <div v-for="b in banners" :key="b.id"
          class="w-full h-full flex-shrink-0 flex items-center justify-center bg-white">
          <img :src="b.img" :alt="b.alt" class="w-full h-full object-contain bg-white" />
        </div>
      </div>

      <!-- tombol navigasi -->
      <button class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
        @click="prev">
        ‹
      </button>
      <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
        @click="next">
        ›
      </button>

      <!-- dots -->
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        <button v-for="(b, i) in banners" :key="b.id" class="w-3 h-3 rounded-full"
          :class="i === current ? 'bg-blue-600' : 'bg-gray-300'" @click="goTo(i)" />
      </div>
    </div>


    <!-- SHORTCUT MENU -->
    <div class="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
      <div v-for="s in shortcuts" :key="s.id" class="flex flex-col items-center">
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-2xl">
          {{ s.emoji }}
        </div>
        <span class="mt-2 text-sm">{{ s.label }}</span>
      </div>
    </div>

    <!-- PROMO BANNER -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 class="text-xl font-bold">{{ promoBanner.title }}</h2>
          <p class="text-sm mt-2">{{ promoBanner.desc }}</p>
          <button class="mt-4 bg-white text-blue-600 font-semibold px-4 py-2 rounded-xl shadow hover:shadow-md">
            Klaim Promo
          </button>
        </div>
        <img :src="promoBanner.img" alt="promo" class="w-32 h-32 object-contain rounded-xl" />
      </div>
    </div>

    <!-- PRODUK GRID -->
    <section>
      <h2 class="text-lg font-semibold mb-4">Produk Pilihan</h2>

      <!-- Loading / Error -->
      <div v-if="loadingProducts" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div v-for="i in 6" :key="i" class="rounded-2xl p-3 border animate-pulse">
          <div class="w-full h-[150px] bg-gray-200 rounded-lg mb-3"></div>
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div v-else-if="errorProducts" class="text-red-600">{{ errorProducts }}</div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div v-for="p in products" :key="p.id" class="rounded-2xl border hover:shadow-md transition p-3 flex flex-col">
          <img :src="p.img" :alt="p.title" class="rounded-lg mb-3 w-full h-[150px] object-cover" />
          <span class="text-sm font-medium h-10 overflow-hidden leading-5">{{ p.title }}</span>
          <span class="text-red-600 font-bold mt-2">{{ p.price }}</span>
          <span v-if="p.discount" class="text-xs text-gray-500">{{ p.discount }}</span>
          <router-link 
          :to="`/product/${p.id}`"
          class="block w-full bg-blue-500 text-white py-2 text-center rounded-lg hover:bg-blue-600 transition">
          Beli
        </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* tombol dot kecil biar terlihat clickable */
button[class*="w-2.5"] {
  border: 1px solid rgba(0, 0, 0, .1);
}
</style>
