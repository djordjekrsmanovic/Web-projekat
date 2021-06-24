/**
 * 
 */
var login = new Vue({
	el='#loginForm',
	data: {
		users: null,
		user: {},
		poruka : "zdrao zdrao"
	},
	mounted(){
		axios.get('rest/users')
		.then(response=> (this.users = response.data))
	},
	methods: {
		loginTry : function(event) {
			alert("zdrao")
			var u ={username: user.username, password: user.password}; 
			axios
			.post('rest/login')
			.then(response => alert("response.data"));
		}
	}
})