// export default {
//     template:`
//     <section class="mail-filter">
//             <input 
//                 v-model="filterBy.txt"
//                 placeholder="Search"
//                 type="text" />
//             <input 
//                 v-model.number="filterBy.status"
//                 placeholder="status"
//                 type="number" />
//         </section>
//     `,
//         data() {
//             return {
//                 filterBy: { txt: '', status: null },
//             }
//         },
//         methods: {
//             filter() {
//                 this.$emit('filter', this.filterBy)
//         }
//     }
// }