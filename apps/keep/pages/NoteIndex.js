import { noteService } from '../services/note.service.js'
import NoteList from '../cmps/NoteList.js'

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
              
              <input class="takeANote" type="text" placeholder="Take a Note..."/>
  
              <NoteList :notes="notes"/>
  
          </section>
              
     </section>
      `,

  data() {
    return {
      notes: [],
    }
  },

  created() {
    // nsoteService.query().then((notes) => {
    //   this.notes = notes
    //   console.log('this.notes', this.notes)
    // })
    const notesDB = noteService.query()
    this.notes = notesDB
    console.log('this.notes:', this.notes)
  },

  components: {
    NoteList,
  },
}
