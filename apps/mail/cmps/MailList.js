import MailPreview from './MailPreview.js'
import {Mailservice} from '../services/mail.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'


export default {
    props: ['mails'],
    template: `
            <section class="mail-list">
                <ul >
                    <li v-for="mail in mails" :key="mail.id" class="unread">
                        <MailPreview 
                        :mail="mail"
                        @showdetails="showDetails"
                        />
                        <button @click="deleteMail(mail.id)">X</button>
                    </li>
                        <!-- <RouterLink :to="'/mail/'+mail.id">Details</RouterLink> |
                        <RouterLink :to="'/mail/edit/'+mail.id">Edit</RouterLink> |
                        <button hidden @click="showDetails(mail.id)">Details</button>
                        <button @click="remove(mail.id)">x</button> -->
                </ul>
            </section>  
    `,
    data() {
        return {
            mail:this.mail
        }
    },
    methods:{
        showDetails(currMailid){
            console.log('currMailid',currMailid)
        },
        deleteMail(currMailid){
            Mailservice.remove(currMailid)
            .then(() => {
                const idx = this.mails.findIndex(mail => mail.id === currMailid)
                this.mails.splice(idx, 1)
                showSuccessMsg('mail removed')
            })
        }
    },
    components: {
        MailPreview
    }
}