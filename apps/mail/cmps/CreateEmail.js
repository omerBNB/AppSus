import { Mailservice } from '../services/mail.service.js'

export default {
    template: `
    <section class="createEmail-Container">
        <div class="header">
            <span>
                New Message {{isDraft}}
            </span>
            <button @click="closeCompose">x</button>
        </div>
        <form @submit.prevent="sendEmail">
        <div class="inputs">
        <input type="email" placeholder="to" v-model="newEmail.to"/>
        <input type="text" placeholder="Subject" v-model="newEmail.subject" />
    </div>
        <div class = "mainMail">
            <!-- <input type="text" v-model="newEmail.body"/> -->
            <textarea type="text" v-model="newEmail.body" ></textarea>
        </div>
        <button class="send-button">Send</button>
    </form>
    <button @click="sendEmailToNotes" class="send-button2">Save As Keep</button>
    </section>
    `,
    data() {
        return {
            newEmail: { to: '', subject: '', body: '', mailIsDraft: true },
            draftOrNew: '',
            draftmail: ''
        }
    },
    created() {
        Mailservice.getDraftMail()
            .then(mail => this.draftmail = mail)
            .then(mail => {
                if(mail[0].to)
                    this.newEmail.to = mail[0].to
                    console.log('this.newEmail.to',this.newEmail.to)
                    this.newEmail.subject = mail[0].subject
                    this.newEmail.body = mail[0].body
            })
        let key = setInterval(() => {
            if (!this.newEmail.mailIsDraft) {
                clearInterval(key)
                return
            }
            Mailservice.getDraftMail()
                .then(mail => this.draftmail = mail)
            if (this.draftmail.to && this.draftmail.subject && this.draftmail.body) {
                this.newEmail.to = this.draftmail.to
                this.newEmail.subject = this.draftmail.subject
                this.newEmail.body = this.draftmail.body
                this.$emit('savedraftmail', this.newEmail)
            } else {
                this.$emit('savedraftmail', this.newEmail)
            }
        }, 5000)
    },
    methods: {
        closeCompose() {
            this.$emit('closeTheCompose')
            this.newEmail.mailIsDraft = false
        },
        sendEmail() {
            this.$emit('sendEmail', this.newEmail)
            this.newEmail = { to: '', subject: '', body: '', mailIsDraft: false }
        },
        sendEmailToNotes() {
            this.$emit('sendtonotes', this.newEmail)
        }
    },
    computed: {
        isDraft() {
            return this.draftOrNew = (this.newEmail.mailIsDraft) ? ': Draft' : ''
        },
        newEmailtxt(){
            return newEmail.to
        },
        newEmailSubject(){
            return newEmail.subject
        },
        newEmailBody(){
            return newEmail.body
        }
    }
}