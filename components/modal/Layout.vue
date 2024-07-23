<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Modal Title",
  },
  isModalOpen: {
    type: Boolean,
    default: false,
  },
});

const displayClass = ref("hidden");
const visibilityClass = ref("invisible opacity-0");
const boxPositionClass = ref("-translate-y-6");
const modal = computed(() => props.isModalOpen);

watch(modal, async (value) => {
  if (!value) {
    visibilityClass.value = "invisible opacity-0";
    boxPositionClass.value = "-translate-y-6";
    await nextTick();
    setTimeout(() => {
      displayClass.value = "hidden";
    }, 200);
  }

  if (value) {
    await nextTick();
    displayClass.value = "flex";
    setTimeout(() => {
      visibilityClass.value = "visible opacity-100";
      boxPositionClass.value = "translate-y-0";
    }, 200);
  }
});
</script>

<template>
  <div
    :class="[
      'overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-black/30 duration-200',
      visibilityClass,
      displayClass,
    ]"
  >
    <div
      :class="[
        'relative duration-200 p-4 w-full max-w-md max-h-full',
        boxPositionClass,
      ]"
    >
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ props.title }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="$emit('close')"
          >
            <IconClose />
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <slot />
      </div>
    </div>
  </div>
</template>
