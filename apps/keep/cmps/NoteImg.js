export default {
  props: ['info'],
  template: `
            <h2 class="title">{{info.title}}</h2>
            <img :src="info.url"/>
        `,
}
