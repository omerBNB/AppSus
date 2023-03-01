export default {
    template: `
<form class="search-container" @submit.prevent="filterbytxt">
    <input type="search" placeholder="Search Mail..." v-model="filtertxt"/>
    <button>🔍</button>
    </form>
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