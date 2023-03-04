<template>
  <v-layout>
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon @click="drawer.show = !drawer.show"/>
      </template>
      <v-app-bar-title>dExplorer</v-app-bar-title>
      <template #append>
        <span class="text-caption">v1.0</span>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer.show">
      <v-list nav>
        <v-list-item 
          v-for="item, index in drawer.items" 
          :key="index" 
          :title="item.text" 
          :prepend-icon="item.icon"
          :to="item.to"
          active-color="primary"
          link
        />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
export default {
  name: 'dExplorer',
  data: () => ({
    drawer: {
      show: true,
      items: [
        {icon: 'mdi-home', text: 'Home', to: {name: 'home'}},
        {icon: 'mdi-cog', text: 'Settings', to: {name: 'settings'}},

      ]
    }
  }),
  created(){
    this.$store.dispatch(
      'init', 
      //'http://localhost:8545'
      undefined
    )
  }
}
</script>
