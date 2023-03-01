import MailList from '../cmps/MailList.js'
import { Mailservice } from "../services/mail.service.js"
import MailsSideBar from '../../mail/cmps/MailSideBar.js'
import MailsNavBar from '../../mail/cmps/MailNavBar.js'
import MailsSearchBar from '../../mail/cmps/MailSearchBar.js'

export default {
    template: `
  <!-- <header> -->
  <section class="mails-list">
  <section class="main-container">
        <MailsSideBar
        @showallInbox="showAllMails"
        @showStared="showOnlyStared"
        />
        <section class="mails-conatiner">
            <MailsSearchBar 
            @filtertxts="setFilterBytxt"/>
           <MailsNavBar/>
     <MailList :mails="mails"/>
     </section>
        </section>
  </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: {txt:'', isStared:false},
        }
    },
    created() {
        Mailservice.query(this.filterBy)
        .then(eMails => this.mails = eMails)     
    },
    methods:{
        setFilterBytxt(filterBy) {
            this.filterBy.txt = filterBy
        },
        showAllMails(){
            this.filterBy = {txt:'', isStared:false}
            Mailservice.query(this.filterBy)
            .then(eMails => this.mails = eMails) 
        },
        showOnlyStared(){
            this.filterBy.isStared = true
            Mailservice.query(this.filterBy)
            .then(eMails => this.mails = eMails)
        },
    },
    computed:{
        getFilterByTxt(){
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.mails.filter(mail => regex.test(mail.body))
        }
    },
    components: {
        MailList,
        MailsSideBar,
        MailsNavBar,
        MailsSearchBar
    }
}
