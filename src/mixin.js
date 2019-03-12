import config from './config'
import lodash from 'lodash'
import * as filters from './filter'

export const global = {
    filters,
    data() {
        return {
            config,
            lodash
        }
    },

    methods: {
        $dialog(type, params = {}) {
            return new Promise((resolve, reject) => {
                this.$root.dialog = { type, params, promise: { resolve, reject } }
            })
        }
    }
}

export const list = {
    data() {
        return {
            query: {},
            list: {
                api: '',
                cols: [],
                slots: [],
                items: [],
                total: 0,
                filter: {},
                queries: { limit: 10, offset: 0 }
            }
        }
    },

    mounted() {
        this.list.cols = this.$options.list.columns.map(col => {
            if(col.slot) {
                this.list.slots.push(col)
            } else {
                if(col.dc) {
                    col.formatter = (row, column, cellValue) => filters.dc(cellValue, col.dc)
                } if(col.currency) {
                    col.formatter = (row, column, cellValue) => cellValue > 0 ? filters.currency(cellValue) : 0
                } else if(_.isUndefined(col.formatter)) {
                    col.formatter = (row, column, cellValue) => /^[\d|-]{10}/.test(cellValue) ? filters.df(cellValue) : cellValue
                }
            }

            col.sortable = col.sort
            return col
        })

        this.fetch()
    },

    computed: {
        filterables() {
            return this.list.cols
                    .filter(col => col.filter)
                    .map(col => {
                        col.onFilter = value => this.onFilter(value, col)
                        return col
                    })
        },

        currentPage() {
            return Math.floor(this.list.queries.offset % this.list.queries.limit) + 1
        }
    },

    methods: {
        onFilter(value/*value or event*/, col) {
            value = _.isObject(value) ? this.list.filter[col.prop] : value
            _.update(this.list.queries, col.prop, _.constant(value))

            this.list.queries = _.merge(this.list.queries, this.query)

            this.fetch(true)
        },

        onSort({ prop, order }) {
            _.update(this.list.queries, 'orderby', () => order ? ('ascending' === order ? '-' : '') + prop : undefined)
            this.fetch(true)
        },

        onPaging(page) {
            _.update(this.list.queries, 'offset', () => (page - 1) * this.list.queries.limit)
            this.fetch()
        },

        onView(scope) {
            this.$router.push(this.$route.path.replace('list', scope.row.id))
        },

        onEdit(scope) {
            this.$router.push(this.$route.path.replace('list', scope.row.id))
        },

        onDelete(scope) {
            this.$delete(this.$options.list.api, {
                id: [scope.row.id]
            }).then(resp => {
                this.fetch()
            })
        },

        onImgPreview(imageUrl) {
            window.open(imageUrl)
        },

        fetch(fresh = false) {
            if(fresh) {
                this.list.queries.offset = 0
            }

            this.$get(this.$options.list.api, this.list.queries).then(resp => {
                if(this.$options.list.transform) {
                    this.list.items = resp.entries.map(this.$options.list.transform)
                } else {
                    this.list.items = resp.entries
                }
                this.list.total = resp.total
            })
        }
    }
}
