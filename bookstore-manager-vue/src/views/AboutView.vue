<template>
  <div class="about">
    <h1> {{ produtos[0].name }} </h1>
  </div>
</template>
<script>
import Produto from "../services/products"

export default {
  data() {
    return {
      produtos: []
    }
  },
  mounted() {
    Produto.listar().then(response => {
      response.data.content.map(e => {
        const {name, code, quantity, release} = e;
        this.produtos.push(e)

        console.log(
          this.produtos
          +"nome -> "+ name 
          +"\ncode -> "+ code 
          +"\nrelease -> "+ release 
          +"\nquantity -> "+ quantity
        );
      })
    })
  }
}
</script>
