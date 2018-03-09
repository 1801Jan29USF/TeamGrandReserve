package com.revature.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.dao.BankDao;
import com.revature.entities.Game;
import com.revature.entities.Player;
import com.revature.entities.dbobjects.Bank;
import com.revature.entities.dbobjects.Instructor;
import com.revature.entities.dbobjects.Question;

@Service 
public class GameService implements GameServiceInterface {
	private ObjectMapper om = new ObjectMapper();	
	private static List<Game> gm = new ArrayList<>();
	@Autowired
	InstructorServiceInterface is;
	
	private Game parseBody(String requestBody) {
		try {
			return om.readValue(requestBody, Game.class);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private Game findGame(String id) {
		for (int i = 0; i < gm.size(); i++) {
			if(gm.get(i).getCode().equals(id)) {
				return gm.get(i);
			}
		}
		return null;
	}


	@Override
	public Game getResponse(String id) {
		System.out.println(findGame(id));
		return findGame(id);
	}


	@Override
	public Game postCreate(String instructor) {
		Game g = new Game();
		g.setInstructor((Instructor) is.getResponse(instructor));
		gm.add(g);
		return g;
	}


	@Override
	public boolean postUpdate(String requestBody) {
		Game g = parseBody(requestBody);
		for (int i = 0; i < gm.size(); i++) {
			if(gm.get(i).getCode().equals(g.getCode())) {
				gm.set(i, g);
				return true;
			}
		}
		return false;
	}
	
	public boolean addPlayer(String id, int team) {
		findGame(id).getTeams().get(team).getPlayers().add(new Player(id));		
		return false;		
	}
	
	public boolean selectCell(String code, int team, int cell) {
		Game g = findGame(code);
		g.getTeams().get(team).setCurrentlySelected(cell);
		return true;
		
	}
	
}
