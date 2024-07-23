<script setup>
defineProps({
  name: {
    type: String,
    default: "name",
  },
  label: {
    type: String,
    default: "Name",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "Placeholder...",
  },
  rows: {
    type: Number,
    default: 4,
  },
});

const model = defineModel();
</script>

<template>
  <label
    :for="name"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    {{ label }}
  </label>
  <textarea
    :id="name"
    :rows="rows"
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    :placeholder="placeholder"
    v-model="model"
  >{{ model }}</textarea>
</template>
