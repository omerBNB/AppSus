export default {
    template:`
    <section class="side-bar-conatiner">
            <ul>
                <button @click="sentCreate">Compose</button>
                <li @click="onInbox">Inbox</li>
                <li @click="onlyStared">Starred</li>
                <li>Snoozed</li>
                <li>Important</li>
                <li @click="onlySentMails">Sent</li>
           </ul>
</section>
    `,
    methods:{
        onInbox(){
            this.$emit('showallInbox')
        },
        onlyStared(){
            this.$emit('showStared')
        },
        sentCreate(){
            this.$emit('createEmail')
        },
        onlySentMails(){
            this.$emit('showSent')
        }
    }
}