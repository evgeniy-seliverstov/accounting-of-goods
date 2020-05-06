<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn class="mb-5 elevation-3" to="/order/add">Оформить заказ</v-btn>
        <v-data-table
          :headers="headers"
          :items="orders"
          :items-per-page="5"
          :search="search"
          no-data-text="Данных нет"
          no-results-text="Не найдено"
          class="elevation-3 table"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon size="18" color="red darken-2" @click="clickOnTrash(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:item.goods="{ item }">
            <div v-for="good in item.goods" :key="good.id">{{ good.name }}: {{ good.count }} шт.</div>
          </template>
        </v-data-table>
      </v-col>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">Удалить выбранный заказ?</v-card-title>
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
  { text: '№', align: 'center', value: 'number'},
  { text: 'Товары', align: 'center', value: 'goods'},
  { text: 'Дата', align: 'center', value: 'date'},
  { text: 'Действия', align: 'center', value: 'actions', sortable: false }
];

export default {
  name: "Order",
  data: function(){
    return {
      search: "",
      headers,
      dialog: false,
      chosenItem: null
    }
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  },
  methods: {
    deleteItem() {
      if (this.chosenItem) {
        this.$store.dispatch("removeOrder", this.chosenItem.id);
        this.dialog = false;
      }
    },
    clickOnTrash(order) {
      this.dialog = true;
      this.chosenItem = order;
    }
  },
  async created() {
    try {
      const getOrders = require("@/api/api.js").orderApi.get;
      getOrders().then(({ data }) => {
        if (data) {
          this.$store.commit("setOrders", data);
        }
      });
    } catch(error) {
      if (error.response.data.error) this.$noty.error(error.response.data.error);
      else console.error(error);
    }
  }
}
</script>

<style lang="scss">
</style>