export default {
    template: `
<div class="search-container">
    <input type="search" placeholder="Search Mail..." v-model="filtertxt"/>
    <button @click="filterbytxt">🔍</button>
    </div>
`,
    data() {
        return {
            filtertxt: ''
        }
    },
    computed: {
        filterbytxt(){
            this.$emit('filtertxts',this.filtertxt)
        }
    }

}