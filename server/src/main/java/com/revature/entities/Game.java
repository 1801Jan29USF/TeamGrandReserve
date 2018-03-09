package com.revature.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.revature.dao.BankDao;
import com.revature.dao.QuestionDao;
import com.revature.entities.dbobjects.Bank;
import com.revature.entities.dbobjects.Instructor;

/**
 * Functionality:
 */
@Component("game")
@Scope(value="prototype")
public class Game {
    private List<Cell> map= new ArrayList<>();
    private Instructor instructor;
    private List<Team> teams = new ArrayList<>();
    private final String code;
    private ApplicationContext ac;
    
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
    @Autowired
	public Game(BankDao bd, QuestionDao qd) {
		super();
		this.code = generateCode();
		this.teams.add(new Team());
		this.teams.add(new Team());
		Random random = new Random();
		System.out.println(bd);
		
		List<Bank> bList = bd.getAll();
		int bNum = bList.size();
		for(int i=0; i<25; i++) {
			int r = random.nextInt(bNum);
			this.map.add(new Cell(i, bList.get(r), qd));
		}
	}

	@Override
	public String toString() {
		return "Game [map=" + map + ", instructor=" + instructor + ", teams=" + teams + ", code=" + code + "]";
	}

//	@Override
//	public void setApplicationContext(ApplicationContext arg0) throws BeansException {
//		this.ac = arg0;
//		
//	}
    
}
