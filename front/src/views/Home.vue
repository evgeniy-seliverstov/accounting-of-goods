<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <h1>Добро пожаловать в систему учета товара на складе</h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  created() {
    this.$router.replace("/good");
  }
}
</script>
