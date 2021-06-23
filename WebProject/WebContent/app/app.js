var app = new Vue({
	el: '#products',
	data: {
		products: null,
		title: "Primer Vue.js tehnologije na spisku proizvoda",
		mode: "BROWSE",
		selectedProduct: {},
		error: ''
	},
	mounted() {
		axios.get('rest/products')
			.then(response => (this.products = response.data))
	},
	methods: {
		showForm: function () {
			this.mode = 'CREATE'
			this.selectedProduct = { id: '', name: null, price: null }
		},
		createProduct: function (event) {
			this.error = ""
			if (!this.selectedProduct.name || !this.selectedProduct.price) {
				this.error = "Unesite naziv i cenu";
				event.preventDefault();
				return;
			}
			if (this.mode == 'CREATE') {
				axios.post('rest/products', this.selectedProduct)
					.then((response) => {
						alert('Novi proizvod uspešno kreiran')
						this.mode = 'BROWSE'
						this.products.push(response.data)
					})

			}

			event.preventDefault();
		}
	}
});
