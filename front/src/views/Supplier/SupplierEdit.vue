<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="4" xl="4">
        <v-card class="px-6 py-6 add-form">
          <h2>Изменить поставщика</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="addSupplier"
          >
            <v-text-field
              v-model="supplier.name"
              :rules="nameRules"
              label="Имя"
              required
              clearable
            ></v-text-field>
            <v-text-field
              v-model="supplier.address"
              :rules="addressRules"
              label="Адрес"
              clearable
            ></v-text-field>
            <v-text-field
              v-model="supplier.phone"
              :rules="phoneRules"
              type="number"
              label="Телефон"
              clearable
            ></v-text-field>

            <v-btn :disabled="!valid" color="success" @click.prevent="changeSupplier" class="mt-2">
              Изменить
            </v-btn>
          </v-form>
        </v-card>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SupplierEdit",
  data: () => ({
    valid: true,
    supplier: {
      name: '',
      address: '',
      phone: '',
    },
    nameRules: [v => !!v || "Обязательное поле"],
    addressRules: [ v => v.length <= 255 || "Адресс не должен быть больше 255 символов"],
    phoneRules: [v => v.length <= 32 || "Телефон не должен быть больше 32 символов"]
  }),
  methods: {
    changeSupplier() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("changeSupplier", this.supplier);
      }
    }
  },
  async created() {
    try {
      if (this.$route.params.id) {
        const getSupplier = require("@/api/api.js").supplierApi.getByIndex;
        getSupplier(this.$route.params.id).then(({ data }) => {
          if (data) {
            if (data.success) {
              this.supplier = data.supplier;
            }
          }
        })
        .catch(error => {
          if (error.response.status == 404)
            this.$router.replace("/notFound")
          else if (error.response.data.error) this.$noty.error(error.response.data.error);
          else console.error(error);
        });
      }
    } catch(error) {
      console.error(error);
    }
  }
}
</script>