<template>
    <div class="toast-box" v-if="showToast">
        <div class="toast">
            <span :class="['toast-' + toastType]" v-html="toastIcon"></span>
            <p v-text="toastTxt"></p>
        </div>
    </div>
</template>

<style>
    .toast-box {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        text-align: center;
        background: rgba(0,0,0,.1);
        z-index: 9999;
    }
    .toast {
        position: absolute;
        display: inline-block;
        top: 43%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        min-width: 3.5rem;
        min-height: 3.5rem;
        border-radius: 0.2rem;
        background: rgba(0, 0, 0, .65);
    }
    .toast span {
        display: inline-block;
        padding: .5rem 0 .4rem 0;
        color: rgba(255, 255, 255, .9);
        font-family: 'wechat-plat';
        font-size: 1.2rem;
    }
    .toast p {
        text-align: center;
        padding: 0 .2rem .3rem;
        font-size: 0.45rem;
        color: rgba(255, 255, 255, .9);
    }
</style>

<script>
    export default{
        data() {
            return {
                iconObj: {
                    'error' : '&#xe79a;',
                    'correct' : '&#xe608;',
                },
            };
        },
        props: ['showToast', 'toastType', 'toastTxt'],
        computed: {
            toastIcon() {
                return this.iconObj[this.toastType];
            },
        },
    };
</script>
