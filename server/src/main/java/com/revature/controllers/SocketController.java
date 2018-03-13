package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class SocketController {
		
		//delete?
		private final SimpMessagingTemplate template;
		
		@Autowired
		SocketController(SimpMessagingTemplate template){
			this.template = template;
		}
		
		@MessageMapping("/send/player")
		@SendTo("/stomp/player")
		public String onPlayerAdd(String message) {
			System.out.println("in player");
			return message;
		}
		
		@MessageMapping("/send/question")
		@SendTo("/stomp/question")
		public String onRecievedMessage(String message) {
			System.out.println("in question");
			return message;
		}
		
}
