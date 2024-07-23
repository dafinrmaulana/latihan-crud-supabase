<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <tr
    :class="[
      'absolute bg-gray-50/50 w-full h-full top-0 place-items-center',
      loading ? 'visible opacity-100 grid' : 'invisible opacity-0 hidden',
    ]"
  />
</template>
