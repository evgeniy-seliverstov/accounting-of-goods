<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="4" xl="4">
        <v-card class="px-6 py-6 add-form">
          <h2>Добавить вид товара</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="addType"
          >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Название"
              required
              clearable
            ></v-text-field>
            <v-select
              v-model="supplier_id"
              :items="suppliers"
              :rules="supplierRules"
              item-text="name"
              item-value="id"
              label="Поставщик"
            ></v-select>

            <v-btn :disabled="!valid" color="success" @click.prevent="addType" class="mt-2">
              Добавить
            </v-btn>
          </v-form>
        </v-card>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TypeAdd",
  data: () => ({
    suppliers: [],
    supplier_id: null,
    valid: true,
    name: '',
    nameRules: [v => !!v || "Обязательное поле"],
    supplierRules: [v => !!v || "Обязательное поле"]
  }),
  methods: {
    addType() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addType", { name: this.name, supplier_id: this.supplier_id });
      }
    }
  },
  async created() {
    try {
      const supplierApi = require("@/api/api.js").supplierApi.get;
      supplierApi().then(({ data }) => {
        if (data) {
          this.suppliers = data;
        }
      });
    } catch(error) {
      if (error.response.data.error) this.$noty.error(error.response.data.error);
      else console.error(error);
    }
  }
}
</script>