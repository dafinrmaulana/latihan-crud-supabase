<script setup>
const formatter = useCurrencyFormatter;
const client = useSupabaseClient();
const isModalOpen = ref(false);
const isModalEdit = ref(false);
const isModalDelete = ref(false);

const name = ref("");
const category = ref("");
const price = ref("");
const description = ref("");
const productId = ref(null);

const isLoading = ref(false);
const postError = ref(null);

useHead({
  title: "Latihan CRUD Supabase",
});

const closeModal = () => {
  isModalOpen.value = false;
  isModalEdit.value = false;
  name.value = "";
  category.value = "";
  price.value = "";
  description.value = "";
  postError.value = null;
};

const {
  data: products,
  refresh: refreshProducts,
  status: productsLoading,
  error: productsError,
} = await useAsyncData("product", async () => {
  try {
    const { data, error } = await client.from("product").select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
});

const storeProduct = async () => {
  isLoading.value = true;
  try {
    const { data, error } = await client.from("product").insert({
      name: name.value,
      category: category.value,
      price: price.value === "" ? 0 : price.value,
      description: description.value,
    });

    if (error) {
      postError.value = JSON.parse(error.message);
    } else {
      name.value = "";
      category.value = "";
      price.value = "";
      description.value = "";

      isModalOpen.value = false;
      postError.value = null;
      refreshProducts();
    }
  } catch (error) {
    throw new Error(error);
  } finally {
    isLoading.value = false;
  }
};

const editProduct = async (id) => {
  isModalEdit.value = true;
  const { data } = await client
    .from("product")
    .select("*")
    .eq("id", id)
    .single();

  name.value = data.name;
  category.value = data.category;
  price.value = data.price;
  description.value = data.description;
  productId.value = data.id;
};

const updateProduct = async () => {
  isLoading.value = true;
  try {
    const { data, error } = await client
      .from("product")
      .update({
        name: name.value,
        category: category.value,
        price: price.value === "" ? 0 : price.value,
        description: description.value,
      })
      .eq("id", productId.value);
    if (error) throw new Error(error.message);
    name.value = "";
    category.value = "";
    price.value = "";
    description.value = "";
    isModalEdit.value = false;
    postError.value = null;
    refreshProducts();
  } catch (error) {
    throw new Error(error);
  } finally {
    isLoading.value = false;
  }
};

const deleteProduct = async (id, productName) => {
  isModalDelete.value = true;
  productId.value = id;
  name.value = productName;
};

const destroyProduct = async (id) => {
  isLoading.value = true;
  try {
    const { data, error } = await client.from("product").delete().eq("id", id);
    if (error) throw new Error(error.message);
    isModalDelete.value = false;
    name.value = "";
    productId.value = null;
    postError.value = null;
    refreshProducts();
  } catch (error) {
    throw new Error(error);
  } finally {
    isLoading.value = false;
  }
};

watch(productsError, (value) => {
  return console.log(value);
});
</script>

<template>
  <div class="p-4 space-y-2">
    <div class="flex justify-between items-end">
      <Button @click="isModalOpen = true"> Create Product </Button>
      <Button style-type="success" @click="refreshProducts"> Refresh </Button>
    </div>
    <TableLayout>
      <TableHead>
        <tr>
          <TableThHead> No </TableThHead>
          <TableThHead> Name </TableThHead>
          <TableThHead> Category </TableThHead>
          <TableThHead> Price </TableThHead>
          <TableThHead> </TableThHead>
        </tr>
      </TableHead>
      <TableBody>
        <TableTrBody v-for="(product, i) in products" :key="product.id">
          <TableTdBody> {{ i + 1 }} </TableTdBody>
          <TableTdBody> {{ product.name }} </TableTdBody>
          <TableTdBody> {{ product.category }} </TableTdBody>
          <TableTdBody> {{ formatter.format(product.price) }} </TableTdBody>
          <TableTdBody>
            <div class="space-x-2">
              <Button style-type="warning" @click="editProduct(product.id)">
                Edit
              </Button>
              <Button
                style-type="danger"
                @click="deleteProduct(product.id, product.name)"
              >
                Delete
              </Button>
            </div>
          </TableTdBody>
        </TableTrBody>
        <TableLoading :loading="productsLoading === 'pending'" />
      </TableBody>
    </TableLayout>
  </div>

  <ModalLayout
    title="Create Product"
    :is-modal-open="isModalOpen"
    @close="closeModal"
  >
    <Form @submit.prevent="storeProduct">
      <div class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
          <FormInput
            name="name"
            label="Name"
            placeholder="realme 7 | 8GB / 256GB"
            v-model="name"
            :error="postError && postError.name"
          />
        </div>
        <div class="col-span-2 sm:col-span-1">
          <FormInput
            name="price"
            label="Price"
            type="number"
            placeholder="Rp. 100.000,00"
            v-model="price"
            :error="postError && postError.price"
          />
        </div>
        <div class="col-span-2 sm:col-span-1">
          <FormInput
            name="category"
            label="Category"
            placeholder="Electronics"
            v-model="category"
            :error="postError && postError.category"
          />
        </div>
        <div class="col-span-2">
          <FormTextArea
            name="description"
            label="Product Description"
            placeholder="Write product description here"
            v-model="description"
          />
        </div>
      </div>
      <Button type="submit" class="flex" :disabled="isLoading">
        {{ isLoading ? "Loading..." : "Submit" }}
      </Button>
    </Form>
  </ModalLayout>

  <ModalLayout
    title="Edit Product"
    :is-modal-open="isModalEdit"
    @close="closeModal"
  >
    <Form @submit.prevent="updateProduct">
      <div class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
          <FormInput
            name="name"
            label="Name"
            placeholder="realme 7 | 8GB / 256GB"
            v-model="name"
            :error="postError && postError.name"
          />
        </div>
        <div class="col-span-2 sm:col-span-1">
          <FormInput
            name="price"
            label="Price"
            type="number"
            placeholder="Rp. 100.000,00"
            v-model="price"
            :error="postError && postError.price"
          />
        </div>
        <div class="col-span-2 sm:col-span-1">
          <FormInput
            name="category"
            label="Category"
            placeholder="Electronics"
            v-model="category"
            :error="postError && postError.category"
          />
        </div>
        <div class="col-span-2">
          <FormTextArea
            name="description"
            label="Product Description"
            placeholder="Write product description here"
            v-model="description"
          />
        </div>
      </div>
      <Button type="submit" class="flex" :disabled="isLoading">
        {{ isLoading ? "Loading..." : "Submit" }}
      </Button>
    </Form>
  </ModalLayout>

  <ModalLayout
    title="Delete Product"
    :is-modal-open="isModalDelete"
    @close="isModalDelete = false"
  >
    <div class="grid gap-4 mb-4 grid-cols-2 p-5">
      <div class="col-span-2">
        <p class="text-gray-500">Are you sure you want to delete {{ name }}?</p>
      </div>
      <div class="col-span-2 flex gap-2">
        <Button
          style-type="danger"
          @click="destroyProduct(productId)"
          :disabled="isLoading"
        >
          {{ isLoading ? "Loading..." : "Delete" }}
        </Button>
        <Button @click="isModalDelete = false">Cancel</Button>
      </div>
    </div>
  </ModalLayout>
</template>
