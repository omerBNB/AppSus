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
        <MailsSideBar/>
        <section class="mails-conatiner">
            <MailsSearchBar
            @filtertxts="setFilterBytxt"
            />
           <MailsNavBar/>
     <MailList :mails="mails"/>
     </section>
        </section>
  </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: {txt:''},
        }
    },
    created() {
        Mailservice.query(this.filterBy)
        .then(eMails => this.mails = eMails)     
    },
    methods:{
        setFilterBytxt(filterBy) {
            this.filterBy.txt = filterBy
        }
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
