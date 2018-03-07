package com.revature.services;

//defines crud operations for services
public interface GenericService {
	
	public Object getResponse(String id);
	
	public boolean postCreate(Object toCreate);
	
	public boolean postUpdate(Object toUpdate);
}
