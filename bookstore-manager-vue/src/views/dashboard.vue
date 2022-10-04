<template>
<v-app id="inspire">
    <v-main class="grey lighten-3">
        <v-container>
            <v-row>
                <v-col>
                    <v-sheet min-height="70vh" rounded="lg">
                        <h1>Livros mais alugados</h1>
                        <div class="chart">
                            <Bar :chart-data="chartData" />
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<style>
.chart {
    position: relative;
    max-width: 500px;
    max-height: 300px;
}
</style>

<script>
import Rentals from "../services/rentals"
import {
    Bar
} from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: {
        Bar
    },
    data() {
        return {
            books: [],
            chartData: {
                labels: [],
                datasets: [{
                    backgroundColor: '#f87979',
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
                    rental["book"] = rental["book"]["id"]
                    this.books.push(rental["book"])
                    // Fazer um filtro de números repetidos
                })
            })
        }

    }
}
</script>
