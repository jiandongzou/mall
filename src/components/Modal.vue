<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':modalShow}">
        <div class="md-modal-inner">
          <div class="md-top">
          <!--  <div class="md-title">Login in</div>-->
            <button class="md-close" @click="closeModal()" >Close</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <slot name="message"></slot>

            </div>
            <div class="error-wrap" style="text-align:left;margin-top:6px">
              <slot name="tipmsg"></slot>
            </div>
            <div class="login-wrap">
                 <slot name="btngroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="modalShow" @click="closeModal" ></div>
    </div>
</template>

<script>
    export default{
        props: ['modalShow'],
        data(){
            return {
                msg: 'hello vue'
            }
        },
       methods:{
        closeModal(){
           this.$emit("close");

         }
       }
    }
</script>
