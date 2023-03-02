export default {
  props: ['info'],
  template: `
    <!-- <li> -->
        <!-- <article class="note"> -->
            <h2>{{info.title}}</h2>
            <img :src="'https://www.youtube.com/embed/'+info.url"/>
          <!-- </article> -->
  <!-- </li> -->
        `,

  //   data() {

  // return
  //   },
}
