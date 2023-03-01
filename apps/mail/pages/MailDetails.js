export default {
    props:['mail'],
    template:`
    <section>
        <h1>{{mail.id}}</h1>
    </section>
    `,
    created(){
        console.log('mail',this.mail)
    }
}