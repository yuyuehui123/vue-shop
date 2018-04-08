<template>
    <div class="product">
        <router-link :to="'/product/'+info.id" class="product-main">
            <img :src="info.image" alt="">
            <div>{{info.name}}</div>
            <div :style="{background:colors[info.color]}"></div>
            <div>¥ {{info.cost}}</div>
            <div class="product-cart" @click.prevent="addCart(info.id)">
                加入购物车
            </div>
        </router-link>
    </div>
</template>
<script>
    export default{
        props:{
            info:Object
        },
        data(){
            return {
                colors: {
                    '白色': '#ffffff',
                    '金色': '#dac272',
                    '蓝色': '#233472',
                    '红色': '#f2352e'
                }
            }
        },
        methods:{
            addCart(id){
                this.$store.commit('addCart',id);
            }
        },
        mounted(){
            console.log(this.info);
        }
    }
</script>
<style scoped>
    .product{
        width:25%;
        float: left;
    }
    .product-main{
        display: block;
        padding:16px;
        margin:16px;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 5px;
        background: #fff;
        color:#000;
        position:relative;
    }
    .product-main img{
        width:100%;
    }
    .product-main div{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .product-main div:nth-child(2){
        font-weight: bold;
    }
    .product-main:hover div:nth-child(2){
        color:#0070c9;
    }
    .product-main div:nth-child(3){
        width:20px;
        height:20px;
        border-radius: 50%;
        margin:10px auto;
        border: 1px solid #ddd;
    }
    .product-main div:nth-child(4){
        color:#de4037;
    }
    .product-cart{
        display: none;
        position: absolute;
        padding:4px 8px;
        background: #2d8cf0;
        border-radius: 3px;
        cursor: pointer;
        top:5px;
        right:5px;
        font-size: 12px;
        color:#fff;
    }
    .product-main:hover .product-cart{
        display: inline-block;
    }
</style>