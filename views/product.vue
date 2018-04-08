<template>
    <div v-if="product" class="product">
        <div class="product-detail">
            <div class="detail-img">
                <img width="100%"  :src="product.image" alt="">
            </div>
            <div class="detail-intro">
                <h1>{{product.name}}</h1>
                <p>¥{{product.cost}}</p>
                <div>
                    <button @click="addCart">加入购物车</button>
                </div>
            </div>
        </div>
        <div class="product-intro">
            <h2>产品介绍</h2>
            <img v-for="n in 10" :key="n" :src="'http://ordfm6aah.bkt.clouddn.com/shop/'+n+'.jpeg'" alt="">
        </div>
    </div>
</template>
<script>
    import Products from '../product';
    export default {
        data(){
            return {
                id:parseInt(this.$route.params.id),
                product:null
            }
        },
        methods:{
            getProduct() {
                setTimeout(
                    ()=>
                        this.product=Products.find(
                            (item)=>
                                item.id==this.id
                        ),100
                )
            },
            addCart(){
                this.$store.commit('addCart',this.product.id);
            }
        },
        mounted(){
            this.getProduct();
        }
    }
</script>
<style scoped>
    .product-intro,.product-detail{
        padding:32px;
        margin:32px;
        text-align: center;
        border-radius: 10px;
        border: 1px solid #ddd;
        background: #fff;
        position: relative;
    }
    .product-intro img{
        display: block;
        margin: 32px auto;
        padding:32px;
        width:50%;
    }
    .detail-img{
        width:50%;
        text-align: center;
        float: left;
    }
    .detail-intro{
        width:50%;
        text-align: center;
        float: left;
        position: absolute;
        left:50%;
        top:30%;
    }
    .detail-intro p{
        margin:10px 0;
        color:#f2352e;
    }
    .detail-intro button{
        padding:8px 64px;
        background: #2d8cf0;
        color:#fff;
        cursor: pointer;
        border-radius: 5px;
        outline: none;
        border: none;
        position: relative;
    }
    .detail-intro button:active{
        top:1px;
        left:1px;
    }
    .product-detail:after{
        content: '';
        display: table;
        clear: both;
    }
</style>