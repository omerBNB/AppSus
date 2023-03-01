export default {
    template:`
    <section class="side-bar-conatiner">
            <ul>
                <button>Compose</button>
                <li @click="onInbox">Inbox</li>
                <li @click="onlyStared">Starred</li>
                <li>Snoozed</li>
                <li>Important</li>
                <li>Sent</li>
           </ul>
</section>
    `,
    methods:{
        onInbox(){
            this.$emit('showallInbox')
        },
        onlyStared(){
            this.$emit('showStared')
        }
    }
}