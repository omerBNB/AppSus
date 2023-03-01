export default {
    template: `
    <section class="createEmail-Container">
        <div class="header">
            <span>
                New Message
            </span>
            <button @click="closeCompose">x</button>
        </div>
        <form @submit.prevent="sendEmail">
        <div class="inputs">
        <input type="email" placeholder="to" v-model="newEmail.to"/>
        <input type="text" placeholder="Subject" v-model="newEmail.subject"/>
    </div>
        <div class = "mainMail">
            <!-- <input type="text" v-model="newEmail.body"/> -->
            <textarea type="text" v-model="newEmail.body"></textarea>
        </div>
        <button class="send-button">Send</button>
        </form>
    </section>
    `,
    data(){
        return {
            newEmail:{to:'',subject: '',body:'' }
        }
    },
    methods:{
        closeCompose(){
            this.$emit('closeTheCompose')
        },
        sendEmail(){
            this.$emit('sendEmail',this.newEmail)
            this.newEmail = {to:'',subject: '',body:'' }
        }
    }
}