<script setup>
import { ref, computed, onMounted, watch } from "vue";

const products = ref([]);
const currentPage = ref(1);
const perPage = ref(12);
const isModalOpen = ref(false);
const selectedImage = ref(null);
const searchQuery = ref("");

// Fetch data produk
const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  products.value = data.products || [];
};

// Filter berdasarkan search
const filteredProducts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return products.value;
  return products.value.filter((p) =>
    [p.title, p.brand, p.category]
      .filter(Boolean)
      .some((f) => String(f).toLowerCase().includes(q))
  );
});

// Total halaman
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProducts.value.length / perPage.value))
);

// Produk per halaman
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredProducts.value.slice(start, start + perPage.value);
});

// Reset ke halaman 1 kalau search/perPage berubah
watch([searchQuery, perPage], () => {
  currentPage.value = 1;
});

// Navigasi pagination
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};
const nextPage = () => goToPage(currentPage.value + 1);
const prevPage = () => goToPage(currentPage.value - 1);

// Modal
const openModal = (img) => {
  selectedImage.value = img;
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
  selectedImage.value = null;
};

onMounted(fetchProducts);
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Product Gallery</h1>

    <!-- Baris Show per page + Search (kanan) -->
    <div class="flex items-center justify-between mb-4 gap-4">
      <div class="flex items-center">
        <label class="mr-2 font-medium">Show per page:</label>
        <select
          v-model.number="perPage"
          class="border rounded px-2 py-1"
        >
          <option v-for="n in [6, 12, 18, 24]" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <div class="w-full max-w-xs">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search product..."
          class="border rounded px-3 py-2 w-full"
        />
      </div>
    </div>

    <!-- Grid Produk -->
    <div v-if="paginatedProducts.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="cursor-pointer text-center"
        @click="openModal(product.thumbnail)"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full aspect-[4/3] object-contain rounded shadow hover:scale-105 transition-transform duration-200"
        />
        <p class="mt-2 font-medium text-sm">{{ product.title }}</p>
      </div>
    </div>
    <p v-else class="text-center text-gray-500 py-8">Tidak ada produk yang cocok.</p>

    <!-- Pagination -->
    <div class="flex justify-center mt-6 space-x-2 flex-wrap gap-1">
      <button
        @click="goToPage(1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        « First
      </button>
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        ‹ Prev
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-3 py-1 border rounded',
          currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next ›
      </button>
      <button
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Last »
      </button>
    </div>

    <!-- Modal Gambar -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-4 rounded shadow-lg relative max-w-4xl w-full">
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-white bg-red-500 rounded-full px-3 py-1 hover:bg-red-600"
        >
          ✕ Close
        </button>
        <img
          :src="selectedImage"
          alt="Zoomed Product"
          class="w-full max-h-[80vh] object-contain rounded"
        />
      </div>
    </div>
  </div>
</template>
