export default {
  props: ['info'],
  template: `
  <section>
    <h2 class="title">{{info.txt}}</h2>
    <iframe :src="'https://www.youtube.com/embed/'+info.url"></iframe>
</section>
          `,
  created() {
    console.log('this.info', this.info)
  },
}
