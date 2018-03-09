package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.services.GenericService;
import com.revature.services.InstructorServiceInterface;

@Controller
@RestController
@RequestMapping("instructor")
@CrossOrigin(origins = "http://localhost:4200")
public class InstructorController extends EntityController{
	
	@Autowired
	public InstructorController( InstructorServiceInterface myService) {	
		this.sp = myService;
	}
}
