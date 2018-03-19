package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.entities.Game;
import com.revature.entities.dbobjects.Question;
import com.revature.services.GameServiceInterface;

@Controller
@RestController
@RequestMapping("game")
@CrossOrigin(origins = "http://ec2-18-217-91-70.us-east-2.compute.amazonaws.com:8090")
public class GameController {
	
	@Autowired
	public GameServiceInterface gs;
	
	@GetMapping("get/{id}")
	public Game getById(@PathVariable String id) {return gs.getResponse(id);}
	
	@PostMapping("create")
	public Game createByObject (@RequestBody String o) {return gs.postCreate(o);}
	
	@PostMapping("update")
	public boolean updateObject (@RequestBody String o) {return gs.postUpdate(o);}
	
	@GetMapping("add-player/{code}/{team}/{name}")
	public Game addPlayer(@PathVariable String code, @PathVariable int team, @PathVariable String name) {
		return gs.addPlayer(code, team, name);
	}
	
	@GetMapping("update-cell/{code}/{team}/{name}/{cell}/{result}")
	public boolean updateCell(@PathVariable String code, @PathVariable int team, @PathVariable String name,
			@PathVariable int cell, @PathVariable int result) {
		return gs.updateCell(code, team, name, cell, result);		
	}
}