export default {
    props: ['mail'],
    template: `
    <section>
             <div class="details-nav">
             <i @click="backToEmails" class="fa-solid fa-arrow-left"></i>
             <input type="checkbox"  class="star" @click="toggleisStared" :checked="isStaredChecked"/>
             <i @click.stop="ReadUnread(mail)" class="fa-regular fa-envelope"></i>
             <i @click="deleteThisMail(mail.id)" class="fa-regular fa-trash-can"></i>
            </div>
        <div class="main-details-content">
            <h3>{{mail.subject}}</h3>
            <h4>{{mail.from}}</h4>
            <p>{{mail.body}}</p>
        </div>
    </section>
    `,
    methods: {
        toggleisStared() {
            this.mail.isStared = (this.mail.isStared) ? false : true
            this.$emit('mailStared', this.mail)
        },
        deleteThisMail(currMailid){
           this.$emit('deleteMail',currMailid)
        },
        backToEmails(){
            this.$emit('backtoallmails')
        }
    },
    computed: {
        isStaredChecked() {
            return (this.mail.isStared) ? true : false
        }
    }

}