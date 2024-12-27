<script setup lang="ts">
import { useRazorpay } from '../composables/useRazorpay'

const { initializeSubscription } = useRazorpay()
</script>

<template>
  <main>
    <h1>Razorpay Payment Gateway For Subscriptions</h1>
    <button @click="initializeSubscription">Subscribe</button>
  </main>
</template>
