<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="actions__wrapp">  
          <v-btn class="mb-5 elevation-3" to="/good/add">Добавить товар</v-btn>
          <v-btn class="mb-5 ml-4 elevation-3" to="/good" active-class="active" @click="chosenSupplier = null">Все товары</v-btn>
          <v-btn class="mb-5 ml-4 elevation-3" to="/good?filter=stock" active-class="active" @click="chosenSupplier = null">В наличии</v-btn>
          <v-btn class="mb-5 ml-4 elevation-3" to="/good?filter=fill" active-class="active" @click="chosenSupplier = null">Необходимо пополнить</v-btn>
          <v-select
            class="ml-4 d-inline-block"
            v-model="chosenSupplier"
            :items="suppliers"
            item-text="name"
            item-value="id"
            label="Поставщик"
          ></v-select>
        </div>
        <v-data-table
          :headers="headers"
          :items="goods"
          :items-per-page="10"
          :search="search"
          no-data-text="Данных нет"
          no-results-text="Не найдено"
          class="elevation-3 table"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon size="18" class="mr-2" color="grey lighten-1" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="18" color="red darken-2" @click="clickOnTrash(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">Удалить выбранный товар?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialog = false">
              Нет
            </v-btn>
            <v-btn color="green darken-1" text @click="deleteItem">
              Да
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
const headers = [
  { text: '№', align: 'center', value: 'n'},
  { text: 'Название', align: 'center', value: 'type_name'},
  { text: 'Кол-во, шт.',  align: 'center', value: 'number' },
  { text: 'Номер полки', align: 'center', value: 'shelf_id' },
  { text: 'Действия', align: 'center', value: 'actions', sortable: false }
];

export default {
  name: "Good",
  data: function(){
    return {
      search: "",
      headers,
      dialog: false,
      chosenItem: null,
      suppliers: [],
      chosenSupplier: null
    }
  },
  computed: {
    goods() {
      if (this.chosenSupplier) {
        return this.$store.getters.supplier(this.chosenSupplier);
      }
      else if (this.$route.query.filter && this.$route.query.filter == "fill")
        return this.$store.getters.fill;
      else if (this.$route.query.filter && this.$route.query.filter == "stock")
        return this.$store.getters.stock;
      else return this.$store.state.goods;
    }
  },
  methods: {
    editItem(good) {
      this.$router.push(`/good/${good.id}/edit`);
    },
    deleteItem() {
      if (this.chosenItem) {
        this.$store.dispatch("removeGood", this.chosenItem.id);
        this.dialog = false;
      }
    },
    clickOnTrash(good) {
      this.dialog = true;
      this.chosenItem = good;
    }
  },
  async created() {
    try {
      const getGoods = require("@/api/api.js").goodApi.get;
      const getSuppliers = require("@/api/api.js").supplierApi.get;

      getGoods().then(({ data }) => {
        if (data) {
          this.$store.commit("setGoods", data);
        }
      });

      getSuppliers().then(({ data }) => {
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

<style lang="scss" scoped>
.active {
  background-color: #272727 !important;

  &::before {
    opacity: 0 !important;
  }
}
.actions__wrapp {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>