export default {
    template:`
    <section class="side-bar-conatiner">
    <h1>✉️ AppSus</h1>
            <ul>
                <button @click="sentCreate"><i class="fa-solid fa-pencil"></i> Compose</button>
                <li @click="onInbox"><i class="fa-solid fa-inbox"></i> Inbox</li>
                <li @click="onlyStared"><i class="fa-regular fa-star"></i> Starred</li>
                <li><i class="fa-solid fa-clock-rotate-left"></i> Snoozed</li>
                <li><i class="fa-solid fa-cloud"></i> Important</li>
                <li @click="onlySentMails"><i class="fa-solid fa-arrow-right-to-bracket"></i> Sent</li>
                <li @click="showTrashCan"><i class="fa-regular fa-trash-can"></i> Trash</li>
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
        },
        showTrashCan(){
            this.$emit('showTrash')
        }
    }
}

