package com.theconnman.micro.domains

class Message {

	String message
	String host
	Date dateCreated

	static constraints = {
		message()
		host()
		dateCreated()
	}
}
