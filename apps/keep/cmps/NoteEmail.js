export default {
  props: ['info'],
  template: `
    <div>
        <pre>
            {{info}}
        </pre>
      <!-- <h2 class="title">{{info.title}}</h2> -->
      
  </div>
  
          `,

  created() {
    console.log('this.info', this.info)
  },
}
