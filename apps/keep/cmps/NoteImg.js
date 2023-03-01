export default {
  props: ['info'],
  template: `
        <article class="note">
            <h2 class="title">{{info.title}}</h2>
            <img :src="info.url"/>
          </article>
        `,
}
