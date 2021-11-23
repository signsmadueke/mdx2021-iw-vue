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

        cartCheckout() {
            let name = document.getElementById("name")
            let phone = document.getElementById("phone")
            var nameRegEx = /[a-zA-Z ]*$/
            var phoneRegEx = /(0|[1-9][0-9]*)$/
            if (name.value.match(nameRegEx) && phone.value.match(phoneRegEx)) {
                alert('Your order has been submitted!');
                window.location.reload();
                return true;
            } else {
                alert('The ʼNameʼ must be letters only and the ʼPhoneʼ must be numbers only');
                return false;
            }
        },

        canCheckout() {
            this.checkout.name = this.checkout.name.replace(/(0|[1-9][0-9]*)$/g, '')
            this.checkout.phone = this.checkout.phone.replace(/[a-zA-Z ]*$/g, '')
        }
    },
    computed: {

        sorted() {
            let orderLessons = this.lessons;

            orderLessons = orderLessons.sort((x, y) => {
                if (this.sortBy == "subject") {
                    let ax = x.subject.toLowerCase(),
                        ay = y.subject.toLowerCase();

                    if (ax < ay) {
                        return -1
                    }
                    if (ax > ay) {
                        return 1
                    }
                } else if (this.sortBy == 'location') {
                    let ax = x.location.toLowerCase(),
                        ay = y.location.toLowerCase();

                    if (ax < ay) {
                        return -1
                    }
                    if (ax > ay) {
                        return 1
                    }
                }
                return 0
            })

            if (this.sortBy == 'price') {
                orderLessons = orderLessons.sort((x, y) => {
                    return x.price - y.price
                })
            }
            if (this.sortBy == 'availability') {
                orderLessons = orderLessons.sort((x, y) => {
                    return x.spaces - y.spaces
                })
            }
            if (this.orderBy !== "ascending") {
                orderLessons.reverse()
            }
            if (this.searchTerm != '' && this.searchTerm) {
                orderLessons = orderLessons.filter((item) => {
                    return item.subject
                        .toUpperCase()
                        .includes(this.searchTerm.toUpperCase())
                })
            }
            return orderLessons
        },
    }
})