package com.theconnman.micro.interceptors

class RestInterceptor {

	RestInterceptor() {
		match(controller: "message")
	}

	boolean before() {
		header("Access-Control-Allow-Origin", "*")
		header("Access-Control-Allow-Credentials", "true")
		header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
		header("Access-Control-Max-Age", "3600")
		true
	}

	boolean after() {
		true
	}
}
