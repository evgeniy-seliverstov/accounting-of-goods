<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="4" xl="4">
        <v-card class="px-6 py-6 add-form">
          <h2>Изменить вид товара</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="changeType"
          >
            <v-text-field
              v-model="type.name"
              :rules="nameRules"
              label="Название"
              required
              clearable
            ></v-text-field>
            <v-select
              v-model="type.supplier_id"
              :items="suppliers"
              :rules="supplierRules"
              item-text="name"
              required
              item-value="id"
              label="Поставщик"
            ></v-select>

            <v-btn :disabled="!valid" color="success" @click.prevent="changeType" class="mt-2">
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
  name: "TypeEdit",
  data: function() {
    return {
      suppliers: [],
      type: {
        name: '',
        supplier_id: '',
      },
      valid: true,
      nameRules: [v => !!v || "Обязательное поле"],
      supplierRules: [v => !!v || "Обязательное поле"]
    }
  },
  methods: {
    changeType() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("changeType", this.type);
      }
    }
  },
  async created() {
    try {
      if (this.$route.params.id) {
        const getType = require("@/api/api.js").typeApi.getByIndex;
        const supplierApi = require("@/api/api.js").supplierApi.get;

        getType(this.$route.params.id).then(({ data }) => {
          if (data) {
            if (data.success) {
              this.type = data.type;
            }
          }
        })
        .catch(error => {
          if (error.response.status == 404)
            this.$router.replace("/notFound")
          else if (error.response.data.error) this.$noty.error(error.response.data.error);
          else console.error(error);
        });

        supplierApi().then(({ data }) => {
          if (data) {
            this.suppliers = data;
            if (!this.suppliers.find(val => val.id == this.type.supplier_id)) {
              this.type.supplier_id = '';
            }
          }
        });
      }
    } catch(error) {
      console.error(error);
    }
  }
}
</script>