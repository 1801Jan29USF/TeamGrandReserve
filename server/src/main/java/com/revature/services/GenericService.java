package com.revature.services;

//defines crud operations for services
public interface GenericService {
	
	public Object getResponse(String id);
	
	public boolean postCreate(String toCreate);
	
	public boolean postUpdate(String toUpdate);

}
