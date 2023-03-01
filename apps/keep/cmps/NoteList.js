// import NotePreview from './NotePreview.js'
import { noteService } from '../services/note.service.js'
import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'
import NoteTodos from './NoteTodos.js'

export default {
  props: ['notes'],
  template: `
        <section class="notes-container">
            <ul>
                <li v-for="note in notes" :key="note.id">
                <article class="note" >
                    <Component
                    @changeInfo="updateNote" 
                    :is="note.type"
                    :info="note.info"/>
                    <button @click="removeTodo(note.id)">x</button>
                  </article>
                  </li>
                </ul>
              </section>
              `,
  // :style="{'background-color': note.style.backgroundColor}"
  // :style="{'background-color': note.style.backgroundColor + 'px'}">

  // @changeInfo="updateNote"
  // },

  methods: {
    removeTodo(todoId) {
      noteService
        .remove(todoId)
        .then(() => {
          const idx = this.notes.findIndex((todo) => todo.id === todoId)
          this.notes.splice(idx, 1)
          // showSuccessMsg('Car removed')
        })
        .catch((err) => {
          // showErrorMsg('Car remove failed')
        })
    },
    updateNote() {
      console.log('update')
    },
  },

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
