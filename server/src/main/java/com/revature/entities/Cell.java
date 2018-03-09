package com.revature.entities;

import com.revature.entities.dbobjects.Question;

import java.util.ArrayList;
import java.util.Random;

/**
 * Functionality:
 */
public class Cell {
	private int cid;
	private int value;
	private String color;
	private ArrayList<Question> questionSet;

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

	public ArrayList<Question> getQuestionSet() {
		return questionSet;
	}

	public void setQuestionSet(ArrayList<Question> questionSet) {
		this.questionSet = questionSet;
	}

	public Cell() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Cell(int cid) {
		super();
		this.cid = cid;
		Random random = new Random();
		this.value = (random.nextInt(9) + 1);
		switch (cid) {
		case 1:
		case 2:
		case 6:
			this.color = "red";
			break;
		case 20:
		case 24:
		case 25:
			this.color = "blue";
			break;
		default:
			this.color = "white";
			break;
		}
		this.questionSet = getQuestions(this.value);
	}

	private ArrayList<Question> getQuestions(int value) {

		return null;

	}
}
