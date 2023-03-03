import NoteTxtEdit from './NoteEdit/NoteTxtEdit.js'
import NoteImgEdit from './NoteEdit/NoteImgEdit.js'
import NoteTodosEdit from './NoteEdit/NoteTodosEdit.js'

export default {
  props: ['selectedNote'],
  template: `
  <div class="back-drop">
<Component
:is="noteType"
:note='selectedNote'
@changeTxt="changeTxt"
@changeBgcColor="changeBgcColor"
@addTodo="addTodoToIndex"
@removeTodo="removeTodo"
>
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
      this.$emit('closeModal')
      this.$router.push('/keep')
    },
  },

  components: {
    NoteTxtEdit,
    NoteImgEdit,
    NoteTodosEdit,
  },
}
