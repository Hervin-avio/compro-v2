<script setup>
import { ref } from "vue";

const openFaq = ref(null);
const faqs = ref([
  {
    question: "Bagaimana cara melacak pesanan saya?",
    answer:
      "Anda dapat melacak pesanan melalui menu 'Pesanan Saya' setelah login ke akun Balanja."
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menerima pembayaran melalui transfer bank, e-wallet (OVO, GoPay, Dana), serta kartu kredit."
  },
  {
    question: "Apakah saya bisa mengembalikan barang?",
    answer:
      "Tentu, Balanja menyediakan layanan retur dalam 7 hari jika barang tidak sesuai atau rusak."
  },
  {
    question: "Bagaimana cara menghubungi customer service?",
    answer:
      "Anda bisa menghubungi kami lewat WhatsApp, email, atau call center yang sudah tertera di atas."
  }
]);

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? null : index;
}
</script>


<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-100 to-blue-50 py-12">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Halo, butuh bantuan?</h1>
        <p class="text-gray-600 mb-6">Tim Balanja siap membantu Anda 🚀</p>
        <div class="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Ketik kata kunci pencarian"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <!-- Kontak Section -->
    <div class="max-w-4xl mx-auto py-12 px-6">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-10">
        Hubungi Kami
      </h2>

      <div class="grid gap-6 md:grid-cols-2">
        <!-- WhatsApp -->
        <div class="bg-white shadow rounded-xl p-6 flex items-center space-x-4">
          <span class="text-green-500 text-3xl">📱</span>
          <div>
            <h3 class="font-semibold text-gray-800">WhatsApp</h3>
            <p class="text-gray-600">+62 812-3456-7890</p>
          </div>
        </div>

        <!-- Telepon -->
        <div class="bg-white shadow rounded-xl p-6 flex items-center space-x-4">
          <span class="text-blue-500 text-3xl">📞</span>
          <div>
            <h3 class="font-semibold text-gray-800">Telepon / Call Center</h3>
            <p class="text-gray-600">021 - 1234 5678</p>
          </div>
        </div>

        <!-- Email -->
        <div class="bg-white shadow rounded-xl p-6 flex items-center space-x-4">
          <span class="text-red-500 text-3xl">📧</span>
          <div>
            <h3 class="font-semibold text-gray-800">Email</h3>
            <p class="text-gray-600">support@balanja.com</p>
          </div>
        </div>

        <!-- Alamat -->
        <div class="bg-white shadow rounded-xl p-6 flex items-center space-x-4">
          <span class="text-yellow-500 text-3xl">📍</span>
          <div>
            <h3 class="font-semibold text-gray-800">Alamat Kantor</h3>
            <p class="text-gray-600">
              Jl. Sudirman No. 123, Jakarta Pusat, Indonesia
            </p>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-16">
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-8">
          Pertanyaan Umum (FAQ)
        </h2>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white shadow rounded-lg"
          >
            <button
              class="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-gray-800 focus:outline-none"
              @click="toggleFaq(index)"
            >
              <span>{{ faq.question }}</span>
              <span>{{ openFaq === index ? '−' : '+' }}</span>
            </button>
            <div
              v-show="openFaq === index"
              class="px-6 pb-4 text-gray-600 text-sm"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- Sosial Media -->
      <div class="mt-12 text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Ikuti kami di:</h3>
        <div class="flex justify-center space-x-6 text-2xl">
          <a href="#" class="hover:text-blue-600">📘</a>
          <a href="#" class="hover:text-pink-500">📷</a>
          <a href="#" class="hover:text-sky-400">🐦</a>
        </div>
      </div>
    </div>
  </div>
</template>


