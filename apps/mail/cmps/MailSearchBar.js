export default {
    template: `
<section class="search-container">
    <form @submit.prevent="filterbytxt" >
        <button><i class="fa-solid fa-magnifying-glass"></i></button>
        <input type="search" placeholder="Search mail" v-model="filtertxt" />
    </form>
</section>
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