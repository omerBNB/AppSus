import { Mailservice } from '../services/mail.service.js'

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
    <button @click="sendEmailToNotes" class="send-button2">Save As Keep</button>
    </section>
    `,
    data() {
        return {
            newEmail: { to: '', subject: '', body: '', mailIsDraft: true },
            draftOrNew:'',
            draftmail:''
        }
    },
    // created() {
    //         let key = setInterval(() => {
    //             if (!this.newEmail.mailIsDraft) {
    //                 clearInterval(key)
    //                 return
    //             }
    //             Mailservice.getDraftMail()
    //             .then(mail => {
    //                 if (mail.to || mail.subject || mail.body) {
    //                     mail.to = this.newEmail.to
    //                     this.newEmail.to = mail.to
    //                     mail.subject = this.newEmail.subject
    //                     this.newEmail.subject = mail.subject
    //                     mail.body = this.newEmail.body
    //                     this.newEmail.body = mail.body
    //                     this.$emit('savedraftmail', mail)
    //                 } else {
    //                     this.newEmail = { to: '', subject: '', body: '', mailIsDraft: true }
    //                     this.$emit('savedraftmail', mail)
    //                 }
    //             })
    //         }, 5000)
        // if (this.draftmail) {
        //     console.log('this.draftmail',this.draftmail)
        //     this.newEmail.to = this.draftmail.to
        //     this.newEmail.subject = this.draftmail.subject
        //     this.newEmail.body = this.draftmail.body
        // } else {
        //     this.newEmail = { to: '', subject: '', body: '', mailIsDraft: true }
        // }
        // let key = setInterval(() => {
        //     if (!this.newEmail.mailIsDraft) {
        //         clearInterval(key)
        //         return
        //     }
        //     this.$emit('savedraftmail', this.newEmail)
        // }, 5000)
    // },
    methods: {
        closeCompose() {
            this.$emit('closeTheCompose')
            this.newEmail.mailIsDraft = false
        },
        sendEmail() {
            this.$emit('sendEmail', this.newEmail)
            this.newEmail = { to: '', subject: '', body: '', mailIsDraft: false }
        },
        sendEmailToNotes(){
            this.$emit('sendtonotes',this.newEmail)
        }
    },
    // computed:{
    //     isDraft(){
    //         return this.draftOrNew = (this.newEmail.mailIsDraft)? '' : ': Draft'
    //     }
    // }
}