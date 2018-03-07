package com.revature.entities;

import java.util.ArrayList;

/**
 * Functionality:
 */
public class Team {
    private ArrayList<Player> players;
    private int teamLeader;
    private int points;

    public ArrayList<Player> getPlayers() {
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
}
