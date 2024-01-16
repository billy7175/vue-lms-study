<template>
    <div class="engagement-card">
        <aside class="aside">
            <strong>
                Engagement
            </strong>
            <p>
                General statistic of user <span>engagement</span> processes.
            </p>
        </aside>
        <div class="body">
            <ul class="ul">
                <li class="li">
                    <span class="icon-wrapper"><i class="pi pi-database"></i></span>
                    <span>This Day</span>
                    <strong>133 <i class="pi pi-arrow-up"></i></strong>
                </li>
                <li class="li">
                    <span class="icon-wrapper"><i class="pi pi-apple"></i></span>
                    <span>This Week</span>
                    <strong>23 <i class="pi pi-arrow-up"></i></strong>
                </li>
                <li class="li">
                    <span class="icon-wrapper"><i class="pi pi-box"></i></span>
                    <span>This Month</span>
                    <strong>17 <i class="pi pi-arrow-up"></i></strong>
                </li>
                <li class="li">
                    <span class="icon-wrapper"><i class="pi pi-microsoft"></i></span>
                    <span>This Pending</span>
                    <strong>65 <i class="pi pi-arrow-up"></i></strong>
                </li>
                <li class="li">
                    <span class="icon-wrapper"><i class="pi pi-moon"></i></span>
                    <span>This Pending</span>
                    <strong>65 <i class="pi pi-arrow-up"></i></strong>
                </li>
            </ul>
        </div>
    </div>
</template>

<script></script>

<style scoped>
.engagement-card {
    background: #DABEA9;
    display:flex;
    gap:50px;
    padding: 40px;
    border-radius: 20px;
}

.aside {
    width:20%;
    display:flex;
    flex-direction: column;
    padding:20px 0px;
    gap:40px;
}

.aside p {
    color:#0C1220;
}
.aside strong {
    font-size:22px;
    font-weight: 700;
}

.aside span {
    color:#0A0F1E;
    font-weight: 600;
}

.aside p {
    margin:0px;
}



.body {
    width:80%;
}

.ul {
    display: flex;
    gap:40px;
}
.li {
    flex:0 0 150px;
    height:150px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background:#FAF5F2;
    border-radius: 20px;
    position:relative;
    padding-left:20px;
    gap:10px;
}

.li span {
    font-size:16px;
    font-weight: 700;
}
.li strong {
    font-size:30px;
}

.li .icon-wrapper {
    position: absolute;
    top:0px;
    left:20px;
    transform: translateY(-50%);
    width:50px;
    height:50px;
    background:#FE4D26;
    border-radius: 10px;
    display:flex;
    justify-content: center;
    align-items:center;
}

.icon-wrapper .pi {
    color:#fff;
    font-size:20px;
    font-weight: 700;
}

</style>