<template>
<main>
    <form class="main-content" @submit.prevent="handleSubmit">
        <div class="welcome">
            <h1>Esqueceu a senha?</h1>
        </div>
        <div class="input-group">
            <label class="label-icon">
                <IosKey class="icon" />
                <input type="password" v-model="newPassword" placeholder="Digite sua senha" class="input-text" required>
            </label>
            <label class="label-icon">
                <IosKey class="icon" />
                <input type="password" v-model="repeatPassword" placeholder="Digite novamente" class="input-text" required>
            </label>
        </div>
        <input type="submit" class="button" value="Alterar senha">
        <router-link to="/">
            <span class="login-return">Fazer login</span>
        </router-link>
    </form>
</main>
</template>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

div .ion {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
}

html,
.main-content {
    background-color: #1f1f1f;
    font-family: 'Montserrat', sans-serif;
}

a {
    color: #000;
    text-decoration: none;
}

.login-return {
    color: rgb(231, 85, 109);
}


.label-icon {
    position: relative;
}

.icon {
    position: absolute;
    left: 27px;
    top: 1.9rem;
    font-size: 1.5rem;
    transform: translate(-50%, -50%);
    fill: #fff;
}

.main-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem 0;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    color: #fff;
    padding: 1rem;
}

.welcome {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
}

.welcome img {
    width: 100px;
    height: 100px;
    fill: #fff;
    object-fit: cover;
}

.welcome h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    font-size: 3.5rem;
}

.welcome p {
    font-size: 1.5rem;
}

.input-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem 0;
}

.input-text {
    font-family: 'Big John PRO';
    padding: 1rem 1.25rem 1rem 50px;
    outline: none;
    color: #fff;
    font-size: 1.25rem;
    width: 350px;
    background-color: #2e2c2c;
    border-radius: 10px;
    border: none;
    transition: outline .2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.input-text:focus-within {
    outline: .2rem solid #fff;
}

.button {
    cursor: pointer;
    height: 55px;
    color: #fff;
    font-family: 'Big John PRO';
    font-weight: 500;
    padding: .5rem 2rem;
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    background-color: transparent;
    border: .2rem solid #fff;
    font-weight: 550;
    font-size: 1.3rem;
    border-radius: .5rem;
}

.button:hover {
    color: #fff;
    border-color: rgb(231, 85, 109);
    background-color: rgb(231, 85, 109);
}
</style>

<script>
import Swal from 'sweetalert2'
import {
    jwtToken
} from "../stores/jwtToken"
import IosKey from "../../node_modules/vue-ionicons/dist/ios-key.vue";
export default {
    name: "App",
    data: () => ({
        repeatPassword: '',
        newPassword: '',
        jwtToken: jwtToken(),
        links: [{
            item: "Dashboard",
            route: "/"
        }, {
            item: "Editoras",
            route: "/publishers"
        }, {
            item: "Livros",
            route: "/books"
        }, {
            item: "Alugueis",
            route: "/rentals"
        }, {
            item: "Usuarios",
            route: "/users"
        }]
    }),
    methods: {
        handleSubmit() {
            if (this.newPassword.trim().length != 0 && this.newPassword.trim() == this.repeatPassword.trim()) {
                this.jwtToken.forget(this.newPassword.trim())
            } else {
                Swal.fire(
                    'Informações inválidas',
                    'Digite corretamente seus dados.',
                    'error'
                )
            }
        }
    },
    components: {
        IosKey
    }
};
</script>
