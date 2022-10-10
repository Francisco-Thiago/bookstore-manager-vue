<template>
<v-app id="inspire" class="main-viewer">
    <v-main class="grey lighten-3" style="align-items: center;">
        <v-container>
            <v-row>
                <v-col>
                    <v-sheet rounded="lg">
                        <v-data-table :headers="headers" :items="books" :search="search" height="50vh" item-height="20" sort-by="id" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>Livros</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="create" max-width="500px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                                Novo livro
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">Criar livro</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-form ref="form" v-model="valid">
                                                    <v-container>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field :rules="titleRules" v-model="createdItem.name" label="Título"></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-autocomplete :rules="publisherRules" hint="Selecione uma editora" persistent-hint v-model="createdItem.publisher" :items="publisherName" deletable-chips solo v-on:input="findPublisher" required></v-autocomplete>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field :rules="codeRules" v-model="createdItem.code" label="Código"></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field type="number" :rules="quantityRules" v-model="createdItem.quantity" label="Quantidade" required></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field :rules="authorRules" v-model="createdItem.author" label="Autor" required></v-text-field>
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
                                                <span class="text-h5">Editar livro</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-form ref="form" v-model="valid">
                                                    <v-container>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field :rules="titleRules" v-model="editedItem.name" label="Título"></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-autocomplete :rules="publisherRules" hint="Selecione uma editora" persistent-hint v-model="editedItem.publisher" :items="publisherName" deletable-chips solo v-on:input="findPublisherEdit" required></v-autocomplete>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field :disabled="true" :rules="codeRules" v-model="editedItem.code" label="Código"></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field type="number" :rules="quantityRules" v-model="editedItem.quantity" label="Quantidade" required></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-text-field :rules="authorRules" v-model="editedItem.author" label="Autor" required></v-text-field>
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
import Books from "../services/books"
import Publishers from "../services/publishers"
import Swal from 'sweetalert2'

export default {

    data() {
        return {
            books: [],
            publishers: [],
            publisherName: [],
            search: '',
            publisherId: 0,
            create: false,
            edit: false,
            dialogDelete: false,
            headers: [{
                    text: 'Id',
                    align: 'start',
                    value: 'id',
                },
                {
                    text: 'Título',
                    value: 'name'
                },
                {
                    text: 'Código',
                    value: 'code'
                },
                {
                    text: 'Autor',
                    value: 'author'
                },
                {
                    text: 'Quantidade',
                    value: 'quantity'
                },
                {
                    text: 'Data de lançamento',
                    value: 'release'
                },
                {
                    text: 'Data de alteração',
                    value: 'changeDate'
                },
                {
                    text: 'Editora',
                    value: 'publisher'
                },
                {
                    text: 'Ações',
                    value: 'actions',
                    sortable: false
                },
            ],
            editedIndex: -1,
            createdItem: {
                id: 0,
                name: "",
                author: "",
                code: "",
                release: "",
                changeData: "",
                quantity: 1,
                publisher: ""
            },
            editedItem: {
                id: 0,
                name: "",
                author: "",
                code: "",
                release: "",
                changeData: "",
                quantity: 1,
                publisher: ""
            },
            defaultItem: {
                id: 0,
                name: "",
                author: "",
                release: "",
                changeData: "",
                code: "",
                quantity: 1,
                publisher: 0
            },
            valid: false,
            titleRules: [
                v => !!v || 'Título é necessário.',
                v => v.length <= 255 || 'Quantidade máxima de cacteres excedida!',
            ],
            codeRules: [
                v => !!v || 'Código é necessário.',
                v => v.length <= 50 || 'Quantidade máxima de cacteres excedida!',
            ],
            authorRules: [
                v => !!v || 'Autor é necessário.',
                v => v.length <= 255 || 'Quantidade máxima de cacteres excedida!',
            ],
            publisherRules: [
                v => !!v || 'Editora é necessária.',
            ],
            quantityRules: [
                v => !!v || 'Quantidade é necessária.',
                v => v > 0 || 'Digite um valor válido!',
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
        this.listData();
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
                        Books.delete(selectedId).then(response => {
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
            this.editedIndex = this.books.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.edit = true
        },

        deleteItem(item) {
            this.editedIndex = this.books.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.books.splice(this.editedIndex, 1)
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
                Books.save(this.buildJson(this.createdItem), 'create').then(res => {
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
                Books.update(this.editedItem.id, this.buildJson(this.editedItem, 'edit')).then(response => {
                    this.listData()
                    this.responseMessageAPI(response.status, response.data.message)
                    if(response.status >= 200 && response.status < 300) {
                        this.closeEdit()
                    }
                }).catch(res => {
                    this.responseMessageAPI(res.response.data.code, res.response.data.message)
                })
            } else {
                this.$refs.form.validate()
            }
        },

        buildJson(itemToCreate, type) {
            if(type == 'create') {
                this.findPublisher()
            } else if(type == 'edit') {
                this.findPublisherEdit()
            }
            const jsonObject = {
                id: 0,
                name: itemToCreate.name,
                code: itemToCreate.code,
                quantity: +itemToCreate.quantity,
                publisherId: +this.publisherId,
                author: itemToCreate.author
            }
            return jsonObject;
        },

        findPublisher() {
            const publisherFound = this.publishers.find(e => e["value"] == this.createdItem.publisher);
            if (publisherFound != undefined) {
                this.publisherId = publisherFound["id"]
            }else {
                this.publisherId = 0
            }
        },

        findPublisherEdit() {
            const publisherFound = this.publishers.find(e => e["value"] == this.editedItem.publisher);

            if (publisherFound != undefined) {
                this.publisherId = publisherFound["id"]
            }else {
                this.publisherId = 0
            }
        },

        listData() {
            if (this.publishers.length > 0 || this.books.length > 0) {
                this.publishers = []
                this.books = []
            }

            Books.listAll().then(response => {
                response.data.content.map(e => {
                    e["publisher"] = e["publisher"]["name"]
                    e["changeDate"] = e["changeDate"].split("-").reverse().join("/")
                    e["release"] = e["release"].split("-").reverse().join("/")
                    this.books.push(e)
                })
            })

            Publishers.listAll().then(response => {
                response.data.content.map(e => {
                    this.publishers.push({
                        id: e["id"],
                        value: e["name"]
                    });
                    this.publisherName.push(e["name"])
                })
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
