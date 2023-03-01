export default {
  props: ['info'],
  template: `
          <article class="note">
              <h2 class="title">{{info.title}}</h2>
              <ul>
                <li v-for="todo in todos" :key="todo.id">
                   <p :class="todo.doneAt ? 'doneTodo' : ''"> 
                    {{todo.txt}}
                   </p>
                 </li>
              </ul>
              <!-- <pre >{{info.todos}}></pre> -->
            </article>
          `,

  data() {
    return {
      todos: this.info.todos,
    }
  },
}
