<template>
<v-app id="inspire">
    <v-main class="grey lighten-3" style="align-items: center;">
        <v-container>
            <v-row>
                <v-col>
                    <v-sheet max-height="70vh" rounded="lg">
                        <v-data-table :headers="headers" :items="publishers" :search="search" height="50vh" item-height="20" sort-by="id" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>Editoras</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" max-width="500px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                                Nova editora
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">{{ formTitle }}</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="editedItem.name" label="Título"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="editedItem.publisher" label="Editoras"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="editedItem.quantity" label="Quantidade"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="close">
                                                    Cancel
                                                </v-btn>
                                                <v-btn color="blue darken-1" text @click="save">
                                                    Save
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
                                <v-icon small @click="deleteAlert()">
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
import Publishers from "../services/publishers"
import Swal from 'sweetalert2'

export default {

    data() {
        return {
            publishers: [],
            search: '',
            dialog: false,
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
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                }
            ],
            editedIndex: -1,
            editedItem: {
                id: 0,
                name: "",
                code: "",
                quantity: 0,
                publisher: ""
            },
            defaultItem: {
                id: null,
                name: null,
                code: null,
                quantity: null,
                publisher: null
            }

        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Criar Item' : 'Editar Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    mounted() {
        Publishers.listAll().then(response => {
            response.data.content.map(e => {
                this.publishers.push(e)
            })
        })
    },
    methods: {

        deleteAlert() {
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
                    this.publishers.splice(this.editedIndex, 1)
                    Swal.fire(
                        'Deletado!',
                        'O registro foi deletado com sucesso!',
                        'success'
                    )
                }
            })
        },

        editItem(item) {
            this.editedIndex = this.publishers.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
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

        close() {
            this.dialog = false
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

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
    }
}
</script>
