import { noteService } from '../services/note.service.js'
import { youtubeService } from '../services/youtube.service.js'
import NoteList from '../cmps/NoteList.js'
import NoteDetails from '../cmps/NoteDetails.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
  template: `
      <section class="main-container"> 
          <section class="side-bar-conatiner"> 
            <h1>AppSus</h1>

              <ul>
                <li @click="filterBy = 'All'"><i class="fa-solid fa-house"></i>All</li>
                  <li @click="filterBy = 'NoteTxt'"><i class="fa-sharp fa-solid fa-file-lines"></i>Text</li>
                  <li @click="filterBy = 'NoteImg'"><i class="fa-sharp fa-solid fa-image"></i>Images</li>
                  <li @click="filterBy = 'NoteVideo'"><i class="fa-sharp fa-solid fa-video"></i>Videos</li>
                  <li @click="filterBy = 'NoteTodos'"><i class="fa-sharp fa-solid fa-list-ul"></i>Todos</li>
             </ul>
          </section>


          <section class="notes-conatiner">
              <section class="search-container">
              
                 <form>
               <button><i class="fa-solid fa-magnifying-glass"></i></button>
                <input type="search" placeholder="Search Note..." v-model="filterName" />
               </form>
                </section>

                    <form class="addnote-container" @submit.prevent="uploadNote">
                      <input v-model="userTxt" class="takeANote" :type="text" :placeholder="currInputPlaceHolder"/>

                      <div>
                        <button type="button" @click="changeInputType('NoteTxt')">A</button>
                        <button type="button" @click="changeInputType('img')" ><i class="fa-solid fa-image"></i></button>
                        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;">
                        <button type="button" @click="changeInputType('NoteVideo')" ><i class="fa-brands fa-youtube"></i></i></button>
                        <button type="button" @click="changeInputType('todoList')" ><i class="fa-solid fa-list"></i></button>
                        <button type="submit" ><i class="fa-regular fa-plus"></i></button>
                      </div>

                      </form>

                      <section>

                      <section v-if="pinnedNotes.length" class="pin-notes-container">
                        <h1>Pinned Notes:</h1>
                      <NoteList 
                      @removeNote="removeNote"
                      @togglePin='togglePinNote'
                     @openDetails="openDetails"
                     :notes="pinnedNotes"/> 
                      </section>

                      <h1 class="sub-title">Other Notes:</h1>
              <NoteList 
              @removeNote="removeNote"
              @togglePin='togglePinNote'
              @openDetails="openDetails"
              :notes="noteToShow"/> 
  
               </section>

               <NoteDetails
               v-if="selectedNote"
               :selectedNote="selectedNote"
               @updateNote='updateNote'
               @closeModal='selectedNote = null'
               @changeTxt='changeTxt'
               @changeBgcColor='changeBgcColor'
               @addTodos='addTodo'
               @deleteTodo='removeTodo'
              
               />
               
     </section> 
     </section> 
      `,

  data() {
    return {
      filterName: '',
      note: noteService.getEmptyTxtNote(),
      userTxt: '',
      notes: null,
      currInputType: 'NoteTxt',
      selectedNote: null,
      selectedImg: null,
      videoUrl: null,
      filterBy: 'All',
      currInputPlaceHolder: 'Write text and click on "Upload"...',
      pinnedNotes: [],
    }
  },

  methods: {
    togglePinNote(note) {
      if (!note.isPinned) {
        note.isPinned = !note.isPinned
        this.pinnedNotes.push(note)
        const idx = this.notes.findIndex((note1) => note1.id === note.id)
        this.notes.splice(idx, 1)
      } else {
        note.isPinned = !note.isPinned
        const idx = this.pinnedNotes.findIndex((pinnedNote) => pinnedNote.id === note.id)
        this.pinnedNotes.splice(idx, 1)
        this.notes.push(note)
      }
      //1 noteService
      //   .save(this.note)
      //   .then(() => {
      //     // this.notes.push(this.note)
      //     showSuccessMsg('Pin Note saved')
      //   })
      //   .catch(() => {
      //     showErrorMsg('Pin Note save failed')
      //   })
    },

    chooseFile() {
      this.$refs.fileInput.click()
    },

    removeTodo(idx) {
      this.selectedNote.info.todos.splice(idx, 1)
      this.updateNote(this.selectedNote)
    },

    handleFileChange(event) {
      console.log('Selected file:', event.target.files[0])
      this.selectedFile = event.target.files[0]
      const url = this.imageUrl
      this.addImgNote(url)
      console.log('this.note', this.note)
    },

    updateNote(updatedNote) {
      console.log('updatedNote:', updatedNote)
      noteService
        .save(updatedNote)
        .then(() => {
          const idx = this.notes.findIndex((note) => note.id === updatedNote.id)
          this.selectedNote = updatedNote
          this.notes.splice(idx, 1, updatedNote)
          console.log('this.notes:', this.notes)
          showSuccessMsg('Note removed')
        })
        .catch((err) => {
          showErrorMsg('Note remove failed')
        })
    },

    addTodo(todo) {
      this.selectedNote.info.todos.push(todo)

      this.updateNote(this.selectedNote)
    },

    changeBgcColor(color) {
      console.log('color:', color)
      this.selectedNote.style.backgroundColor = color
      noteService
        .save(this.selectedNote)
        .then(() => {
          showSuccessMsg('Note Update')
        })
        .catch((err) => {
          showErrorMsg('Note Update failed')
        })
    },

    changeTxt(txt) {
      this.selectedNote.info.txt = txt
      noteService
        .save(this.selectedNote)
        .then(() => {
          showSuccessMsg('Note Update')
        })
        .catch((err) => {
          showErrorMsg('Note Update failed')
        })
    },

    changeInputType(val) {
      this.currInputType = val
      if (this.currInputType === 'NoteTxt') {
        this.note = noteService.getEmptyTxtNote()
        this.currInputPlaceHolder = 'Write text and click on "Upload"...'
      } else if (this.currInputType === 'img') {
        this.note = noteService.getEmptyImgNote()
        this.chooseFile()
        this.currInputPlaceHolder = 'Uploading image...'
      } else if (this.currInputType === 'todoList') {
        this.note = noteService.getEmptyTodoListNote()
        this.currInputPlaceHolder =
          'Write a todo list with seperate commas, example: title,todo1,todo2,todo3 ...'
      } else if (this.currInputType === 'NoteVideo') {
        this.currInputPlaceHolder = 'Write a video name and "upload" to upload from Youtube'
        if (this.userTxt === '') return
        this.note = noteService.getEmptyVideoNote()
        this.uploadVideo(this.userTxt)
      }
      this.userTxt = ''
    },

    openDetails(note) {
      this.selectedNote = note
      // this.$router.push('/keep/' + note.id)
    },

    addTodoList(text) {
      text.split(',').forEach((todoTxt, idx) => {
        // handle first intaration for the title:
        if (idx === 0) this.note.info.title = todoTxt
        else this.note.info.todos.push({ txt: todoTxt, doneAt: null })
      })

      noteService
        .save(this.note)
        .then(() => {
          this.notes.push(this.note)
          // this.note = noteService.getEmptyNote()
          showSuccessMsg('Note saved')
          // this.$router.push('/keep' + this.note.id)
        })
        .catch(() => {
          showErrorMsg('Note save failed')
        })
    },

    addImgNote(url) {
      if (!this.selectedFile) return
      this.note.info.url = url

      noteService
        .save(this.note)
        .then(() => {
          this.notes.push(this.note)
          // this.note = noteService.getEmptyNote()
          showSuccessMsg('Note saved')
          // this.$router.push('/keep' + this.note.id)
        })
        .catch(() => {
          showErrorMsg('Note save failed')
        })
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
      if (this.userTxt === '') return
      if (this.currInputType === 'NoteTxt') this.addTxtNote(this.userTxt, this.currInputType)
      if (this.currInputType === 'todoList') this.addTodoList(this.userTxt, this.currInputType)
      if (this.currInputType === 'img') {
        const imgUrl = this.imageUrl()
        this.addImgNote(this.userTxt, imgUrl, this.selectedImg)
      }
      this.userTxt = ''
    },

    addTxtNote(txt, type) {
      this.note.info.title = txt
      this.note.type = type
      this.note.style.backgroundColor = '#B3E5BE'
      noteService
        .save(this.note)
        .then(() => {
          this.notes.push(this.note)
          this.note = noteService.getEmptyTxtNote()
          showSuccessMsg('Note saved')
          // this.$router.push('/keep' + this.note.id)
        })
        .catch((err) => {
          showErrorMsg('Note save failed')
        })
    },

    uploadVideo(txt) {
      console.log('txt', txt)
      youtubeService.getYoutubeTopRes(txt).then((videoId) => {
        this.videoUrl = videoId
        console.log('this.videoUrl:', this.videoUrl)
        // if (!this.selectedFile) return
        this.note.info.url = this.videoUrl
        console.log('po1')
        noteService
          .save(this.note)
          .then(() => {
            this.notes.push(this.note)
            console.log('this.note:', this.note)
            // this.note = noteService.getEmptyNote()
            showSuccessMsg('Note saved')
            // this.$router.push('/keep' + this.note.id)
          })
          .catch(() => {
            showErrorMsg('Note save failed')
          })
      })
    },
  },

  computed: {
    noteToShow() {
      const regex = new RegExp(this.filterName, 'i')

      if (this.filterBy === 'All')
        return this.notes.filter((note) => {
          return regex.test(note.info.title) && !note.isPinned
        })

      if (this.filterBy === 'NoteTxt') {
        return this.notes.filter((note) => note.type === 'NoteTxt' && !note.isPinned)
      }
      if (this.filterBy === 'NoteImg') {
        return this.notes.filter((note) => note.type === 'NoteImg' && !note.isPinned)
      }

      if (this.filterBy === 'NoteVideo') {
        return this.notes.filter((note) => note.type === 'NoteVideo' && !note.isPinned)
      }

      if (this.filterBy === 'NoteTodos')
        return this.notes.filter((note) => note.type === 'NoteTodos' && !note.isPinned)
    },

    imageUrl() {
      if (this.selectedFile) {
        return URL.createObjectURL(this.selectedFile)
      } else {
        return null
      }
    },
  },

  created() {
    noteService.query().then((notes) => {
      this.notes = notes
      this.pinnedNotes = this.notes.filter((note) => note.isPinned)
    })
  },

  components: {
    NoteList,
    NoteDetails,
  },
}
