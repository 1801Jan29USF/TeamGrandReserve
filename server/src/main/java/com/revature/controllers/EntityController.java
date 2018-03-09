package com.revature.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.services.GenericService;

//defines crud operations for controllers
@Controller
@RestController
public abstract class EntityController {	
	protected GenericService sp;
	
	@GetMapping("get/{id}")
	public Object getById(@PathVariable String id) {return sp.getResponse(id);}
	
	@PostMapping("create")
	public boolean createByObject (@RequestBody String o) {return sp.postCreate(o);}
	
	@PostMapping("update")
	public boolean updateObject (@RequestBody String o) {return sp.postUpdate(o);}
	
}

