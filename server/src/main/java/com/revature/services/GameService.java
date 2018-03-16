package com.revature.services;

import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.controllers.SocketControllerInterface;
import com.revature.entities.Game;
import com.revature.entities.Player;
import com.revature.entities.Team;
import com.revature.entities.dbobjects.Instructor;

@Service 
public class GameService implements GameServiceInterface, ApplicationContextAware {
	private ObjectMapper om = new ObjectMapper();	
	private static List<Game> gm = new ArrayList<>();
	@Autowired
	InstructorServiceInterface is;
	@Autowired
	SocketControllerInterface sci;
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
	
	public boolean updateCell(String code, int team, String name, int cell, int result) {
		Game g = findGame(code);
		Team t = g.getTeams().get(team);
		Player p;
		//find player and award points
		for(int j = 0; j < t.getPlayers().size(); j++) {
			if (t.getPlayers().get(j).getName().equals(name)) {
				p = t.getPlayers().get(j);
				p.setPoints(p.getPoints() + result);
				t.getScoreTumbler().add(result);
			}
		}
		//check team score if last member
		boolean flag = false;
		if (t.getScoreTumbler().size() == t.getPlayers().size()) {
			int acc = 0;
			for (int num : t.getScoreTumbler()) {
				acc += num;
			}
			if ( acc > t.getPlayers().size() * 5 / .7) {
				flag = true;
				if ( team == 0) {
					g.getMap().get(cell).setColor("red");
					t.getScoreTumbler().clear();
					sci.toMapTeam0();
				} else {
					g.getMap().get(cell).setColor("blue");
					t.getScoreTumbler().clear();
					sci.toMapTeam1();
				}
			}
			else {
				t.getScoreTumbler().clear();
				if(team == 0) {
					sci.toMapTeam0();
				}
				else {
					sci.toMapTeam1();
				}
			}
		}
		return flag;		
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
