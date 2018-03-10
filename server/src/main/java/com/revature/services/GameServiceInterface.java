package com.revature.services;

import com.revature.entities.Game;

public interface GameServiceInterface {

	Game addPlayer(String code, int team, String name);

	Game postCreate(String o);

	Game getResponse(String id);

	boolean postUpdate(String o);

	boolean selectCell(String code, int team, int cell);

}
