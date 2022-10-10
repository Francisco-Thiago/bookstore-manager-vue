import { defineStore } from "pinia"
import Swal from 'sweetalert2'
import Users from "../services/users"

export const jwtToken = defineStore("jwtToken", {
    state: () => {
        return { jwtToken: localStorage.getItem('token') || '' }
    },
    actions: {
        clearToken() {
            localStorage.clear()
        },
        newToken(username, password) {
            this.clearToken()
            Users.authenticate({
                username: username.toUpperCase().trim(),
                password: password.trim()
            }).then(res => {
                this.responseMessageAPI(res.status, "Autenticado com sucesso.")
                const { jwtToken } = res.data
                localStorage.setItem('token', jwtToken)
                this.$state.jwtToken = localStorage.getItem('token')
            }).catch(res => {
                this.responseMessageAPI(res.response.status, "Usuário inválido.")
            })
        },
        responseMessageAPI(code, message) {
            if (code >= 200 && code < 300) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${message}`,
                    showConfirmButton: false,
                    padding: '3em',
                    color: '#5bf52d',
                    background: '#2e2c2c',
                    timer: 1500
                })
                setTimeout(() => {this.login = false}, 1000)
                
            } else if (code >= 300 && code < 400) {
                Swal.fire(
                    'Psiu!',
                    `${message}`,
                    'info'
                )
            } else if (code >= 400 && code < 500) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${message}`,
                    showConfirmButton: false,
                    padding: '3em',
                    color: 'rgb(231, 85, 109)',
                    background: '#2e2c2c',
                    timer: 1500
                })
            } else if (code >= 500 && code < 600) {
                Swal.fire({
                    title: `Um problema delicado ocorreu.`,
                    text: `${message} Não resolveu? Contate-me.`,
                    icon: 'error',
                    footer: `<a href="mailto:vieirathiago779@gmail.com" target="_blank">Contate-me através deste email </a>`
                })
            }
        }
    }
})