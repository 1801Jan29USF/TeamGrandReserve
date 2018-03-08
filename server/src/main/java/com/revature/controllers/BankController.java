package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.services.BankServiceInterface;
import com.revature.services.GenericService;

@Controller
@RestController
@RequestMapping("bank")
public class BankController extends EntityController{
	
	@Autowired
	public BankController( BankServiceInterface myService) {	
		this.sp = (GenericService) myService;
	}
}
