<template>
    <div class="list">
        <div class="list-control">
            <div>
                品牌：
                <span v-for="(item,i) in brands" :key="i" @click="handleChangeBrand(item)" class="filter-button" :class="{'on':brand==item}">
                    {{item}}
                </span>
            </div>
            <div>
                颜色：
                <span v-for="(item,i) in colors" :key="i" @click="handleChangeColor(item)" class="filter-button" :class="{'on':color==item}">
                    {{item}}
                </span>
            </div>
            <div>
                排序：
                <span v-for="(item,i) in filter" :key="i" class="filter-button" :class="{'on':normal==item.id}" @click="handleChangeType(item.id)">
                    <span>{{item.name}}</span><span v-if="(item.name!='默认')&&(normal==item.id)&&(type=='on')">↑</span><span v-if="(item.name!='默认')&&(normal==item.id)&&(type=='off')">↓</span>
                </span>
            </div>
        </div>
        <div class="product-list">
            <Product v-for="product in productList" :info="product" :key="product.id"></Product>
        </div>
    </div>
</template>
<script>
    import Product from '../components/product.vue';
    export default {
        components:{
            Product
        },
        computed:{
            list(){
                return this.$store.state.productList;
            },
            brands(){
                return this.$store.getters.brands;
            },
            colors(){
                return this.$store.getters.colors;
            },
            productList(){
                var list=[...this.list];
                if(this.brand){
                    list=list.filter(
                        item=>
                            item.brand==this.brand
                    )
                }
                if(this.color){
                    list=list.filter(
                        item=>
                            item.color==this.color
                    )
                }
                if(this.normal){
                    if(this.normal=='order'){
                        if(this.type=='on'){
                            list=list.sort(
                                (a,b)=>
                                    a.sales-b.sales
                            )
                        }else{
                            list=list.sort(
                                (a,b)=>
                                    b.sales-a.sales
                            )
                        }
                    }else{
                        if(this.type=='on'){
                            list=list.sort(
                                (a,b)=>
                                    a.cost-b.cost
                            )
                        }else{
                            list=list.sort(
                                (a,b)=>
                                    b.cost-a.cost
                            )
                        }
                    }
                }
                return list;
            }
        },
        data(){
            return {
                filter:[
                    {name:'默认',id:''},
                    {name:'销量',id:'order'},
                    {name:'价格',id:'price'}
                ],
                brand:'',
                color:'',
                type:'',
                normal:''
            }
        },
        methods:{
            handleChangeBrand(txt){
                if(this.brand==txt){
                    this.brand='';
                }else{
                    this.brand=txt;
                }
            },
            handleChangeColor(txt){
                if(this.color==txt){
                    this.color='';
                }else{
                    this.color=txt;
                }
            },
            handleChangeType(txt){
                if(this.normal==txt){
                    if(this.type=='on'){
                        this.type='off';
                    }else{
                        this.type='on';
                    }
                }else{
                    this.normal=txt;
                    this.type='on';
                }
            }
        },
        mounted(){
            this.$store.dispatch('getProductList');
        }
    }
</script>
<style scoped>
    .list-control{
        margin:16px;
        padding:16px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 1px 1px 1px rgba(0,0,0,0.2);
    }
    .list-control>div{
        margin-top: 16px;
        font-size: 14px;
    }
    .list-control>div:first-child{
        margin-top:0;
    }
    .filter-button{
        display: inline-block;
        margin-right:8px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding:0 5px;
        cursor: pointer;
    }
    .filter-button.on{
        color:#fff;
        background: #ff5500;
        border-color:#ff5500
    }
</style>