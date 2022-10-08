<template>
<v-app>

    <v-app-bar v-if="verifyRouter()" app color="pink" flat>
        <v-container class="py-0 fill-height">
            <router-link to="/">
                <v-img max-height="60" max-width="80" src="../src/assets/logo.svg" link></v-img>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn class="menu-item" v-for="link of links" :key="link.item" :to="link.route" link text>
                {{ link.item }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn to="login" dark>
                Login
            </v-btn>
        </v-container>
    </v-app-bar>
    <router-view />
</v-app>
</template>

<script>
import {
    jwtToken
} from "../src/stores/jwtToken"
export default {
    name: "App",
    data: () => ({
        username: '',
        password: '',
        jwtToken: jwtToken(),
        login: false,
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
        }, {
            item: "Admins",
            route: "/admins"
        }]
    }),
    methods: {
        handleSubmit() {
            this.jwtToken.newToken(this.username, this.password)
        },
        verifyRouter(route = window.location.pathname) {
            return route != '/login'
        }
    },
};
</script>

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
    font-family: 'Big John PRO';
}

a {
    text-decoration: none;
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
</style>
