package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.services.GenericService;
import com.revature.services.QuestionServiceInterface;

@Controller
@RestController
@RequestMapping("question")
public class QuestionController extends EntityController{
	
	@Autowired
	public QuestionController( QuestionServiceInterface myService) {	
		this.sp = myService;
	}
}
