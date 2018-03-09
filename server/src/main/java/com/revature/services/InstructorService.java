package com.revature.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.dao.InstructorDao;
import com.revature.entities.dbobjects.Bank;
import com.revature.entities.dbobjects.Instructor;

@Service
public class InstructorService implements InstructorServiceInterface {
	private ObjectMapper om = new ObjectMapper();
	@Autowired
	private InstructorDao dao;
	
	private Instructor parseBody(String requestBody) {
		try {
			return om.readValue(requestBody, Instructor.class);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Instructor getResponse(String id) {
		return dao.getByUsername(id);
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
