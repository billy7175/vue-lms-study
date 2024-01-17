<template>
    <div class="grapth-card">
        <div>
            <chart-card></chart-card>
            <chart-card></chart-card>
            <chart-card></chart-card>
        </div>
    </div>
</template>

<script>
import ChartCard from '../cards/ChartCard.vue'
export default {
    components: {
        ChartCard
    },
    setup(){
        return {

        }
    }
}
</script>



<style scoped>
.grapth-card {
    
    width: 75%;
    border-radius: 20px;
    background :var(--background--color--blue);
    padding:40px;
}
</style>

