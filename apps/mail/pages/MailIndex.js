import MailList from '../cmps/MailList.js'
import { Mailservice } from "../services/mail.service.js"
import MailsSideBar from '../../mail/cmps/MailSideBar.js'
import MailsNavBar from '../../mail/cmps/MailNavBar.js'
import MailsSearchBar from '../../mail/cmps/MailSearchBar.js'
import CreateEmail from '../../mail/cmps/CreateEmail.js'
import MailDetails from '../pages/MailDetails.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
  <!-- <header> -->
  <section class="mails-list">
  <section class="main-container">
        <MailsSideBar
        @showallInbox="showAllMails"
        @showStared="showOnlyStared"
        @createEmail="createAnEmail"
        @showSent="showSentEmails"
        @showTrash="showTrashMails"
        />
        <section class="mails-conatiner">
            <MailsSearchBar 
            @filtertxts="setFilterBytxt"/>
            <MailsNavBar/>
     <MailList 
     :mails="getFilterByTxt"
     @showTheDetails="showDetails"
     @deletethismail="deleteMail"
     v-if="details===false"/>
     <MailDetails 
     v-if="mail" 
     :mail="mail"
     @deleteMail="deleteMail"/>
    </section>
</section>
</section>
  <CreateEmail
  v-if="creation === 'compose'"
  @closeTheCompose="closeCreation"
  @sendEmail="sendNewEmail"/>
    `,
    data() {
        return {
            mails: [],
            filterBy: { txt: '', isStared: false },
            creation: null,
            details: false,
            mail: null
        }
    },
    created() {
        Mailservice.query(this.filterBy)
            .then(eMails => this.mails = eMails)
    },
    methods: {
        setFilterBytxt(filterBy) {
            this.filterBy.txt = filterBy
        },
        showAllMails() {
            this.details = false
            this.mail = null
            this.filterBy = { txt: '', isStared: false }
            Mailservice.query(this.filterBy)
                .then(eMails => this.mails = eMails)
        },
        showOnlyStared() {
            this.details = false
            this.mail = null
            this.filterBy.txt = ''
            this.filterBy.isStared = true
            Mailservice.query(this.filterBy)
                .then(eMails => this.mails = eMails)
        },
        closeCreation() {
            this.creation = null
        },
        createAnEmail() {
            this.creation = 'compose'
        },
        showDetails(currMailid) {
            this.details = true
            Mailservice.get(currMailid)
                .then(mail => this.mail = mail)
        },
        sendNewEmail(content) {
            this.creation = null
            const { to, subject, body } = content
            Mailservice.createMail(to, subject, body)
                       .then(()=>
                       showSuccessMsg('mail sent'))   
        },
        showSentEmails(){
            this.details = false
            this.mail = null
            this.filterBy = { txt: '', isStared: false }
            Mailservice.getSentMails()
                     .then(mails => this.mails = mails)
        },
        deleteMail(currMailid){
            const mail = this.mails.find(mail => mail.id === currMailid)
            Mailservice.saveTrashedMail(mail)
            Mailservice.remove(currMailid)
            .then(() => {
                const idx = this.mails.findIndex(mail => mail.id === currMailid)
                this.mails.splice(idx, 1)
                showSuccessMsg('mail removed')
            })  
        },
        showTrashMails(){
            Mailservice.queryTrashedMail()
                      .then(mails => this.mails = mails)
        }
    },
    computed: {
        getFilterByTxt() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.mails.filter(mail => regex.test(mail.body))
        },
        getMails() {
            return this.mails
        }
    },
    components: {
        MailList,
        MailsSideBar,
        MailsNavBar,
        MailsSearchBar,
        CreateEmail,
        MailDetails
    }
}
