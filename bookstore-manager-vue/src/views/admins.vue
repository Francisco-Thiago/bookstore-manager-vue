<template>
<v-app id="inspire">
    <v-main class="grey lighten-3" style="align-items: center;">
        <v-container>
            <v-row>
                <v-col>
                    <v-sheet max-height="70vh" rounded="lg">
                        <v-data-table :headers="headers" :items="users" :search="search" height="50vh" item-height="20" sort-by="id" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>Usuários</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="create" max-width="500px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                                Novo administrador
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">Criar administrador</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-form ref="form" v-model="valid">
                                                    <v-container>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field v-model="createdItem.name" :rules="nameRules" :counter="255" label="Nome completo" required></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field v-model="createdItem.email" :rules="emailRules" :counter="255" label="E-mail" required></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field v-model="createdItem.address" :rules="addressRules" label="Endereço" required></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field v-model="createdItem.city" :rules="cityRules" label="Cidade" required></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field v-model="createdItem.username" :rules="usernameRules" label="Username" required></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field v-model="createdItem.password" :rules="passwordRules" label="Senha" required></v-text-field>
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
                                                <span class="text-h5">Editar administrador</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-form ref="form" v-model="valid">
                                                    <v-container>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field v-model="editedItem.name" :rules="nameRules" :counter="255" label="Nome completo" required></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field v-model="editedItem.email" :rules="emailRules" :counter="255" label="E-mail" required></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field v-model="editedItem.address" :rules="addressRules" label="Endereço" required></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field v-model="editedItem.city" :rules="cityRules" label="Cidade" required></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field v-model="editedItem.username" :rules="usernameRules" label="Username" required></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field v-model="editedItem.password" :rules="passwordRules" label="Senha" required></v-text-field>
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

<script>
import Users from "../services/users"
import Swal from 'sweetalert2'

export default {

    data() {
        return {
            users: [],
            search: '',
            create: false,
            edit: false,
            dialogDelete: false,
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
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Cidade',
                    value: 'city'
                },
                {
                    text: 'Endereço',
                    value: 'address'
                },
                {
                    text: 'Data de registro',
                    value: 'registrationDate'
                },
                {
                    text: 'Cargo',
                    value: 'role'
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
                email: "",
                city: "",
                address: "",
                registrationDate: "",
                username: "",
                password: "",
                role: "ADMIN"
            },
            editedItem: {
                id: 0,
                name: "",
                email: "",
                city: "",
                address: "",
                registrationDate: "",
                username: "",
                password: "",
                role: "ADMIN"
            },
            defaultItem: {
                id: 0,
                name: "",
                email: "",
                city: "",
                address: "",
                registrationDate: "",
                role: "ADMIN"
            },
            valid: false,
            nameRules: [
                v => !!v || 'Nome é necessário.',
                v => v.length <= 255 || 'Quantidade máxima de cacteres excedida!',
            ],
            cityRules: [
                v => !!v || 'Cidade é necessária.',
                v => v.length <= 255 || 'Quantidade máxima de cacteres excedida!',
            ],
            addressRules: [
                v => !!v || 'Endereço é necessário.',
                v => v.length <= 255 || 'Quantidade máxima de cacteres excedida!',
            ],
            emailRules: [
                v => !!v || 'E-mail é necessário.',
                v => /.+@+./.test(v) || 'E-mail deve ser válido!',
            ],
            usernameRules: [
                v => !!v || 'Username é necessário.',
                v => v.length <= 255 || 'Quantidade máxima de cacteres excedida!',
            ],
            passwordRules: [
                v => !!v || 'Senha é necessária.',
                v => v.length <= 140 || 'Quantidade máxima de cacteres excedida!',
            ]
        }
    },

    watch: {
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    mounted() {
        this.listData()
    },
    methods: {
        listData() {
            if (this.users.length > 0) {
                this.users = []
            }

            Users.listAll().then(response => {
                response.data.content.map(adminContent => {
                    adminContent["role"] != "USER" ? this.users.push(adminContent) : ""
                })
            })
        },
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
                        Users.deleteAdmin(selectedId).then(response => {
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
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.edit = true
        },

        deleteItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.users.splice(this.editedIndex, 1)
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
                Users.saveAdmin(this.createdItem).then(res => {
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
                Users.updateAdmin(this.editedItem.id, this.editedItem).then(response => {
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
    }
}
</script>
