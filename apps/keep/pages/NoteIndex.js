import { noteService } from '../services/note.service.js'
import NoteList from '../cmps/NoteList.js'

export default {
  template: `
      <section class="main-container"> <!--  -->
          <section class="side-bar-conatiner"> <!--  -->
              <ul>
                  <li>Notes</li>
                  <li>Reminders</li>
                  <li>Edit Labels</li>
                  <li>Archive</li>
                  <li>Bin</li>
             </ul>
          </section> <!--  -->


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
                      </div><!--  -->
                      </form>

                      <section>
              <NoteList :notes="notes"/>
  
               </section>
               </section>
     </section> 
      `,

  data() {
    return {
      note: noteService.getEmptyNote(),
      userTxt: '',
      notes: [],
      currInputType: 'NoteTxt',
    }
  },

  methods: {
    changeInput(val) {
      this.currInputType = val
    },
    uploadNote() {
      console.log('upload Note', this.userTxt)
      if (this.userTxt === '') return
      if (this.currInputType === 'NoteTxt') this.addTxtNote(this.userTxt, this.currInputType)
    },

    addTxtNote(txt, type) {
      this.note.info.txt = txt
      this.note.type = type
      noteService.save(this.note).then(() => {
        this.notes.push(this.note)
        this.note = noteService.getEmptyNote()
        // showSuccessMsg('Car saved')
        // this.$router.push('/car')
      })
      // .catch(err=>{
      // showErrorMsg('Car save failed')
      // })
    },
  },

  created() {
    noteService.query().then((notes) => (this.notes = notes))
  },
  // watch: {
  //   sssnote: {
  //     handler() {
  //       this.note = noteService.getEmptyNote()
  //     },
  //   },
  // },
  components: {
    NoteList,
  },
}
