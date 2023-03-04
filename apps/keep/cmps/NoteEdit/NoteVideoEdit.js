export default {
  props: ['note'],
  template: `
      <article 
            class="note-details"
            :style="{'background-color': note.style.backgroundColor}"
            >
           
           
  
            <!-- <input type="color" ref="colorPicker" @input="setColor" style="display: none;"> -->
            <label class="title">
            Click to Edit:
              <input @input="changeTxt"
              v-model="note.info.title"
              type="text" :value="note.info.title"
              :style="{'background-color': note.style.backgroundColor}"
              />
              
            </label>
            <iframe :src="'https://www.youtube.com/embed/'+note.info.url"></iframe>
                <button class="close-modal" @click='closeModal'>x</button>
                
                <button class="color-pic">
            <i class="fa-solid fa-palette"></i>
              <input type="color" 
              v-model="note.style.backgroundColor"
              @input='changeBgcColor'/>
            </button>
  
            </article>
            `,

  data() {
    return {}
  },
  methods: {
    changeBgcColor(color) {
      this.$emit('changeBgcColor', this.note.style.backgroundColor)
    },

    changeTxt() {
      // console.log('this.note.info.title', this.note.info.title)
      this.$emit('changeTxt', this.note.info.title)
    },

    closeModal() {
      this.$emit('closeModal')
    },
  },
  computed: {},
  created() {},
  components: {},
  emits: [],
}
