export default {
    props: ['mail'],
    template: `             
    <section>
                    <div class="1">
                        <input type="checkbox" @click="toggleIsSelected" :checked="isSelectedChecked"/>
                        <input type="checkbox"  @click="toggleisStared" :checked="isStaredChecked"/>
                        <input type="checkbox"/>
                    </div>

                    <div class="sender" @click="showDetails(mail.id)">
                        <h4>{{mail.from}}</h4>
                    </div>
                    
                    <div class="content" @click="showDetails(mail.id)">
                    <h4>{{mail.subject}} -</h4>
                    <p>{{displayTxt}}</p>
                    </div>

                    <div>
                        <h5>{{sentAt}}</h5>
                    </div>
    </section> 
                  
    `,
    data() {
        return {
            date: this.mail.sentAt,
            length: 20,
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
        isSelectedChecked() {
            return (this.mail.isSelected) ? true : false
        },
        isStaredChecked() {
            return (this.mail.isStared) ? true : false
        }
    }
}