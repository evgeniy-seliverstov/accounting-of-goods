<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="4" xl="4">
        <v-card class="px-6 py-6 add-form">
          <h2>Изменить полку</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="changeShelf"
          >
            <v-text-field
              v-model="shelf.count"
              :rules="countRules"
              type="number"
              label="Вместимость товаров в шт."
              required
              clearable
            ></v-text-field>

            <v-btn :disabled="!valid" color="success" @click.prevent="changeShelf" class="mt-2">
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
  name: "ShelfAdd",
  data: () => ({
    valid: true,
    shelf: {
      id: null,
      count: ''
    },
    countRules: [
      v => !!v || "Обязательное поле",
      v => (v && +v <= 100) || "Полка не может хранить более 100 товаров",
      v => (v && v > 0) || "На полке должно храниться больше 0 товаров",
    ]
  }),
  methods: {
    changeShelf() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("changeShelf", this.shelf);
      }
    }
  },
  async created() {
    try {
      if (this.$route.params.id) {
        const getShelf = require("@/api/api.js").shelfApi.getByIndex;
        getShelf(this.$route.params.id).then(({ data }) => {
          if (data) {
            if (data.success) {
              this.shelf = data.shelf;
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