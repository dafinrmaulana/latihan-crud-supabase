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
  error: {
    type: String,
    default: "",
  },
});

const model = defineModel();
</script>

<template>
  <label
    :for="name"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{{ label }}</label
  >
  <input
    :type="type"
    :name="name"
    :id="name"
    :class="[
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500',
      error ? 'border-red-500' : '',
    ]"
    :placeholder="placeholder"
    v-model="model"
  />
  <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
</template>
