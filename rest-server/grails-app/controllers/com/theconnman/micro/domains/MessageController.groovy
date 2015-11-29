package com.theconnman.micro.domains

import grails.converters.JSON
import grails.rest.RestfulController

class MessageController extends RestfulController {

	MessageController() {
		super(Message)
	}

	def index() {
		render(Message.list() as JSON)
	}

	def save() {
		Message message = createResource()
		message.save(flush: true)
	}

	def show() {
		render(Message.get(params.id) as JSON)
	}
}