package com.revature.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.dao.BankDao;
import com.revature.entities.dbobjects.Bank;
import com.revature.entities.dbobjects.Question;

@Service 
public class BankService implements BankServiceInterface{
	private ObjectMapper om = new ObjectMapper();	
	@Autowired
	private BankDao dao;
	
	private Bank parseBody(String requestBody) {
		try {
			return om.readValue(requestBody, Bank.class);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Object getResponse(String id) {
		return dao.getById(Integer.parseInt(id));
	}

	@Override
	public boolean postCreate(String toCreate) {
		try {
			dao.save(parseBody(toCreate));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean postUpdate(String toUpdate) {
		try {
			dao.update(parseBody(toUpdate));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
