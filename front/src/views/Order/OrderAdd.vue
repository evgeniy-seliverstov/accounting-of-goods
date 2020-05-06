<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="4" xl="4">
        <v-card class="px-6 py-6 add-form">
          <h2>Оформить заказ</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="addOrder"
          >
            <v-btn class="d-block mt-3" style="width: 100%" outlined color="grey lighten-1" @click="addGood">Добавить ещё один товар</v-btn>
            <div v-for="(good, index) in goods" :key="index" class="d-flex justify-space-between">
                <v-select
                  v-model="good.type_id"
                  :items="types"
                  :rules="typesRules"
                  item-text="name"
                  item-value="id"
                  label="Вид товара"
                  :style="{ maxWidth: goods.length != 1 ? '45%' : '48%' }"
                  class=""
                ></v-select>
                <v-text-field
                  v-model="good.count"
                  :rules="countRules"
                  type="number"
                  label="Количество"
                  required
                  :style="{ maxWidth: goods.length != 1 ? '45%' : '48%' }"
                ></v-text-field>          
              <v-icon v-if="goods.length != 1" size="24" color="red darken-2" @click="removeGood(index)"> mdi-close-box </v-icon>
            </div>

            <v-btn :disabled="!valid" color="success" @click.prevent="addOrder">
              Оформить
            </v-btn>
          </v-form>
        </v-card>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OrderAdd",
  data: () => ({
    types: [],
    goods: [
      { type_id: null, count: null }
    ],
    valid: true,
    typesRules: [v => !!v || "Обязательное поле"],
      countRules: [
        v => !!v || "Обязательное поле",
        v => v > 0 || "Кол-во товара должно быть больше 0",
        v => v <= 100 || `Кол-во товара не должно быть больше 100`
      ]
  }),
  methods: {
    addOrder() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addOrder", { goods: this.goods });
      }
    },
    addGood() {
      this.goods.push({ type_id: null, count: null });
    },
    removeGood(index) {
      this.goods.splice(index, 1);
    }
  },
  async created() {
    try {
      const typeApi = require("@/api/api.js").typeApi.get;
      typeApi().then(({ data }) => {
        if (data) {
          this.types = data;
        }
      });
    } catch(error) {
      if (error.response.data.error) this.$noty.error(error.response.data.error);
      else console.error(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.v-icon::after {
  content: none !important;
}
</style>