var webstore = new Vue({
    el: "#app",
    data: {
        sitename: 'After School Lessons',
        sortBy: 'subject',
        orderBy: 'ascending',
        searchTerm: '',
        showLessons: true,
        lessons: lessons,
        cart: [],
        checkout: {
            name: '',
            phone: ''
        }
    },

    methods: {
        addToCart(lesson) {
            this.cart.push(lesson);
        },

        removeFromCart(lesson) {
            this.cart.splice(this.cart.indexOf(lesson), 1);
        },

        toggleCart() {
            this.showLessons = this.showLessons ? false : true;
        },

        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },

        canAddToCart(lesson) {
            return lesson.spaces > this.cartCount(lesson);
        },
    }
})