package com.revature.entities;

import com.revature.entities.dbobjects.Instructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.persistence.Entity;

import org.springframework.web.bind.annotation.PathVariable;

/**
 * Functionality:
 */
public class Game {
    private List<Cell> map= new ArrayList<>();
    private Instructor instructor;
    private List<Team> teams = new ArrayList<>();
    private final String code;
    
    public String generateCode() {
    	  
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 4;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(targetStringLength);
        for (int i = 0; i < targetStringLength; i++) {
            int randomLimitedInt = leftLimit + (int) 
              (random.nextFloat() * (rightLimit - leftLimit + 1));
            buffer.append((char) randomLimitedInt);
        }
        String generatedString = buffer.toString();
     
        return generatedString;
    }

    public List<Cell> getMap() {
        return map;
    }

    public void setMap(ArrayList<Cell> map) {
        this.map = map;
    }

    public Instructor getInstructor() {
        return instructor;
    }
    public String getCode() {
        return code;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(ArrayList<Team> teams) {
        this.teams = teams;
    }

	public Game() {
		super();
		this.code = generateCode();
		this.teams.add(new Team());
		this.teams.add(new Team());
		for(int i=0; i<16; i++) {
			this.map.add(new Cell(i));
		}
	}

	@Override
	public String toString() {
		return "Game [map=" + map + ", instructor=" + instructor + ", teams=" + teams + ", code=" + code + "]";
	}
    
}
