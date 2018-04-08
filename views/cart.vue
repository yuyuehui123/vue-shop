<template>
    <div class="cart">
        <div class="cart-header">
            <div class="cart-title">
                购物清单
            </div>
            <div class="cart-header-main">
                <div class="cart-info">商品信息</div>
                <div class="cart-price">单价</div>
                <div class="cart-count">数量</div>
                <div class="cart-cost">小计</div>
                <div class="cart-delete">删除</div>
            </div>
        </div>
        <div v-if="cartList.length==0" class="empty-cart">
            购物车为空
        </div>
        <div v-if="cartList.length" class="cart-list">
            <div class="cart-product" v-for="(item,index) in cartList" :key="item.id">
                <div class="prodict-info">
                    <img :src="productDickList[item.id].image" width="40px" height="40px" alt="">
                    {{productDickList[item.id].name}}
                </div>
                <div class="product-price">
                    {{'¥ '+productDickList[item.id].cost}}
                </div>
                <div class="product-count">
                    <span class="cart-count-change" @click="countChange(item.id,-1)">-</span>
                    {{item.count}}
                    <span class="cart-count-change" @click="countChange(item.id,1)">+</span>
                </div>
                <div class="product-cost">
                    {{'¥ '+productDickList[item.id].cost*item.count}}
                </div>
                <div class="product-delete">
                    <a @click.prevent="handleDelete(item.id)">
                        删除
                    </a>
                </div>
            </div>
            <div class="cart-counter">
                <div class="cart-count-all">
                    共计
                    <span>
                        {{countAll}}
                    </span>
                    件商品
                </div>
                <div class="cart-cost-all">
                    应付总额
                    <span>
                        {{'¥ '+costAll}}
                    </span>
                </div>
                <div class="cart-cost-button" @click="emptyCart">
                    现在结算
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Products from '../product.js';
    export  default {
        computed:{
            cartList(){
                return this.$store.state.cartList;
            },
            productDickList(){
                var dict={};
                this.productList.forEach(
                    item=> {
                        dict[item.id] = item
                    }
                );
                return dict;
            },
            countAll(){
                let num=0;
                this.cartList.forEach(
                    item=> {
                        num += item.count
                    }
                );
                return num
            },
            costAll(){
                let cost=0;
                this.cartList.forEach(
                    item=>{
                        cost+=this.productDickList[item.id].cost * item.count
                    }
                );
                return cost
            }
        },
        data(){
            return {
                productList:Products
            }
        },
        methods:{
            handleDelete(id){
                this.$store.commit('deleteCart',id);
            },
            emptyCart(){
                this.$store.commit('emptyCart');
            },
            countChange(id,num){
                this.$store.commit('changeCart',{
                    id:id,
                    num:num
                });
            }
        }
    }
</script>
<style scoped>
    .cart{
        border: 1px solid #ddd;
        border-radius: 8px;
        margin:32px;
    }
    .cart-title{
        padding:16px 32px;
        border-bottom: 1px solid #ddd;
        font-size: 16px;
        font-weight: bold;
    }
    .cart-header-main{
        border-bottom: 1px solid #ddd;
    }
    .cart-header-main{
        padding:8px 32px;
        background: #eee;
        font-size: 14px;
    }
    .cart-product{
        background: #fff;
        padding:0 32px;
        height:60px;
        border-bottom: 1px dashed #eee;
        line-height: 60px;
    }
    .cart-product img{
        vertical-align: top;
        position: relative;
        top:10px;
    }
    .cart-header-main:after,.cart-product:after{
        content: '';
        display: table;
        clear: both;
    }
    .cart-info,.prodict-info{
        width:60%;
        float: left;
    }
    .cart-price,.cart-count,.cart-cost,.cart-delete,
    .product-price,.product-count,.product-cost,.product-delete{
        width:10%;
        float: left;
        text-align: center;
    }
    .product-delete{
        color:#2d8cf0;
        cursor: pointer;
    }
    .empty-cart{
        padding:32px;
        text-align: center;
        font-size: 16px;
    }
    .cart-list{
        padding-bottom:16px;
    }
    .cart-counter {
        padding: 32px;
        text-align: right;
    }
    .cart-count-all,.cart-cost-all{
        display: inline-block;
        padding:0 16px;
    }
    .cart-counter span{
        font-size: 20px;
        font-weight: bold;
        color:#f2352e;
    }
    .cart-cost-button{
        display: inline-block;
        padding:8px 32px;
        border-radius: 4px;
        color: #fff;
        background: #2d8cf0;
        margin:0 16px;
    }
    .cart-count-change{
        display: inline-block;
        width:24px;
        height:24px;
        border-radius: 50%;
        line-height: 22px;
        margin: 0 4px;
        background: #f7f8f9;
        box-shadow: 0 1px 1px rgba(0,0,0,0.2);
        cursor: pointer;
    }
</style>