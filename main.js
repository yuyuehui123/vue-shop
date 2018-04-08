//导入css
import './index.css';
//导入Vue框架
import Vue from 'vue';
//导入vue-router
import VueRouter from 'vue-router'
//导入vuex
import Vuex from 'vuex';
//导入app.vue组件
import App from './app.vue';
//导入bus
import VueBus from './vue-bus';
//导入ajax
import Ajax from './ajax';
//导入product
import Products from './product';

import Modal from './components/dialog.vue';
import VueDialog from './vue-dialog'

VueRouter.prototype.goBack = function () {
    this.isBack = true;
    window.history.go(-1);
}
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueBus);
Vue.use(Ajax);
Vue.use(VueDialog);

const Routers = [
    {
        path:'/list',
        meta:{
            title:'首页'
        },
        component:(resolve)=>require(['./views/index.vue'],resolve)
    },
    {
        path:'/about',
        meta:{
            title:'关于'
        },
        component:(resolve)=>require(['./views/about.vue'],resolve)
    },
    {
        path:'/product/:id',
        meta:{
            title:'商品详情'
        },
        component:(resolve)=>require(['./views/product.vue'],resolve)
    },
    {
        path:'/cart',
        meta:{
            title:'购物车'
        },
        component:(resolve)=>require(['./views/cart.vue'],resolve)
    },
    {
        path:'*',
        redirect:'/list'
    }
]

const repeatArr=function(arr){
    var output=[];
    for(var i=0;i<arr.length;i++) {
        if (output.indexOf(arr[i]) == -1) {
            output.push(arr[i]);
        }
    }
    return output;
};

const RouterConfig ={
    //使用HTML5的History路由模式
    mode:'history',
    routes:Routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to,from,next)=>{
    window.document.title=to.meta.title;
    next();
});
router.afterEach((to,from,next)=>{
    console.log(11111);
    window.scrollTo(0, 0);
});

const moduleA={
    state:{
        text:'text',
        count:2
    },
    getters:{
        sumCount(state,getters,rootState){
            return state.count + rootState.count;
        }
    }
};

const store=new Vuex.Store({
    state:{
        cartList:[],
        productList:[]
    },
    mutations:{
        setProductList(state,data){
            state.productList=data;
        },
        addCart(state,id){
            const isAdded=state.cartList.find(
                item=>
                    item.id==id
            );
            if(isAdded){
                isAdded.count++;
            }else{
                state.cartList.push({
                    id:id,
                    count:1
                })
            }
        },
        deleteCart(state,id){
            const index=state.cartList.findIndex(
                item=>
                    item.id==id
            );
            state.cartList.splice(index,1);
        },
        emptyCart(state){
            state.cartList=[];
        },
        changeCart(state,obj){
            const index=state.cartList.findIndex(
                item=>
                    item.id==obj.id
            )
            state.cartList[index].count+=obj.num;
            if(state.cartList[index].count==0){
                state.cartList.splice(index,1);
            }
        }
    },
    getters:{
        brands:state=>{
            const brands = state.productList.map(
                item=>
                    item.brand
            );
            return repeatArr(brands);
        },
        colors:state=>{
            const colors = state.productList.map(
                item=>
                    item.color
            )
            return repeatArr(colors);
        },
    },
    actions:{
        getProductList(context){
            setTimeout(()=>
                context.commit('setProductList',Products)
            )
        },
        mountModal(){
            const modal=Vue.extend({
                template:'<div>hello</div>'
            });
            modal().$mount('.shopping');
        }
    }
});

//创建Vue根实例
new Vue({
    el:"#app",
    router:router,
    //使用vuex
    store:store,
    render:h => h(App)  //等于function(h){return h(App)}
})