package com.revature.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.revature.dao.QuestionDao;
import com.revature.entities.dbobjects.Bank;
import com.revature.entities.dbobjects.Question;

/**
 * Functionality:
 */
@Component("cell")
@Scope(value="prototype")
public class Cell {
	private int cid;
	private int value;
	private int diffictulty;
	private String subject;
	private String color;
	private List<Question> questionSet;

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public List<Question> getQuestionSet() {
		return questionSet;
	}

	public void setQuestionSet(ArrayList<Question> questionSet) {
		this.questionSet = questionSet;
	}

	public Cell() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Cell(int cid, Bank bank, QuestionDao qd) {
		super();
		this.cid = cid;
		Random random = new Random();
		this.value = (random.nextInt(9) + 1);
		switch (cid) {
		case 0:
		case 1:
		case 5:
			this.color = "red";
			break;
		case 19:
		case 23:
		case 24:
			this.color = "blue";
			break;
		default:
			this.color = "white";
			this.questionSet = qd.getByBid(bank.getBid());
			this.diffictulty = bank.getDifficulty();
			this.subject = bank.getSubject();
			break;
		}
		
	}
}
