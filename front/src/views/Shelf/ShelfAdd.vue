<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="4" xl="4">
        <v-card class="px-6 py-6 add-form">
          <h2>Добавить полку</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="addShelf"
          >
            <v-text-field
              v-model="count"
              :rules="countRules"
              type="number"
              label="Вместимость товаров в шт."
              required
              clearable
            ></v-text-field>

            <v-btn :disabled="!valid" color="success" @click.prevent="addShelf" class="mt-2">
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
  name: "ShelfAdd",
  data: () => ({
    valid: true,
    count: '',
    countRules: [
      v => !!v || "Обязательное поле",
      v => (v && +v <= 100) || "Полка не может хранить более 100 товаров",
      v => (v && v > 0) || "На полке должно храниться больше 0 товаров",
    ]
  }),
  methods: {
    addShelf() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addShelf", this.count);
      }
    }
  }
}
</script>