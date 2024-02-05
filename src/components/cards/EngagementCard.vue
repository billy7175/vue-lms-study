<template>
    <div class="engagement-card">
        <aside class="aside">
            <strong>
                Figures
            </strong>
            <p>
                General statistic of <span>Figures</span>.
            </p>
        </aside>
        <div class="body">
            <ul class="ul">
                <li class="li" v-for="x in data" :key="x.label">
                    <span class="icon-wrapper"><i class="pi pi-database"></i></span>
                    <span>{{ x.label }} </span>
                    <strong> {{ x.count }} <i class="pi pi-arrow-up"></i></strong>
                </li>
                <li class="li">
                    <span class="icon-wrapper"><i class="pi pi-moon"></i></span>
                    <span>_--_--_--_--</span>
                    <strong> - ? - <i class="pi pi-arrow-up"></i></strong>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => { }
        }
    },
    setup() {

    }
}
</script>

<style lang="scss" scoped>
@import '../../../src/assets/styles/mixins.scss';

.engagement-card {
    background: #fce3cf;
    display: flex;
    gap: 50px;
    padding: 40px;
    border-radius: 20px;
    @include glassmorphism(1px);
}

.aside {
    width: 20%;
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
    gap: 40px;
}

.aside p {
    color: #0C1220;
}

.aside strong {
    font-size: 22px;
    font-weight: 700;
}

.aside span {
    color: #0A0F1E;
    font-weight: 600;
}

.aside p {
    margin: 0px;
}



.body {
    width: 80%;
}

.ul {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
}

.li {
    flex: 0 0 160px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: #FAF5F2;
    border-radius: 20px;
    position: relative;
    padding-left: 20px;
    gap: 10px;
    @include glassmorphism(1px);
}

.li span {
    font-size: 16px;
    font-weight: 700;
}

.li strong {
    font-size: 30px;
}

.li .icon-wrapper {
    position: absolute;
    top: 0px;
    left: 20px;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: #FE4D26;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-wrapper .pi {
    color: #fff;
    font-size: 20px;
    font-weight: 700;
}
</style>