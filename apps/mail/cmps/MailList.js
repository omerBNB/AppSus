import MailPreview from './MailPreview.js'
import {Mailservice} from '../services/mail.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import MailDetails from '../pages/MailDetails.js'


export default {
    props: ['mails'],
    template: `
            <!-- <section> -->
                <ul >
                    <li v-for="mail in mails" :key="mail.id" :class=" mail.isRead? 'read' : 'unread' " v-if="!mail">
                        <MailPreview 
                        :mail="mail"
                        @showdetails="showDetails"
                        @mailSelected="saveAsSelected"
                        @mailStared="mailStared"
                        @important="mailImportant"
                        @readnread="toggleReadUnread(mail)"
                        @deletemail="deleteMail(mail.id)"
                        />
                        <!-- <span>
                            <button @click.stop="toggleReadUnread(mail)">📩</button>
                            <button @click.stop="deleteMail(mail.id)">X</button>
                        </span> -->
                        <!-- <RouterLink :to="'/mail/'+mail.id">Details</RouterLink> -->
                    </li>
                    <!-- <RouterLink :to="'/mail/'+mail.id">Details</RouterLink> |
                    <RouterLink :to="'/mail/edit/'+mail.id">Edit</RouterLink> |
                    <button hidden @click="showDetails(mail.id)">Details</button>
                    <button @click="remove(mail.id)">x</button> -->
                </ul>
            <!-- </section>   -->
    `,
    data() {
        return {
            mail:null,
        }
    },
    methods:{
        showDetails(currMailid){
            this.$emit('showTheDetails',currMailid)
        },
        deleteMail(currMailid){
            this.$emit('deletethismail',currMailid)
            
        },
        toggleReadUnread(mail){
            mail.isRead = (mail.isRead)? false : true
            Mailservice.save(mail)
        },
        saveAsSelected(mail){
            Mailservice.save(mail)
                       
        },
        mailStared(mail){
            Mailservice.save(mail)                      
        },
        mailImportant(mail){
            Mailservice.save(mail)
        }
    },
    components: {
        MailPreview,
        MailDetails
    }
}