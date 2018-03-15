package com.revature.services;

import com.revature.entities.Game;
import com.revature.entities.Player;

public interface GameServiceInterface {

	Game addPlayer(String code, int team, String name);

	Game postCreate(String o);

	Game getResponse(String id);

	boolean postUpdate(String o);

	Player setLeader(Player player);

	boolean updateCell(String code, int team, String name, int cell, int result);

}
