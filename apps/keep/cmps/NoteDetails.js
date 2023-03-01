export default {
  props: ['selectedNote'],
  template: `

  <!-- Text modal -->
          <article v-if="selectedNote.type==='NoteTxt'" class="note-details">
              <h2>{{selectedNote.info.txt}}</h2>
              <button @click='closeModal'>x</button>
          </article>

  <!-- Img modal -->
          <article v-if="selectedNote.type==='NoteImg'"class="note-details">
              <h2>{{selectedNote.info.title}}</h2>
              <img :src="selectedNote.info.url"/>
              <button @click='closeModal'>x</button>
          </article>

  <!-- TodoList modal -->
          <article v-if="selectedNote.type==='NoteTodos'"class="note-details">
              <h2>{{selectedNote.info.title}}</h2>
              <ul>
                <li v-for="todo in selectedNote.info.todos"> 
                    {{todo.txt}}
                </li>
              </ul>
              <button @click='closeModal'>x</button>
          </article>
      `,

  methods: {
    closeModal() {
      this.$emit('closeModal')
      this.$router.push('/keep')
    },
  },
}
