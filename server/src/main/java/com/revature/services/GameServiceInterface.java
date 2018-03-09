package com.revature.services;

import com.revature.entities.Game;

public interface GameServiceInterface {

	boolean addPlayer(String code, int team);

	String postCreate(String o);

	Game getResponse(String id);

	boolean postUpdate(String o);

	boolean selectCell(String code, int team, int cell);

}
