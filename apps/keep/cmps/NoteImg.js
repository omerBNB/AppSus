export default {
  props: ['info'],
  template: `
  <div>
    <div>
      <h2 class="title">{{info.title}}</h2>
     </div>
       <img :src="info.url"/>
</div>

        `,

  created() {
    console.log('this.info', this.info)
  },
}
