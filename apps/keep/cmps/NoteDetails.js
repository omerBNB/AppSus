import NoteTxtEdit from './NoteEdit/NoteTxtEdit.js'
import NoteImgEdit from './NoteEdit/NoteImgEdit.js'
import NoteTodosEdit from './NoteEdit/NoteTodosEdit.js'
import NoteVideoEdit from './NoteEdit/NoteVideoEdit.js'
import NoteEmailEdit from './NoteEdit/NoteEmailEdit.js'

export default {
  props: ['selectedNote'],
  template: `

  <div class="back-drop">
    <Component
    :is="noteType"
    :note='selectedNote'
    @changeTxt="changeTxt"
    @closeModal="closeModal"
    @changeBgcColor="changeBgcColor"
    @addTodo="addTodoToIndex"
    @deleteTodo="removeTodo"
    >
   </div>
      `,

  computed: {
    noteType() {
      return this.selectedNote.type + 'Edit'
    },
  },

  methods: {
    removeTodo(todoIdx) {
      this.$emit('deleteTodo', todoIdx)
    },

    changeBgcColor(color) {
      console.log('color', color)
      this.$emit('changeBgcColor', color)
    },
    addTodoToIndex(todo) {
      // console.log('todo:', todo)
      this.$emit('addTodos', todo)
    },

    changeTxt(txt) {
      console.log('txt:', txt)
      this.$emit('changeTxt', txt)
    },
    closeModal() {
      console.log('close')
      this.$emit('closeModal')
      // this.$router.push('/keep')
    },
  },

  components: {
    NoteTxtEdit,
    NoteImgEdit,
    NoteTodosEdit,
    NoteVideoEdit,
    NoteEmailEdit,
  },
}
