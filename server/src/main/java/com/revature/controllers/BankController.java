package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("bank")
public class BankController extends EntityController{
	
	@Autowired
	private myService myservice; // add the appropriate service
	
	sp = myservice;
}
