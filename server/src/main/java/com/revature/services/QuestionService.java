package com.revature.services;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.dao.QuestionDao;
import com.revature.entities.dbobjects.Question;

@Service
public class QuestionService implements QuestionServiceInterface, GenericService {
	private ObjectMapper om = new ObjectMapper();
	@Autowired
	private QuestionDao dao;
	
	private Question parseBody(String requestBody) {
		try {
			return om.readValue(requestBody, Question.class);
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
