<template>
  <v-container
    class="text-center"
    fill-height
    style="height: calc(100vh - 58px);"
  >
    <v-row align="center">
      <v-col>
        <h1 class="display-2 primary--text">Опачки, 404</h1>

        <p>Страница, которую вы ищите, не найдена</p>

        <v-btn
          to="/"
          color="primary darken-1"
          dark
        >
          На главную
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'NotFound',
  }
</script>