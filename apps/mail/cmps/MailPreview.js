export default {
    props:['mail'],
    template:`             
    <section @click="showDetails(mail.id)">
                    <div class="1">
                        <input type="checkbox"/>
                        <input type="checkbox"/>
                        <input type="checkbox"/>
                    </div>

                    <div class="sender">
                        <h4>{{mail.from}}</h4>
                    </div>
                    
                    <div class="content">
                    <h4>{{mail.subject}} -</h4>
                    <p>{{displayTxt}}</p>
                    </div>

                    <div>
                        <h5>{{sentAt}}</h5>
                    </div>
    </section> 
                  
    `,
    data(){
        return {
            date: this.mail.sentAt,
            length: 20
        }
    },
    methods:{
        showDetails(currId){
            this.$emit('showdetails',currId)
        }
    },
    computed:{
        sentAt(){
            return new Date(this.date).getFullYear()
        },
        displayTxt() {
            if (this.mail.body.length > this.length)
                return this.mail.body.slice(0, this.length) + '...';
            return this.mail.body;
        },
    }
}