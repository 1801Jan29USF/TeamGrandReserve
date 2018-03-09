package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.revature.services.GameServiceInterface;

@Controller
@RestController
@RequestMapping("game")
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {
	
	@Autowired
	public GameServiceInterface gs;
	
	@GetMapping("get/{id}")
	public Game getById(@PathVariable String id) {return gs.getResponse(id);}
	
	@PostMapping("create")
	public Game createByObject (@RequestBody String o) {return gs.postCreate(o);}
	
	@PostMapping("update")
	public boolean updateObject (@RequestBody String o) {return gs.postUpdate(o);}
	
	@PutMapping("add-player/{code}/{team}")
	public boolean addPlayer(@PathVariable String code, @PathVariable int team) {
		return gs.addPlayer(code, team);
	}
	
	@PutMapping("select-cell/{code}/{team}/{cell}")
	public boolean selectCell(@PathVariable String code, @PathVariable int team, @PathVariable int cell) {
		return gs.selectCell(code, team, cell);		
	}
}