export default {
  props: ['info'],
  template: `
  <div>
    <h2 class="title">{{info.title}}</h2>
    <img :src="info.url"/>
</div>

        `,

  //   data() {

  // return
  //   },
  created() {
    console.log('this.info', this.info)
  },
}
