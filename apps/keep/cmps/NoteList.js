// import NotePreview from './NotePreview.js'
import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'
import NoteTodos from './NoteTodos.js'

export default {
  props: ['notes'],
  template: `
        <section class="notes-container">
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <Component
                    :is="note.type"
                    :info="note.info"
                    />
                    <!-- <button @click="remove(note.id)">x</button> -->
                  </li>
                </ul>
              </section>
              `,

  // @changeInfo="updateNote"
  // },
  create() {
    console.log('this.notes', this.notes)
  },
  // methods: {
  //   changeNoteType(note) {
  //     console.log('note:', note)
  //     // this.noteType = noteType
  //   },

  components: {
    NoteTxt,
    NoteImg,
    NoteTodos,
  },
}
