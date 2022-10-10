<template>
<v-app id="inspire" class="main-viewer">
    <v-main class="grey lighten-3">
        <v-container>
            <v-row>
                <v-col>
                    <v-sheet class="chart-viewer" min-height="70vh" rounded="lg">
                        <div class="chart-group">
                            <div class="chart">
                                <h2>Livros mais vistos</h2>
                                <Bar v-if="this.visibleData" :chart-data="chartData" />
                            </div>
                            <div class="chart-reduce">
                                <h2>Editoras com mais aluguéis</h2>
                                <Doughnut v-if="this.visibleDataDoghnut" :chart-data="doughnutData" />
                            </div>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<style>
.chart-viewer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.chart {
    position: relative;
    width: 400px;
    height: 200px;
}

.chart-reduce {
    width: 250px;
}

.chart-group {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.main-viewer {
    margin-left: 250px;
}
</style>

<script>
import Rentals from "../services/rentals"
import Publishers from "../services/publishers"
import Books from "../services/books"

import {
    Bar,
    Doughnut
} from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { jwtToken } from "@/stores/jwtToken"



ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
    components: {
        Bar,
        Doughnut
    },

    data() {
        return {
            jwtToken: jwtToken(),
            visibleData: false,
            visibleDataDoghnut: false,
            bookRepeat: [],
            publisherRepeat: [],
            mainBooksId: [],
            mainPublishersId: [],
            books: [],
            publishers: [],
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Dados',
                    backgroundColor: ['#CA054D', '#3B1C32', '#A4D4B4', '#FFCF9C', '#B96D40'],
                    data: []
                }]
            },
            doughnutData: {
                labels: [],
                datasets: [{
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#3B1C32'],
                    data: []
                }]
            }
        }
    },

    mounted() {
        this.listData()
    },

    methods: {
        listData() {
            Rentals.listAll().then(response => {
                response.data.content.map(rental => {
                    this.publishers.push(rental["book"]["publisher"]["id"])
                    rental["book"] = rental["book"]["id"]
                    this.books.push(rental["book"])
                })
                this.fiveBooks(this.books)
                this.fivePublishers(this.publishers)
            })
        },

        fiveBooks(bookIds) {
            let repeat = 1,
                repeats = []

            for (let i = 0; i < this.books.length; i++) {
                if (bookIds[i] == bookIds[i + 1]) {
                    repeat += 1
                } else {
                    this.bookRepeat.push({
                        id: bookIds[i],
                        repeat: repeat,
                    })
                    repeat = 1
                }
            }

            this.bookRepeat.map(object => {
                repeats.push(object["repeat"])
            })

            repeats = repeats.sort((a, b) => b - a)

            if (repeats.length >= 5) {
                let fiveBooks = this.bookRepeat.filter(books => {
                    return books.repeat >= repeats[4]
                })
                fiveBooks.length = 5
                fiveBooks = fiveBooks.sort((a, b) => {
                    return a.repeat - b.repeat
                }).reverse()
                fiveBooks.map((book) => {
                    this.mainBooksId.push(book.id)
                    this.chartData.datasets[0].data.push(book["repeat"])
                })
            } else {
                this.bookRepeat = this.bookRepeat.sort((a, b) => {
                    return a.repeat - b.repeat
                }).reverse()
                this.bookRepeat.map((book) => {
                    this.mainBooksId.push(book.id)
                    this.chartData.datasets[0].data.push(book["repeat"])
                })
            }
            this.mainBooksId.map(id => {
                Books.findById(id).then(books => {
                    this.chartData.labels.push(books.data.name)
                }).finally(() => {
                    this.visibleData = true
                })
            })
        },

        fivePublishers(publisherIds) {
            let repeat = 1,
                repeats = []

            for (let i = 0; i < this.publishers.length; i++) {
                if (this.publishers[i] == this.publishers[i + 1]) {
                    repeat += 1
                } else {
                    this.publisherRepeat.push({
                        id: publisherIds[i],
                        repeat: repeat,
                    })
                    repeat = 1
                }
            }

            this.publisherRepeat.map(object => {
                repeats.push(object["repeat"])
            })

            repeats = repeats.sort((a, b) => b - a)

            if (repeats.length >= 5) {
                let fivePublishers = this.publisherRepeat.filter(publisher => {
                    return publisher.repeat >= repeats[4]
                })
                fivePublishers.length = 5
                fivePublishers = fivePublishers.sort((a, b) => {
                    return a.repeat - b.repeat
                }).reverse()
                fivePublishers.map((publisher) => {
                    this.mainPublishersId.push(publisher.id)
                    this.doughnutData.datasets[0].data.push(publisher["repeat"])
                })
            } else {
                this.publisherRepeat = this.publisherRepeat.sort((a, b) => {
                    return a.repeat - b.repeat
                }).reverse()
                this.publisherRepeat.map((publisher) => {
                    this.mainPublishersId.push(publisher.id)
                    this.doughnutData.datasets[0].data.push(publisher["repeat"])
                })
            }
            this.mainPublishersId.map(id => {
                Publishers.findById(id).then(publisher => {
                    this.doughnutData.labels.push(publisher.data.name)
                }).finally(() => {
                    this.visibleDataDoghnut = true
                })
            })
        }

    }
}
</script>
