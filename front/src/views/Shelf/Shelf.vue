<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn class="mb-5 elevation-3" to="/shelf/add">Добавить полку</v-btn>
        <v-data-table
          :headers="headers"
          :items="shelfs"
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
          <template v-slot:item.count="{ item }">
            <span class="mr-3 d-inline-block" style="width: 60px">{{`${item.number ? item.number : 0} / ${item.count}`}}</span>
            <v-progress-circular
              :color="colorPercent(100 * item.number / item.count)"
              size="25"
              :value="100 * item.number / item.count"
              width="4"
            ></v-progress-circular>
          </template>
        </v-data-table>
      </v-col>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">Удалить выбранную полку?</v-card-title>
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
  { text: '№', align: 'center', value: 'id'},
  { text: 'Вместимость, шт.', align: 'center', value: 'count'},
  { text: 'Действия', align: 'center', value: 'actions', sortable: false }
];

export default {
  name: "Shelf",
  data: function(){
    return {
      search: "",
      headers,
      dialog: false,
      chosenItem: null
    }
  },
  computed: {
    shelfs() {
      return this.$store.state.shelfs;
    }
  },
  methods: {
    editItem(shelf) {
      this.$router.push(`/shelf/${shelf.id}/edit`);
    },
    deleteItem() {
      if (this.chosenItem) {
        this.$store.dispatch("removeShelf", this.chosenItem.id);
        this.dialog = false;
      }
    },
    clickOnTrash(shelf) {
      this.dialog = true;
      this.chosenItem = shelf;
    },
    colorPercent(value) {
      if (value <= 90) {
        return "green darken-2";
      } else {
        return "red darken-3";
      }
    }
  },
  async created() {
    try {
      const getShelfs = require("@/api/api.js").shelfApi.get;
      getShelfs().then(({ data }) => {
        if (data) {
          this.$store.commit("setShelfs", data);
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