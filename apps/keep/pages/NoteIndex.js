import { noteService } from '../services/note.service.js'
import NoteList from '../cmps/NoteList.js'
import NoteDetails from '../cmps/NoteDetails.js'

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
  template: `
      <section class="main-container"> 
          <section class="side-bar-conatiner"> 
              <ul>
                  <li>Notes</li>
                  <li>Reminders</li>
                  <li>Edit Labels</li>
                  <li>Archive</li>
                  <li>Bin</li>
             </ul>
          </section>


          <section class="notes-conatiner">
              <div class="search-container">
                  <button>🔍</button>
                  <input type="search" placeholder="Search Keep..." /></div>

                    <form class="addnote-container" @submit.prevent="uploadNote">
                      <input v-model="userTxt" class="takeANote" :type="text" :placeholder="currInputType"/>
                      <div>
                        <button type="button" @click="changeInput('NoteTxt')">A</button>
                        <button type="button" @click="changeInput('img')" >🖼</button>
                        <button type="button" @click="changeInput('video')" >📽</button>
                        <button type="submit" >+</button>
                      </div>
                      </form>

                      <section>
              <NoteList 
              @removeNote="removeNote"
              @openDetails="openDetails"
              :notes="notes"/>
  
               </section>
               </section>

               <NoteDetails
               :selectedNote="selectedNote"
               @closeModal='selectedNote = null'
               v-if="selectedNote"/>
               
     </section> 
      `,

  data() {
    return {
      note: noteService.getEmptyNote(),
      userTxt: '',
      notes: null,
      currInputType: 'NoteTxt',
      selectedNote: null,
    }
  },

  methods: {
    changeInput(val) {
      this.currInputType = val
    },

    openDetails(note) {
      this.selectedNote = note
      this.$router.push('/keep/' + note.id)
    },

    removeNote(noteId) {
      noteService
        .remove(noteId)
        .then(() => {
          const idx = this.notes.findIndex((note) => note.id === noteId)
          this.notes.splice(idx, 1)
          showSuccessMsg('Note removed')
        })
        .catch((err) => {
          showErrorMsg('Note remove failed')
        })
    },

    uploadNote() {
      console.log('upload Note', this.userTxt)
      if (this.userTxt === '') return
      if (this.currInputType === 'NoteTxt') this.addTxtNote(this.userTxt, this.currInputType)
    },

    addTxtNote(txt, type) {
      this.note.info.txt = txt
      this.note.type = type
      this.note.style.backgroundColor = '#B3E5BE'
      noteService
        .save(this.note)
        .then(() => {
          this.notes.push(this.note)
          this.note = noteService.getEmptyNote()
          showSuccessMsg('Note saved')
          // this.$router.push('/keep' + this.note.id)
        })
        .catch((err) => {
          showErrorMsg('Note save failed')
        })
    },
  },

  created() {
    noteService.query().then((notes) => (this.notes = notes))
  },

  components: {
    NoteList,
    NoteDetails,
  },
}
