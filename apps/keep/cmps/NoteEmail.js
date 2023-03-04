export default {
  props: ['info'],
  template: `
    <div>
        <h2 class="title">{{info.title}}</h2>
        <h2 class="txt">{{info.text}}</h2>
  </div>
  
          `,

  created() {
    console.log('this.info', this.info)
  },
}
