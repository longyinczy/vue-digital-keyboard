import Vue from 'vue'
import vKeyboard from './components/DigitalKeyboard.vue'

Vue.component('v-digital-keyboard', vKeyboard)

Vue.config.devtools = true
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        amount: 0
    },
    methods: {
        setAmount(amount) {
            this.amount = amount;
        }
    }
})
