<template>
  <v-app>
    <v-app-bar
    app
    color="pink"
    flat
    >
    <v-container class="py-0 fill-height">
      <router-link to="/">
        <v-img
          max-height="60"
          max-width="80"
          src="../src/assets/logo.svg"
          link
        ></v-img>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn class="menu-item"
        v-for="link of links"
        :key="link.item"
        :to="link.route"
        link
        text
        >
        {{ link.item }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-container>
  </v-app-bar>
  <v-main>
      <router-view/>
  </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
  links: [
      {item: 'Dashboard', route: "/"},
      {item: 'Editoras', route: "/publishers"},
      {item: 'Livros', route: "/books"},
      {item: 'Alugueis', route: "/rentals"},
      {item: 'Usuarios', route: "/users"}
  ]
})
};

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
  *, button, input {
    font-family: 'Montserrat', sans-serif;
  }
</style>