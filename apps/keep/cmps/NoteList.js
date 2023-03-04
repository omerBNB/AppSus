// import NotePreview from './NotePreview.js'
// import { noteService } from '../services/note.service.js'
import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'
import NoteTodos from './NoteTodos.js'
import NoteVideo from './NoteVideo.js'
import NoteEmail from './NoteEmail.js'

export default {
  props: ['notes'],
  template: `
        <section class="notes-container">

            <ul v-if="notes">
                <li v-for="note in notes" :key="note.id">
                
                <article class="note"
                @click="openDetails(note)"
                :style="{'background-color': note.style.backgroundColor}">

                    <Component
                    @changeInfo="updateNote" 
                    :is="note.type"
                    :info="note.info"/>

                    <div>
                    <button v-if="!note.isPinned" title="delete note" class="remove-note-preview" @click.stop="remove(note.id)">x</button>
                    <button title="pin note" class="pin-note-preview" @click.stop="togglePin(note)"><i class="fa-regular fa-star"></i></button>
                   </div>

                  </article>
                  </li>
                </ul>
              </section>
              `,

  methods: {
    openDetails(note) {
      this.$emit('openDetails', note)
    },
    //
    togglePin(note) {
      console.log('note', note)
      this.$emit('togglePin', note)
    },

    remove(noteId) {
      this.$emit('removeNote', noteId)
    },
  },

  computed: {
    starColor(note) {
      return note.isPinned ? 'color:yellow' : ''
    },
  },

  components: {
    NoteTxt,
    NoteImg,
    NoteTodos,
    NoteVideo,
    NoteEmail,
  },
}
