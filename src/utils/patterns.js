export default {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	zipcode: /(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})/,
	password: /^[ A-Za-z0-9_@./#&+-]*$/
}