<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="4" xl="4">
        <v-card class="px-6 py-6 add-form">
          <h2>Добавить товар</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="addGood"
          >
            <v-select
              v-model="shelf_id"
              :items="shelfs"
              :rules="shelfRules"
              item-value="id"
              label="Номер полки"
            ></v-select>
            <v-select
              v-model="type_id"
              :items="types"
              :rules="typeRules"
              item-text="name"
              item-value="id"
              label="Вид товара"
            ></v-select>
            <v-text-field
              v-model="count"
              :rules="countRules"
              type="number"
              :label="`Кол-во шт. (макс. ${free_count})`"
              required
              clearable
            ></v-text-field>

            <v-btn :disabled="!valid" color="success" @click.prevent="addGood" class="mt-2">
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
  name: "GoodAdd",
  data: function() {
    return {
      shelfs: [],
      shelf_id: null,
      free_count: 0,
      valid: true,
      count: '',
      type_id: null,
      types: [],
      shelfRules: [v => !!v || "Обязательное поле"],
      typeRules: [v => !!v || "Обязательное поле"],
      countRules: [
        v => !!v || "Обязательное поле",
        v => v > 0 || "Кол-во товара должно быть больше 0",
        v => v <= this.free_count || `Кол-во товара должно быть меньше ${this.free_count} шт.`
      ]
    }
  },
  watch: {
    shelf_id: function() {
      const shelf = this.shelfs.find(val => val.id == this.shelf_id)
      this.free_count = shelf.free;
    },
  },
  methods: {
    addGood() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addGood", { type_id: this.type_id, number: this.count, shelf_id: this.shelf_id });
      }
    }
  },
  async created() {
    try {
      const shelfApi = require("@/api/api.js").shelfApi.get;
      const typeApi = require("@/api/api.js").typeApi.get;

      shelfApi().then(({ data }) => {
        if (data) {
          data.map(val => Object.assign(val, { free: val.count - val.number, text: `${val.id} (Осталось места: ${val.count - val.number})` }))
          this.shelfs = data.filter(val => val.free > 0);
        }
      });

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