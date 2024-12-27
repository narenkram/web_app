import { ref } from 'vue'

declare global {
  interface Window {
    Razorpay: any
  }
}

export function useRazorpay() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const initializeSubscription = async () => {
    try {
      isLoading.value = true
      error.value = null

      // Get data first
      const response = await fetch(`${import.meta.env.VITE_API_URL}/subscriptions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()

      // Then use data in options
      const options = {
        key: data.key_id,
        subscription_id: data.subscriptionId,
        name: 'Steadfast',
        description: 'Monthly Subscription',
        handler: function (response) {
          console.log('Payment successful:', response)
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#0d6efd',
        },
        modal: {
          escape: false,
        },
        notes: {
          // Add any required notes here
        },
      }

      const rzp = new Razorpay(options)
      rzp.open()
    } catch (err) {
      error.value = 'Failed to initialize subscription'
      console.error('Razorpay error:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    initializeSubscription,
  }
}
