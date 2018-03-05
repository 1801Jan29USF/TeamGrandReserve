package main.com.revature.dao;

import main.com.revature.entities.dbobjects.Question;

/**
 * Functionality:
 */
public interface QuestionDao {
    Question save(Question q);
    Question persist(Question q);
    Question getById(int qid);
    Question loadById(int qid);
}
