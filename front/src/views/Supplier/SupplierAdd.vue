<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="4" xl="4">
        <v-card class="px-6 py-6 add-form">
          <h2>Добавить поставщика</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="addSupplier"
          >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Имя"
              required
              clearable
            ></v-text-field>
            <v-text-field
              v-model="address"
              :rules="addressRules"
              label="Адрес"
              clearable
            ></v-text-field>
            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              type="number"
              label="Телефон"
              clearable
            ></v-text-field>

            <v-btn :disabled="!valid" color="success" @click.prevent="addSupplier" class="mt-2">
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
  name: "SupplierAdd",
  data: () => ({
    valid: true,
    name: '',
    address: '',
    phone: '',
    nameRules: [v => !!v || "Обязательное поле"],
    addressRules: [ v => v.length <= 255 || "Адресс не должен быть больше 255 символов"],
    phoneRules: [v => v.length <= 32 || "Телефон не должен быть больше 32 символов"]
  }),
  methods: {
    addSupplier() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addSupplier", { name: this.name, address: this.address, phone: this.phone });
      }
    }
  }
}
</script>