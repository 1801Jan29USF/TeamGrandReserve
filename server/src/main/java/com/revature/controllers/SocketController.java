package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;

import com.revature.entities.Player;
import com.revature.services.GameServiceInterface;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class SocketController implements SocketControllerInterface{
		
		//delete?
		private final SimpMessagingTemplate template;
		
		@Autowired
		SocketController(SimpMessagingTemplate template){
			this.template = template;
		}
		
		@Autowired
		GameServiceInterface gs;
		
		@MessageMapping("/send/player")
		@SendTo("/stomp/player")
		public String onPlayerAdd(String message) {
			System.out.println("in player");
			return message;
		}
		
		@MessageMapping("/send/question")
		@SendTo("/stomp/question")
		public String toQuestion(String message) {
			System.out.println("in question");
			return message;
		}
		
		@MessageMapping("/send/map")
		@SendTo("/stomp/map")
		public String toMap(String message) {
			System.out.println("in map");
			return message;
		}
		
		@MessageMapping("/send/end")
		@SendTo("/stomp/end")
		public String toEnd(String message) {
			System.out.println("in end");
			return message;
		}
		
		@MessageMapping("/send/leader")
		@SendTo("/stomp/leader")
		@ResponseBody
		public Player onSetLeader(Player player) {
			System.out.println("in leader");
			return gs.setLeader(player);
		}
		
		@SendTo("/stomp/waiting-red")
		public int toMapTeam0() {
			System.out.println("in red");
			return 0;
		}
		
		@SendTo("/stomp/waiting-blue")
		public int toMapTeam1() {
			System.out.println("in blue");
			return 1;
		}
		
}
