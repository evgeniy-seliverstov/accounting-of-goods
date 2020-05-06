<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn class="mb-5 elevation-3" to="/type/add">Добавить вид товара</v-btn>
        <v-data-table
          :headers="headers"
          :items="types"
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
      <v-dialog v-model="dialog" max-width="430">
        <v-card>
          <v-card-title class="headline">Удалить выбранный вид товара?</v-card-title>
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
  { text: 'Название', align: 'center', value: 'name'},
  { text: 'Поставщик',  align: 'center', value: 'supplier' },
  { text: 'Действия', align: 'center', value: 'actions', sortable: false }
];

export default {
  name: "Type",
  data: function(){
    return {
      search: "",
      headers,
      dialog: false,
      chosenItem: null
    }
  },
  computed: {
    types() {
      return this.$store.state.types;
    }
  },
  methods: {
    editItem(type) {
      this.$router.push(`/type/${type.id}/edit`);
    },
    deleteItem() {
      if (this.chosenItem) {
        this.$store.dispatch("removeType", this.chosenItem.id);
        this.dialog = false;
      }
    },
    clickOnTrash(type) {
      this.dialog = true;
      this.chosenItem = type;
    }
  },
  async created() {
    try {
      const getType = require("@/api/api.js").typeApi.get;
      getType().then(({ data }) => {
        if (data) {
          this.$store.commit("setTypes", data);
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