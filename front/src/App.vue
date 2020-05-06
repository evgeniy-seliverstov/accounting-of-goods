<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense class="menu">
        <router-link class="menu__link" :to="item.route" v-for="item in menu" :key="item.title">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Учет товара на складе</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: function() {
    return {
      drawer: null
    }
  },
  computed: {
    menu() {
      return this.$store.state.menu
    }
  }
}
</script>

<style lang="scss">
.menu {
  &__link {
    text-decoration: none;

    .v-list-item {
      transition: .3s ease;

      &:hover {
        background: rgba(255,255,255, .1);
      }
    }
    
    &.router-link-active {
      .v-list-item {
        background: rgba(255,255,255, .1);
      }
    }
  }
}
.v-list-item__title {
  font-size: 16px !important;
}
</style>