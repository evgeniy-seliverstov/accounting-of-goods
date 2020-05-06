<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn class="mb-5 elevation-3" to="/supplier/add">Добавить поставщика</v-btn>
        <v-data-table
          :headers="headers"
          :items="suppliers"
          :items-per-page="5"
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
      <v-dialog v-model="dialog" max-width="450">
        <v-card>
          <v-card-title class="headline">Удалить выбранного поставщика?</v-card-title>
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
  { text: 'Имя', align: 'center', value: 'name'},
  { text: 'Адресс',  align: 'center', value: 'address' },
  { text: 'Телефон',  align: 'center', value: 'phone' },
  { text: 'Действия', align: 'center', value: 'actions', sortable: false }
];

export default {
  name: "Supplier",
  data: function(){
    return {
      search: "",
      headers,
      dialog: false,
      chosenItem: null
    }
  },
  computed: {
    suppliers() {
      return this.$store.state.suppliers;
    }
  },
  methods: {
    editItem(supplier) {
      this.$router.push(`/supplier/${supplier.id}/edit`);
    },
    deleteItem() {
      if (this.chosenItem) {
        this.$store.dispatch("removeSupplier", this.chosenItem.id);
        this.dialog = false;
      }
    },
    clickOnTrash(supplier) {
      this.dialog = true;
      this.chosenItem = supplier;
    }
  },
  async created() {
    try {
      const getSupplier = require("@/api/api.js").supplierApi.get;
      getSupplier().then(({ data }) => {
        if (data) {
          this.$store.commit("setSuppliers", data);
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