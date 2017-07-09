<template>
  <div class="v-digital-keyboard" >
  <table ref="v-digital-keyboard">
    <tr><td class="numKey" @touchend="changeAmount(1)">1</td><td class="numKey" @touchend="changeAmount(2)">2</td><td class="numKey" @touchend="changeAmount(3)">3</td></tr>
    <tr><td class="numKey" @touchend="changeAmount(4)">4</td><td class="numKey" @touchend="changeAmount(5)">5</td><td class="numKey" @touchend="changeAmount(6)">6</td></tr>
    <tr><td class="numKey" @touchend="changeAmount(7)">7</td><td class="numKey" @touchend="changeAmount(8)">8</td><td class="numKey" @touchend="changeAmount(9)">9</td></tr>
    <tr><td class="dotKey" @touchend="addDot($event)">.</td><td class="numKey" @touchend="changeAmount(0)">0</td><td class="backKey" @touchend="back($event)"><span>&#10132</span></td></tr>
  </table>
  <div class="info" v-if="isError"><span>请输入正确的金额</span></div>
  </div>
</template>

<style scoped>
  .v-digital-keyboard{
    width:100%;
    height: calc(100% / 2 );
    bottom:0;
    left: 0;
    position: fixed;
  }
  .info{
    z-index: 1;
    position: absolute;
    top: 40%;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
  .info span{
    padding: 10px 20px;
    background: #ccc;
    color:#000;
    font-size: 14px;
    border-radius: 8px;
  }
  .v-digital-keyboard table{
    z-index: 0;
    width: 100%;
    height: 100%;
    background: #BFBFBF;
    font-family: "Arial", sans-serif;
    font-size: 1rem;
    text-align: center;
    border:0;
    margin:0;
    border-collapse:separate;
    border-spacing:1px;
    position:absolute;
    bottom:0;
    left: 0;
  }
  .v-digital-keyboard table tr td{
    height: 25%;
    width: 33.33%;
  }
  .numKey{
    background: #F5F5F5;
  }
  .dotKey,.backKey{
    background: #E0E0E0;
  }
  .dotKey:active,.backKey:active,.numKey:active{
    background:#ccc;
  }
  .backKey span{
    display: block;
    transform:rotate(180deg);
  }
</style>

<script>
  const Dot = ".";
  export default{
    data(){
      return {
        amount : '0',
        isError: false
      }
    },
    mounted() {
      document.body.addEventListener('touchstart', function () { /*ios active无效的解决办法*/});
      document.body.addEventListener('touchmove', function (event) { 
        //ios 阻止浏览器弹性滑动
          event.preventDefault();
      }, false);
      document.oncontextmenu = new Function('event.returnValue=false;');
      document.onselectstart = new Function('event.returnValue=false;');
      //console.log(this.$refs.v-keyboard.querySelector);

    },
    methods:{
      changeAmount(num){
        var dotIndex = this.amount.indexOf(Dot);
        var dec = '';
        if(dotIndex > 0 ){
          dec = this.amount.substring(dotIndex)
        }
        if( this.amount.length>9 || dec.length > 2){
          this.showError();
          return;
        }
        if(this.amount === '0'){
          this.amount = '';
        }
        this.amount += num.toString();
        this.$emit("setamount",this.amount);
      },
      addDot(){
        var dotIndex = this.amount.lastIndexOf(Dot);
        if(dotIndex >0){
          return;
        }
        this.amount += Dot;
        this.$emit("setamount",this.amount.toString());
      },
      back(){
        this.amount = this.amount.slice(0,-1);
        this.$emit("setamount",this.amount.toString());
      },
      resetAmount(){
        this.amount = "0";
      },
      showError(){
        this.isError= true;
        var _this = this;
        setTimeout(function() {
          _this.isError= false;
        }, 2000);
      }
    }
  }
</script>