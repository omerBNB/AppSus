export default {
  props: ['note'],
  template: `
  <article
          class="note-details todos"
          :style="{'background-color': note.style.backgroundColor}"
          >
         

              <input type="text" 
              @input="changeTxt"
              v-model="note.info.title"
              :value="note.info.title"
              :style="{'background-color': note.style.backgroundColor}"
              />
              <ul>
                <li v-for="(todo,idx) in note.info.todos"
                :class="todo.doneAt ? 'doneTodo' : ''"
                @click="todo.doneAt = todo.doneAt ? null : Date.now()"
                > 
                    {{todo.txt}}
                    <button @click.stop="removeTodo(idx)">X</button>
                </li>
              </ul>
              <button class="close-modal"  @click='closeModal'>x</button>

              <input class="todo-input" v-model="userNewTodo" type="text"/>
              <div class="btns-todo">
                <button class="add-todo" @click='AddTodo'>AddTodo</button>
                
                <button class="color-pic">
                  <i class="fa-solid fa-palette"></i>
                  <input type="color" 
                  v-model="note.style.backgroundColor"
                  @input='changeBgcColor'/>
                </button>
              </div>
          </article>
  `,

  data() {
    return {
      userNewTodo: '',
    }
  },
  methods: {
    changeBgcColor() {
      this.$emit('changeBgcColor', this.note.style.backgroundColor)
    },

    removeTodo(todoIdx) {
      console.log('todoIdx:', todoIdx)
      const note = JSON.parse(JSON.stringify(this.note))

      note.info.todos.splice(todoIdx, 1)
      this.$emit('deleteTodo', todoIdx)
    },
    AddTodo() {
      if (this.userNewTodo === '') return
      this.$emit('addTodo', { txt: this.userNewTodo, doneAt: null })
    },

    changeTxt() {
      console.log('this.note.info.txt', this.note.info.txt)
      this.$emit('changeTxt', this.note.info.txt)
    },
    closeModal() {
      this.$emit('closeModal')
    },
  },

  created() {},
  components: {},
  emits: [],
}
