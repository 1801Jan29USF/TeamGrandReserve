package com.revature.entities;

/**
 * Functionality:
 */
public class Player {
    private String name;
    private int points = 0;
    private boolean isCaptain = false;

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

	public boolean isCaptain() {
		return isCaptain;
	}

	public void setCaptain(boolean isCaptain) {
		this.isCaptain = isCaptain;
	}
}
