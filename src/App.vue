<template>
<v-app>
    <header class="menu" v-if="verifyRouter()" app flat>
        <span class="close" v-if="!barStatus" @click="closeMenu">
            <IosClose class="close-icon" /></span>
        <v-container class="menu-container py-0 fill-height">
            <router-link to="/dashboard">
                <v-img max-height="60" max-width="80" src="../src/assets/logo.svg" link></v-img>
            </router-link>

            <div class="group-button">
                <router-link v-for="link of links" :key="link.item" :to="link.route">
                    <span class="menu-button">{{ link.item }}</span>
                </router-link>
            </div>
            <p style="color: #fff;">Seja bem-vindo(a)!</p>
        </v-container>
    </header>
    <v-app-bar v-if="barStatus" class="app-menu" absolute color="pink" elevate-on-scroll>
        <v-app-bar-nav-icon style="color: white" @click="openMenu"></v-app-bar-nav-icon>
        <v-toolbar-title style="color: white">Bookstore Manager</v-toolbar-title>
    </v-app-bar>
    <router-view />
</v-app>
</template>

<script>
import {
    jwtToken
} from "../src/stores/jwtToken"
import IosClose from "vue-ionicons/dist/ios-close.vue";
export default {
    name: "App",
    data: () => ({
        username: "",
        password: "",
        barStatus: true,
        jwtToken: jwtToken(),
        login: false,
        links: [{
            item: "Dashboard",
            route: "/dashboard"
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
            this.jwtToken.newToken(this.username, this.password);
        },
        verifyRouter(route = window.location.pathname) {
            let isTrue = false;
            this.links.map(link => {
                if (link.route == route) {
                    isTrue = true;
                }
            });
            return isTrue;
        },
        openMenu() {
            const responsiveBar = document.querySelector('.menu')
            responsiveBar.style.display = 'block'
            this.barStatus = false
        },
        closeMenu() {
            const responsiveBar = document.querySelector('.menu')
            responsiveBar.style.display = 'none'
            this.barStatus = true
        }
    },
    components: {
        IosClose
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

input {
    font-family: 'Montserrat', sans-serif;
}

div .ion {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
}

html,
body,
.v-application--wrap,
.main-content {
    background-color: #1f1f1f;
    font-family: 'Montserrat', sans-serif;
}

.app-menu {
    display: none;
}

a {
    text-decoration: none;
    color: #fff;
}

.menu {
    transition: all 1s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    width: 250px;
    height: 100vh;
    position: fixed;
    z-index: 1;
    background-color: #1f1f1f;
}

.group-button {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.menu-button {
    display: block;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    font-size: 1.15rem;
    color: white;
    padding: .8rem;
    width: 200px;
    color: white;
    background-color: #2e2c2cdb;
    border-radius: 10px;
}

.selected {
    color: rgb(235, 107, 128);
}

.menu-button:hover {
    color: #eb6b80;
}

.menu-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.menu-item {
    color: #fff;
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

.close {
    cursor: pointer;
    display: grid;
    place-content: center;
    position: absolute;
    background-color: transparent;
    border: .2rem solid #fff;
    border-radius: 50px;
    color: #fff;
    width: 50px;
    height: 50px;
    font-size: 1.4rem;
    font-weight: bold;
    top: 1.5rem;
    right: 1.5rem;
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.close-icon {
    display: block;
    fill: #fff;
    font-size: 2rem;
}

.close:hover {
    border-color: rgb(231, 85, 109);
    background-color: rgb(231, 85, 109);
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

.content {
    max-width: 250px;
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

@keyframes menu {
    from {
        left: -100%;
    }

    to {
        left: 0;
    }
}

@media (max-width: 750px) {
    .app-menu {
        display: block;
    }
    .menu {
        display: none;
        animation: menu 1s cubic-bezier(0.77, 0, 0.175, 1);
        width: 100VW;
        height: 100vh;
        position: fixed;
        z-index: 1;
        background-color: #1f1f1f;
    }

}
</style>
