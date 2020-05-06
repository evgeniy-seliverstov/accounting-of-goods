<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="4" xl="4">
        <v-card class="px-6 py-6 add-form">
          <h2>Изменить товар</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="changeGood"
          >
            <v-select
              v-model="good.shelf_id"
              :items="shelfs"
              :rules="shelfRules"
              item-value="id"
              label="Номер полки"
              @change="changeShelf"
            ></v-select>
            <v-select
              v-model="good.type_id"
              :items="types"
              :rules="typeRules"
              item-text="name"
              item-value="id"
              label="Вид товара"
            ></v-select>
            <v-text-field
              v-model="good.number"
              :rules="countRules"
              type="number"
              :label="`Кол-во шт. (макс. ${free_count})`"
              required
              clearable
            ></v-text-field>

            <v-btn :disabled="!valid" color="success" @click.prevent="changeGood" class="mt-2">
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
  name: "GoodEdit",
  data: function() {
    return {
      shelfs: [],
      types: [],
      free_count: 0,
      good: {
        number: '',
        shelf_id: null,
        type_id: null
      },
      valid: true,
      shelfRules: [v => !!v || "Обязательное поле"],
      typeRules: [v => !!v || "Обязательное поле"],
      countRules: [
        v => !!v || "Обязательное поле",
        v => v >= 0 || "Кол-во товара не может быть отрицательным",
        v => v <= this.free_count || `Кол-во товара должно быть меньше ${this.free_count} шт.`
      ]
    }
  },
  methods: {
    changeGood() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("changeGood", this.good);
      }
    },
    changeShelf() {
      const shelf = this.shelfs.find(val => val.id == this.good.shelf_id)
      this.free_count = shelf.free;
    }
  },
  async created() {
    try {
      if (this.$route.params.id) {
        const getGood = require("@/api/api.js").goodApi.getByIndex;
        const shelfApi = require("@/api/api.js").shelfApi.get;
        const typeApi = require("@/api/api.js").typeApi.get;

        getGood(this.$route.params.id).then(({ data }) => {
          if (data) {
            if (data.success) {
              this.good = data.good;
            }
          }
        })
        .catch(error => {
          if (error.response.status == 404)
            this.$router.replace("/notFound")
          else if (error.response.data.error) this.$noty.error(error.response.data.error);
          else console.error(error);
        });

        shelfApi().then(({ data }) => {
          if (data) {
            let shelf = data.find(val => val.id == this.good.shelf_id);
            data.map(val => Object.assign(val, { free: val.count - val.number, text: `${val.id} (Осталось места: ${val.count - val.number})`}))
            if (shelf) {
              shelf.free += this.good.number;
              shelf.text = `${shelf.id} (Осталось места: ${shelf.count - shelf.number + this.good.number})`;
            }
            this.shelfs = data.filter(val => val.free > 0);
            this.free_count = shelf ? shelf.free : 0;
          }
        });

        typeApi().then(({ data }) => {
          if (data) {
            this.types = data;
          }
        });
      }
    } catch(error) {
      console.error(error);
    }
  }
}
</script>