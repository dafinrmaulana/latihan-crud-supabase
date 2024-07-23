<script setup>
defineProps({
  styleType: {
    type: String,
    default: "primary",
    rules: ["primary", "success", "danger", "warning", "secondary"],
  }
});
</script>

<template>
  <button
    type="button"
    :class="[
      'font-medium rounded-md text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:opacity-50 duration-200',
      styleType === 'primary'
        ? 'text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        : '',
      styleType === 'secondary'
        ? 'text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
        : '',
      styleType === 'success'
        ? 'text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
        : '',
      styleType === 'danger'
        ? 'text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
        : '',
      styleType === 'warning'
        ? 'text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900'
        : '',
    ]"
  >
    <slot />
  </button>
</template>
