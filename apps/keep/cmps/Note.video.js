export default {
  props: ['info'],
  template: `
 <iframe :src="info.url"></iframe>
          `,
  created() {
    console.log('this.info', this.info)
  },
}
