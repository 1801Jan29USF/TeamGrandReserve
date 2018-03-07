package com.revature.entities;

import com.revature.entities.dbobjects.Question;

import java.util.ArrayList;

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
}
