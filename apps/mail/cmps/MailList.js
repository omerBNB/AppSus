import MailPreview from './MailPreview.js'
import {Mailservice} from '../services/mail.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import MailDetails from '../pages/MailDetails.js'


export default {
    props: ['mails'],
    template: `
            <section>
                <ul >
                    <li v-for="mail in mails" :key="mail.id" :class=" mail.isRead? 'read' : 'unread' " v-if="!mail">
                        <MailPreview 
                        :mail="mail"
                        @showdetails="showDetails"
                        @mailSelected="saveAsSelected"
                        @mailStared="mailStared"
                        />
                        <span>
                            <button @click="toggleReadUnread(mail)">📩</button>
                            <button @click="deleteMail(mail.id)">X</button>
                        </span>
                        <RouterLink :to="'/mail/'+mail.id">Details</RouterLink>
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
            mail:null,
        }
    },
    methods:{
        showDetails(currMailid){
            Mailservice.get(currMailid)
            .then(mail => this.mail = mail)
        },
        deleteMail(currMailid){
            Mailservice.remove(currMailid)
            .then(() => {
                const idx = this.mails.findIndex(mail => mail.id === currMailid)
                this.mails.splice(idx, 1)
                showSuccessMsg('mail removed')
            })
        },
        toggleReadUnread(mail){
            mail.isRead = (mail.isRead)? false : true
        },
        saveAsSelected(mail){
            Mailservice.save(mail)
                       .then(mail => this.mail = mail)
        },
        mailStared(mail){
            Mailservice.save(mail)
                       .then(mail => this.mail = mail)
        }
    },
    components: {
        MailPreview,
        MailDetails
    }
}