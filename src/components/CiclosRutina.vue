<template>
    <div class="box">
        <h1>Rutina {{this.$route.params.id}}</h1>
        
        <div class="btns">
            <v-card v-for="cycle in cycles" :key="cycle.id" color="#6797C5">
                <v-card-title>{{cycle.name}}</v-card-title>
                <v-card-actions>
                    <router-link :to="{path: `/rutina/${$route.params.id}/ciclo/${cycle.id}`, params: {cycleId: cycle.id}}">
                        <v-btn color="green">
                            <v-icon >
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                    </router-link> 
                    <v-btn color="red" @click="deleteCycle(cycle.id)">
                        <v-icon>
                        mdi-delete
                        </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
            <!-- <textarea cols="100" rows="10" v-model="result"></textarea> -->
        </div>

        <div class="btns">
            <v-btn @click="createCycle()">+</v-btn>
            <v-text-field label="name" v-model="name" outlined></v-text-field>
            <v-text-field label="detail" v-model="detail" outlined></v-text-field>
            <v-text-field label="type" hint="warmup, exercise, cooldown" v-model="type" outlined></v-text-field>
            <v-text-field label="repetitions" hint="Number" v-model="repetitions" outlined></v-text-field>
            <!-- <v-text-field label="counter" v-model="counter" outlined></v-text-field> -->
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
import { useCycleStore } from '@/store/CycleStore';
import { mapActions } from 'pinia';
import {Cycle} from "@/api/routine"
// import EjerciciosCiclo from "@/components/EjerciciosCiclo.vue"

export default {
    name: "CiclosRutina",
    components: {
        // EjerciciosCiclo,
    },
    data() {
        return {
            controller: null,
            result: null,
            cycles: [],
            counter: 0,
            name: null,
            detail: null,
            type: null,
            repetitions: 1,
        }
    },
    // props: {
    //     routineId: {
    //         type: Number,
    //         required: true,
    //     },
    // },
    methods: {
        ...mapActions(useCycleStore, {
        $createCycle: 'createCycle',
        $modifyCycle: 'modifyCycle',
        $deleteCycle: 'deleteCycle',
        $getCycle: 'getCycle',
        $getAllCycles: 'getAllCycles',
        }),
        setResult(e) {
            this.result = JSON.stringify(e);
        },
        // selected(id) {
        //     this.cycle = id;
        // },
        async deleteCycle(id) {
            await this.$deleteCycle(this.$route.params.id, id);
            this.getAllCycles();
        },
        async createCycle () {
            try {
                const cycle = new Cycle(null, this.name, this.detail, this.type, this.counter+1, new Number(this.repetitions));
                await this.$createCycle(new Number(this.$route.params.id), cycle)
                this.counter++
                this.getAllCycles()
            } catch (e) {
                this.setResult(e);
            }
        },
        async getCycle() {
            try {
                const ok = await this.$getCycle(2,1);
                this.setResult(ok);
            } catch (e) {
                this.setResult(e);
            }
        },
        async getAllCycles() {
            try {
                this.controller = new AbortController();
                const cycles = await this.$getAllCycles(this.$route.params.id, this.controller);
                this.controller = null;
                this.cycles = cycles;
                cycles.forEach(element => {
                    if(element.order > this.counter)
                        this.counter = element.order                    
                }); 
                this.setResult(cycles)
            } catch(e) {
                this.setResult(e + 'No Cycles Availavable')
            }
        },
    },
    async created() {
        this.getAllCycles();
    },
}
</script>

<style>
.box{
    margin: 1% 5%; 
}
.box h1 {
    text-align: center;
}
.btns {
    display: flex;
    flex-wrap: wrap;
}
</style>