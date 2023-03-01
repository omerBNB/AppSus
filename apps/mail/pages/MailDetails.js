export default {
    props: ['mail'],
    template: `
    <section>
             <div>
             <input type="checkbox"  @click="toggleisStared" :checked="isStaredChecked"/>
             <input type="checkbox"/>
            </div>
        <div>
            <h1>{{mail.subject}}</h1>
            <h2>{{mail.from}}</h2>
            <p>{{mail.body}}</p>
        </div>
    </section>
    `,
    methods: {
        toggleisStared() {
            this.mail.isStared = (this.mail.isStared) ? false : true
            this.$emit('mailStared', this.mail)
        },
    },
    computed: {
        isStaredChecked() {
            return (this.mail.isStared) ? true : false
        }
    }

}