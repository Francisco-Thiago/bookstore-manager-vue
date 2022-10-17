<template>
<v-app id="inspire" class="main-viewer">
    <v-main>
        <h1 class="page-name">Dashboard</h1>
        <div class="info-group">
            <div class="card-info-group">
                <div class="card-info">
                    <IosBook class="ion-icon" />
                    <div>
                        <h2>Livros</h2>
                        <span> {{ bookQuantity }} </span>
                    </div>
                </div>
                <div class="card-info">
                    <IosHome class="ion-icon" />
                    <div>
                        <h2 class="card-title">Editoras</h2>
                        <span> {{ publisherQuantity }} </span>
                    </div>
                </div>
                <div class="card-info">
                    <IosPricetag class="ion-icon" />
                    <div>
                        <h2 class="card-title">Aluguéis</h2>
                        <span> {{ rentalQuantity }} </span>
                    </div>
                </div>
                <div class="card-info">
                    <IosPerson class="ion-icon" />
                    <div>
                        <h2 class="card-title">Usuários</h2>
                        <span> {{ userQuantity }} </span>
                    </div>
                </div>
            </div>
            <div class="chart-group">
                <div class="chart-long-reduce">
                    <h2 class="card-title">Livros mais vistos</h2>
                    <Bar v-if="this.visibleData" :chart-data="chartData" />
                </div>
                <div class="chart-reduce">
                    <h2 class="card-title">Editoras com mais aluguéis</h2>
                    <Doughnut v-if="this.visibleDataDoghnut" :chart-data="doughnutData" />
                </div>
            </div>
        </div>
    </v-main>
</v-app>
</template>

<style>

.page-name {
    display: block;
    color: #fff;
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 2rem;
    border-bottom: .4rem solid rgb(231, 85, 109);
}

.card-info-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 2.5rem 0 2rem;
    gap: 1rem;
}

.info-group {
    display: flex;
    padding: 3rem 5% 5%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.card-info {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    bottom: 0;
    width: 200px;
    height: 100px;
    color: #fff;
    gap: .7rem;
    padding: .5rem 1rem;
    border: .2rem solid #fff;
    border-radius: 10px;
    transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-info:hover {
    bottom: 10px;
    cursor: pointer;
    color: rgb(231, 85, 109);
    border-color: rgb(231, 85, 109);
}

.card-title {
    color: #fff;
}

.card-info:hover .ion-icon {
    fill: rgb(231, 85, 109);
}

.card-info .ion-icon {
    fill: #fff;
    font-size: 2rem;
    margin-right: 10px;
}

.card-info h1 {
    font-size: 1.5rem;
}

.card-info span {
    font-size: 1.25rem;
}

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
    max-width: 250px;
    text-align: center;
}

.chart-long-reduce {
    text-align: center;
    max-width: 350px;
}

.chart-group {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 0;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: #2e2c2cdb;
    padding: 1rem;
    border-radius: 1rem;
}

.main-viewer {
    color: #fff;
    margin-left: 250px;
}

@media (max-width: 750px) {
    .main-viewer {
        margin-top: 50px;
        margin-left: 0;
    }

    .card-info {
        width: 120px;
        height: 100px;
        flex-direction: column;
    }

    .card-info .ion-icon {
        fill: #fff;
        font-size: 1.5rem;
        margin-right: 10px;
    }

    .card-info h2 {
        font-size: .8rem;
    }

    .card-info span {
        font-size: 1rem;
    }

}
</style>

<script>
import Rentals from "../services/rentals"
import Publishers from "../services/publishers"
import Books from "../services/books"
import Users from "../services/users"

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
import {
    jwtToken
} from "@/stores/jwtToken"
import IosPerson from "vue-ionicons/dist/ios-person.vue"
import IosPricetag from "vue-ionicons/dist/ios-pricetag.vue"
import IosHome from "vue-ionicons/dist/ios-home.vue"
import IosBook from "vue-ionicons/dist/ios-book.vue"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
    components: {
        Bar,
        Doughnut,
        IosPerson,
        IosPricetag,
        IosHome,
        IosBook
    },

    data() {
        return {
            token: jwtToken(),
            bookQuantity: 0,
            rentalQuantity: 0,
            userQuantity: 0,
            publisherQuantity: 0,
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
            Rentals.listAll(this.token.jwtToken).then(response => {
                this.rentalQuantity = response.data.content.length
                this.counter()
                response.data.content.map(rental => {
                    this.publishers.push(rental["book"]["publisher"]["id"])
                    rental["book"] = rental["book"]["id"]
                    this.books.push(rental["book"])
                })
                this.fiveBooks(this.books)
                this.fivePublishers(this.publishers)
            }).catch(() => {
                window.location.pathname = '/'
            })
        },

        counter() {
            Books.listAll(this.token.jwtToken).then(response => {
                this.bookQuantity = response.data.content.length
            })
            Publishers.listAll(this.token.jwtToken).then(response => {
                this.publisherQuantity = response.data.content.length
            })
            Users.listAll(this.token.jwtToken).then(response => {
                this.userQuantity = response.data.content.length - 1
            })
        },

        fiveBooks(bookIds) {
            let repeat = 1,
                repeats = []

            bookIds = bookIds.sort((a, b) => b - a)
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
                Books.findById(id, this.token.jwtToken).then(books => {
                    this.chartData.labels.push(books.data.name)
                }).finally(() => {
                    this.visibleData = true
                })
            })
        },

        fivePublishers(publisherIds) {
            let repeat = 1,
                repeats = []

            publisherIds = publisherIds.sort((a, b) => b - a)
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
                Publishers.findById(id, this.token.jwtToken).then(publisher => {
                    this.doughnutData.labels.push(publisher.data.name)
                }).finally(() => {
                    this.visibleDataDoghnut = true
                })
            })
        }

    }
}
</script>
