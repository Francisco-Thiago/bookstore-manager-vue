<template>
<v-app id="inspire">
    <v-main class="grey lighten-3" style="align-items: center;">
        <v-container>
            <v-row>
                <v-col>
                    <v-sheet max-height="70vh" rounded="lg">
                        <v-data-table :headers="headers" :items="rentals" :search="search" height="50vh" item-height="20" sort-by="id" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>Aluguéis</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="create" max-width="500px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                                Novo aluguel
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">Criar aluguel</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-form ref="form" v-model="valid">

                                                    <v-container>
                                                        <v-row>
                                                            <v-col>
                                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="createdItem.expirationDate" transition="scale-transition" offset-y min-width="auto">
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-text-field hint="Selecione uma data" persistent-hint :rules="dateRules" v-model="createdItem.expirationDate" label="Data de expiração" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                                    </template>
                                                                    <v-date-picker :allowed-dates="allowedDates" v-model="createdItem.expirationDate" no-title scrollable>
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn text color="primary" @click="menu = false">
                                                                            Cancelar
                                                                        </v-btn>
                                                                        <v-btn text color="primary" @click="$refs.menu.save(createdItem.expirationDate)">
                                                                            OK
                                                                        </v-btn>
                                                                    </v-date-picker>
                                                                </v-menu>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-autocomplete :rules="bookRules" hint="Selecione um livro" persistent-hint v-model="createdItem.book" :items="booksTitle" v-on:input="findBook" deletable-chips solo required></v-autocomplete>
                                                            </v-col>
                                                            <v-col>
                                                                <v-autocomplete :rules="userRules" hint="Selecione um usuário" persistent-hint v-model="createdItem.user" :items="usersName" v-on:input="findUser" deletable-chips solo required></v-autocomplete>
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
                                                <span class="text-h5">Alterar data de expiração</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-form ref="form" v-model="valid">
                                                    <v-container>
                                                        <v-row>
                                                            <v-col>
                                                                <v-menu ref="menuEdit" v-model="menuEdit" :close-on-content-click="false" :return-value.sync="editedItem.expirationDate" transition="scale-transition" offset-y min-width="auto">
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-text-field hint="Selecione uma data" persistent-hint :rules="dateRules" v-model="editedItem.expirationDate" label="Data de expiração" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                                    </template>
                                                                    <v-date-picker :allowed-dates="allowedDates" v-model="editedItem.expirationDate" no-title scrollable>
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn text color="primary" @click="menuEdit = false">
                                                                            Cancelar
                                                                        </v-btn>
                                                                        <v-btn text color="primary" @click="$refs.menuEdit.save(editedItem.expirationDate)">
                                                                            OK
                                                                        </v-btn>
                                                                    </v-date-picker>
                                                                </v-menu>
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
                                                <v-btn color="blue darken-1" text @click="put">
                                                    Salvar
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-icon title="Devolver" small class="mr-2" @click="returnBook($event)">
                                    mdi-book-arrow-left
                                </v-icon>
                                <v-icon title="Editar" small class="mr-2" @click="editItem(item)">
                                    mdi-pencil
                                </v-icon>
                                <v-icon title="Excluir" small class="mr-2" @click="deleteAlert($event)">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <template v-slot:no-data>
                                <v-btn color="primary">
                                    Reset
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
import Rentals from "../services/rentals"
import Books from "../services/books"
import Users from "../services/users"
import Swal from 'sweetalert2'

export default {

    data() {
        return {
            rentals: [],
            booksTitle: [],
            usersName: [],
            books: [],
            users: [],
            search: '',
            menu: '',
            menuEdit: '',
            create: false,
            edit: false,
            bookId: 0,
            userId: 0,
            dialogDelete: false,
            headers: [{
                    text: 'Id',
                    align: 'start',
                    value: 'id',
                },
                {
                    text: 'Data de entrada',
                    value: 'entryDate'
                },
                {
                    text: 'Data de expiração',
                    value: 'expirationDate'
                },
                {
                    text: 'Data de Devolução',
                    value: 'returnDate'
                },
                {
                    text: 'Livro',
                    value: 'book'
                },
                {
                    text: 'Usuário',
                    value: 'user'
                },
                {
                    text: 'Status',
                    value: 'status'
                },
                {
                    text: 'Ações',
                    value: 'actions',
                    sortable: false
                },
            ],
            valid: false,
            bookRules: [
                v => !!v || 'Livro é necessário.',
            ],
            userRules: [
                v => !!v || 'Usuário é necessário.',
            ],
            dateRules: [
                v => !!v || 'Data é necessária.',
            ],
            editedIndex: -1,
            createdItem: {
                id: 0,
                book: "",
                user: "",
                expirationDate: "" 
            },
            editedItem: {
                id: 0,
                expirationDate: ""
            },
            defaultItem: {
                id: 0,
                expirationDate: "" 
            }

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
        }
    },

    computed: {
        computedDateFormatted() {
            return this.formatDate(this.editedItem.expirationDate)
        },
    },

    mounted() {
        this.listData()
    },
    methods: {

        listData() {

            if (this.rentals.length > 0 || this.books.length > 0) {
                this.rentals = []
                this.books = []
            }

            Rentals.listAll().then(response => {
                response.data.content.map(rentalContent => {
                    if(rentalContent["returnDate"] != null) {
                        rentalContent["returnDate"] = rentalContent["returnDate"].split("-").reverse().join("/")
                    }
                    rentalContent["entryDate"] = rentalContent["entryDate"].split("-").reverse().join("/")
                    rentalContent["expirationDate"] = rentalContent["expirationDate"].split("-").reverse().join("/")
                    rentalContent["book"] = rentalContent["book"]["name"]
                    rentalContent["user"] = rentalContent["user"]["name"]
                    this.rentals.push(rentalContent)
                })
            })

            Books.listAll().then(response => {
                response.data.content.map(bookContent => {
                    if (bookContent["quantity"] > 0) {
                        this.booksTitle.push(bookContent["name"])
                        this.books.push({
                            id: bookContent["id"],
                            value: bookContent["name"]
                        })
                    }
                })
            })

            Users.listAll().then(response => {
                response.data.content.map(userContent => {
                    if (userContent["role"] != "ADMIN") {
                        this.usersName.push(userContent["name"])
                        this.users.push({
                            id: userContent["id"],
                            value: userContent["name"]
                        })
                    }
                })
            })

        },

        allowedDates: val => {
            const [year, month, day] = val.split('-')
            const today = new Date()

            return (today.getFullYear() == parseInt(year) && parseInt(month) == (today.getMonth() + 1)) &&
                today.getDate() <= parseInt(day) ||
                today.getFullYear() == parseInt(year) && parseInt(month) > (today.getMonth() + 1) ||
                today.getFullYear() < parseInt(year)
        },

        formatDate(date) {
            return date.indexOf("-") != -1 ? date.split("-").reverse().join("/") : ""
        },

        parseDate(date) {
            return date.indexOf("/") != -1 ? date.split("/").reverse().join("-") : ""
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
                        Rentals.delete(selectedId).then(response => {
                            this.listData()
                            this.responseMessageAPI(response.status, response.data.message)
                        }).catch(response => {
                            this.responseMessageAPI(response.response.status, response.response.data.message)
                        })
                    }
                }
            })
        },

        findBook() {
            const bookFound = this.books.find(e => e["value"] == this.createdItem.book);
            if (bookFound != undefined) {
                this.bookId = bookFound["id"]
            } else {
                this.bookId = 0
            }
        },

        findUser() {
            const userFound = this.users.find(e => e["value"] == this.createdItem.user);
            if (userFound != undefined) {
                this.userId = userFound["id"]
            } else {
                this.userId = 0
            }
        },

        editItem(item) {
            this.editedIndex = this.rentals.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.edit = true
        },

        deleteItem(item) {
            this.editedIndex = this.rentals.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.rentals.splice(this.editedIndex, 1)
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

        returnBook(event) {
            const selectedId = +event.composedPath()[2].firstChild.textContent
            Rentals.return(selectedId).then(response => {
                this.listData()
                this.responseMessageAPI(response.response.status, response.data.message)
            }).catch(res => {
                this.responseMessageAPI(res.response.status, res.response.data.message)
            })
        },

        post() {
            if (this.valid) {
                Rentals.save(this.buildJson(this.createdItem)).then(res => {
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
                Rentals.expiration(this.editedItem.id, this.editedItem).then(response => {
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

        getFormattedDate(date, format) {
            return format
                .replace("YYYY", date.getFullYear())
                .replace("dd", date.getDate())
                .replace("mm", date.getMonth() + 1)
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
        },

        buildJson(itemToCreate) {
            return {
                id: itemToCreate.id,
                expirationDate: itemToCreate.expirationDate,
                bookId: this.bookId,
                userId: this.userId
            }
        }
    }
}
</script>
