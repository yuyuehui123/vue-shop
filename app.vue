<template>
    <div class="shopping">
        <header>
            <a @click="showModal" class="header-title">电商网站示例</a>
            <router-link to="/cart" class="header-menu-cart">
                购物车
                <span v-if="cartList.length">{{cartList.length}}</span>
            </router-link>
        </header>
        <div>
            <transition :name="transitionName">
                <router-view class="router-view"></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    //导入Vue框架
    import Vue from 'vue';
    import Modal from './components/dialog.vue';

    export default {
        computed:{
            cartList(){
                return this.$store.state.cartList
            }
        },
        data(){
            return {
                transitionName: 'slide-right',  // 默认动态路由变化为slide-right
                suc:'gogogo'
            }
        },
        methods:{
            /*showModal(){
                const modal=Vue.extend({
                    render:h=>
                        h(Modal)
                });
                var show=new modal().$mount();
                document.getElementById('div').appendChild(show.$el)
            }*/
            test(){
                this.suc='back';
                console.log(this.suc);
            },
            showModal(){
                this.$show.show({
                    fun:this.test,
                    title:'俞樾珲',
                    txt:'你是猪吗',
                    type:'confirm',
                    src:'../img/icon.png'
                });
            }
        },
        watch: {
            '$route' (to, from) {
                let isBack = this.$router.isBack;  //  监听路由变化时的状态为前进还是后退
                if(isBack) {
                    this.transitionName = 'slide-right'
                } else {
                    this.transitionName = 'slide-left'
                }
                this.$router.isBack = false
            }
        }
    }
</script>
<style scoped>
    .router-view {
        transition: all .2s ease;
    }

    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100% 0);
    }
</style>