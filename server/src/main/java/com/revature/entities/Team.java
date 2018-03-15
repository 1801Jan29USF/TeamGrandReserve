package com.revature.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

/**
 * Functionality:
 */
public class Team {
    private List<Player> players = new ArrayList<>();
    private int teamLeader;
    private int points;
    private int currentlySelected;
    private List<Integer> scoreTumbler = new Vector<>();

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(ArrayList<Player> players) {
        this.players = players;
    }

    public int getTeamLeader() {
        return teamLeader;
    }

    public void setTeamLeader(int teamLeader) {
        this.teamLeader = teamLeader;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

	public Team() {
		super();
		this.teamLeader = 0;
		this.points = 0;
	}

	public int getCurrentlySelected() {
		return currentlySelected;
	}

	public void setCurrentlySelected(int currentlySelected) {
		this.currentlySelected = currentlySelected;
	}

	public void setPlayers(List<Player> players) {
		this.players = players;
	}

	public List<Integer> getScoreTumbler() {
		return scoreTumbler;
	}

	public void setScoreTumbler(List<Integer> scoreTumbler) {
		this.scoreTumbler = scoreTumbler;
	}
}
