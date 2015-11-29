package com.theconnman.micro.domains

class Message {

	String message
	String host
	String clientId
	Date dateCreated

	static constraints = {
		message()
		host()
		clientId()
		dateCreated()
	}
}
