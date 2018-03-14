package com.revature.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;
import org.springframework.web.context.support.XmlWebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.controllers.GameController;
import com.revature.entities.Game;
import com.revature.entities.Player;
import com.revature.entities.dbobjects.Instructor;

@Service 
public class GameService implements GameServiceInterface, ApplicationContextAware {
	private ObjectMapper om = new ObjectMapper();	
	private static List<Game> gm = new ArrayList<>();
	@Autowired
	InstructorServiceInterface is;
	private ApplicationContext ac;
	
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
		Game g = (Game) ac.getBean("game");
		g.setInstructor(new Instructor(instructor, null));
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
	
	public Game addPlayer(String code, int team, String name) {
		Game g = findGame(code);
		g.getTeams().get(team).getPlayers().add(new Player(name));		
		return g;		
	}
	
	public boolean selectCell(String code, int team, int cell) {
		Game g = findGame(code);
		g.getTeams().get(team).setCurrentlySelected(cell);	
		return true;		
	}
	
	public Player setLeader(Player player) {
		Player p = new Player();
		for(int i = 0; i < GameService.gm.get(0).getTeams().size(); i++) {
			for(int j = 0; j < GameService.gm.get(0).getTeams().get(i).getPlayers().size(); j++) {
				if( GameService.gm.get(0).getTeams().get(i).getPlayers().get(j).getName().equals(player.getName())) {
					GameService.gm.get(0).getTeams().get(i).getPlayers().get(j).setCaptain(true);
					GameService.gm.get(0).getTeams().get(i).setTeamLeader(j);
					p = GameService.gm.get(0).getTeams().get(i).getPlayers().get(j);
					p.setPoints(i);
				} else {
					GameService.gm.get(0).getTeams().get(i).getPlayers().get(j).setCaptain(false);
				}
			}
		}
		return p;
	}

	@Override
	public void setApplicationContext(ApplicationContext arg0) throws BeansException {
		this.ac = arg0;
		
	}
	
}
