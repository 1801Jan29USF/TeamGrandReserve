package com.revature.entities;

/**
 * Functionality:
 */
public class Player {
    private String name;
    private int points;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

	public Player() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Player(String name) {
		super();
		this.name = name;
	}
}
