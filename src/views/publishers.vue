<template>
<v-app id="inspire" class="main-viewer">
    <v-main class="grey lighten-3" style="align-items: center;">
        <v-container>
            <v-row>
                <v-col>
                    <v-sheet rounded="lg">
                        <v-data-table :headers="headers" :items="publishers" :search="search" height="50vh" item-height="20" sort-by="id" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>Editoras</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="create" max-width="500px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                                Nova editora
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">Criar editora</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-form ref="form" v-model="valid">
                                                    <v-container>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field :rules="nameRules" v-model="createdItem.name" :counter="255" label="Nome da editora" required></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field :rules="codeRules" v-model="createdItem.code" :counter="50" label="Código" required></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field :rules="cityRules" v-model="createdItem.city" :counter="60" label="Cidade" required></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-form>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="closeCreate">
                                                    Cancelar
                                                </v-btn>
                                                <v-btn :disabled="!valid" color="blue darken-1" text @click="post">
                                                    Salvar
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="edit" max-width="500px">
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">Editar editora</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-form ref="form" v-model="valid">
                                                    <v-container>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field :rules="nameRules" v-model="editedItem.name" :counter="255" label="Nome da editora" required></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field :rules="codeRules" v-model="editedItem.code" :counter="50" label="Código" required></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field :rules="cityRules" v-model="editedItem.city" :counter="60" label="Cidade" required></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-form>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="closeEdit">
                                                    Cancelar
                                                </v-btn>
                                                <v-btn :disabled="!valid" color="blue darken-1" text @click="put">
                                                    Salvar
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-icon small class="mr-2" @click="editItem(item)">
                                    mdi-pencil
                                </v-icon>
                                <v-icon small @click="deleteAlert($event)">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <template v-slot:no-data>
                                <v-btn color="primary">
                                    Resetar
                                </v-btn>
                            </template>
                        </v-data-table>
                        <!--  -->
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<style>
.main-viewer {
    margin-left: 250px;
}
</style>

<script>
import {
    jwtToken
} from "@/stores/jwtToken"
import Publishers from "../services/publishers"
import Swal from 'sweetalert2'

export default {

    data() {
        return {
            token: jwtToken(),
            publishers: [],
            bookTitle: [],
            search: '',
            create: false,
            edit: false,
            headers: [{
                    text: 'Id',
                    align: 'start',
                    value: 'id',
                },
                {
                    text: 'Nome',
                    value: 'name'
                },
                {
                    text: 'Código',
                    value: 'code'
                },
                {
                    text: 'Cidade',
                    value: 'city'
                },
                {
                    text: 'Data de registro',
                    value: 'registrationDate'
                },
                {
                    text: 'Ações',
                    value: 'actions',
                    sortable: false
                }
            ],
            editedIndex: -1,
            createdItem: {
                id: 0,
                name: "",
                city: "",
                code: "",
            },
            editedItem: {
                id: 0,
                name: "",
                city: "",
                code: "",
            },
            defaultItem: {
                id: 0,
                name: "",
                city: "",
                code: "",
            },
            valid: false,
            nameRules: [
                v => !!v || 'Nome é necessário.',
                v => v.length <= 255 || 'Quantidade máxima de cacteres excedida!',
            ],
            cityRules: [
                v => !!v || 'Cidade é necessária.',
                v => v.length <= 60 || 'Quantidade máxima de cacteres excedida!',
            ],
            codeRules: [
                v => !!v || 'Código é necessário.',
                v => v.length <= 50 || 'Quantidade máxima de cacteres excedida!',
            ],
        }

    },

    watch: {
        create(val) {
            val || this.closeCreate()
        },
        edit(val) {
            val || this.closeEdit()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    mounted() {
        this.listData()
    },
    methods: {

        deleteAlert(event) {
            const selectedId = event.composedPath()[2].firstChild.textContent

            Swal.fire({
                title: 'Você tem certeza?',
                text: "Esta ação é irreversível, tem certeza que deseja excluir?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: "Cancelar",
                confirmButtonText: 'Sim, apenas delete!'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (selectedId > 0) {
                        Publishers.delete(selectedId, this.token.jwtToken).then(response => {
                            this.listData()
                            this.responseMessageAPI(response.status, response.data.message)
                        }).catch(response => {
                            this.responseMessageAPI(response.response.data.code, response.response.data.message)
                        })
                    }
                }
            })
        },

        editItem(item) {
            this.editedIndex = this.publishers.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.edit = true
        },

        deleteItem(item) {
            this.editedIndex = this.publishers.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.publishers.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        closeCreate() {
            this.create = false
            this.$nextTick(() => {
                this.createdItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeEdit() {
            this.edit = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        post() {
            if (this.valid) {
                Publishers.save(this.createdItem, this.token.jwtToken).then(res => {
                    this.listData()
                    this.responseMessageAPI(res.status, res.data.message)
                }).catch(res => {
                    this.responseMessageAPI(res.response.data.code, res.response.data.message)
                })
                this.closeCreate()
            } else {
                this.$refs.form.validate()
            }
        },

        put() {
            if (this.valid) {
                Publishers.update(this.editedItem.id, this.editedItem, this.token.jwtToken).then(response => {
                    this.listData()
                    this.responseMessageAPI(response.status, response.data.message)
                    if (response.status >= 200 && response.status < 300) {
                        this.closeEdit()
                    }
                }).catch(res => {
                    this.responseMessageAPI(res.response.data.code, res.response.data.message)
                })
            } else {
                this.$refs.form.validate()
            }
        },

        listData() {
            if (this.publishers.length > 0) {
                this.publishers = []
            }

            Publishers.listAll(this.token.jwtToken).then(response => {
                response.data.content.map(e => {
                    e["registrationDate"] = e["registrationDate"].split("-").reverse().join("/")
                    this.publishers.push(e)
                })
            }).catch(() => {
                window.location.pathname = '/'
            })
        },

        responseMessageAPI(code, message) {
            if (code >= 200 && code < 300) {
                Swal.fire(
                    'Realizado com sucesso!',
                    `${message}`,
                    'success'
                )
            } else if (code >= 300 && code < 400) {
                Swal.fire(
                    'Psiu!',
                    `${message}`,
                    'info'
                )
            } else if (code >= 400 && code < 500) {
                Swal.fire(
                    'Um erro inesperado ocorreu!',
                    `${message}`,
                    'error'
                )
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
}
</script>
