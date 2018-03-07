package com.revature.entities;

import com.revature.entities.dbobjects.Instructor;

import java.util.ArrayList;

/**
 * Functionality:
 */
public class Game {
    private ArrayList<Cell> map;
    private Instructor instructor;
    private ArrayList<Team> teams;

    public ArrayList<Cell> getMap() {
        return map;
    }

    public void setMap(ArrayList<Cell> map) {
        this.map = map;
    }

    public Instructor getInstructor() {
        return instructor;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public ArrayList<Team> getTeams() {
        return teams;
    }

    public void setTeams(ArrayList<Team> teams) {
        this.teams = teams;
    }
}
