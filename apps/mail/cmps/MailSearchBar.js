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
    methods: {
        filterbytxt() {
            this.$emit('filtertxts', this.filtertxt)
            console.log(' this.filtertxt', this.filtertxt)
            this.filtertxt = null
        }
    }

}