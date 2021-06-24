/**
 * 
 */
var login = new Vue({
	el='#loginForm',
	data: {
		users: null,
		user: {}
	},
	mounted(){
		axios.get('rest/users')
		.then(response=> (this.users = response.data))
	},
	methods: {
		loginTry : function() {
			var u ={username: user.username, password: user.password}; 
			axios
			.post('rest/login')
			.then(response => alert("response.data"));
		}
	}
})