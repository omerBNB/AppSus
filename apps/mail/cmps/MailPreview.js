export default {
    props: ['mail'],
    template: `             
    <section>
                    <div class="checkboxes">
                        <input type="checkbox" @click="toggleIsSelected" :checked="isSelectedChecked"/>
                        <input class="star" type="checkbox"  @click="toggleisStared" :checked="isStaredChecked"/>
                        <input class="cloud" type="checkbox"/>
                    </div>

                    <div class="sender" @click="showDetails(mail.id)">
                        <h4>{{mail.from}}</h4>
                    </div>
                    
                    <div class="content" @click="showDetails(mail.id)">
                    <h4>{{displaySubject}} -</h4>
                    <p>{{displayTxt}}</p>
                    <span>
                            <i @click.stop="ReadUnread(mail)" class="fa-regular fa-envelope"></i>
                            <i @click.stop="deleteMails(mail.id)" class="fa-regular fa-trash-can"></i>
                        </span>
                    </div>

                    <div>
                        <h5>{{sentAt}}</h5>
                    </div>
    </section> 
                  
    `,
    data() {
        return {
            date: this.mail.sentAt,
            length: 25,
            sublength: 15
        }
    },
    methods: {
        showDetails(currId) {
            this.$emit('showdetails', currId)
        },
        toggleIsSelected() {
            this.mail.isSelected = (this.mail.isSelected) ? false : true
            this.$emit('mailSelected', this.mail)
        },
        toggleisStared() {
            this.mail.isStared = (this.mail.isStared) ? false : true
            this.$emit('mailStared', this.mail)
        },
        ReadUnread(mail){
            this.$emit('readnread',mail)
        },
        deleteMails(currMailid){
            this.$emit('deletemail',currMailid)
        }
    },
    computed: {
        sentAt() {
            return new Date(this.date).getFullYear()
        },
        displayTxt() {
            if (this.mail.body.length > this.length)
                return this.mail.body.slice(0, this.length) + '...';
            return this.mail.body;
        },
        displaySubject(){
            if (this.mail.subject.length > this.sublength)
            return this.mail.subject.slice(0, this.sublength) + '...';
        return this.mail.subject;
        },
        isSelectedChecked() {
            return (this.mail.isSelected) ? true : false
        },
        isStaredChecked() {
            return (this.mail.isStared) ? true : false
        }
    }
}