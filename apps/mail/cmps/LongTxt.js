export default {
    props: {
        txt: {
            type: String,
            required: true,
        },
        length: {
            type: Number,
            required: false,
            default: 80,
        },
    },
    template: `
            <article>
               <p>Description: {{displayTxt}}</p>
               <button class="btn-more" @click="isShown = !isShown" v-if="txt.length > length">
                Read {{isShown ? 'less' : 'more'}}
                </button>
            </article>
    `,
    data() {
        return {
            isShown: false,
        };
    },

    methods: {},
    computed: {
        displayTxt() {
            if (!this.isShown && this.txt.length > this.length)
                return this.txt.slice(0, this.length) + '...';
            return this.txt;
        },
    },
};
