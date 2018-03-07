package com.revature.dao;

import com.revature.entities.dbobjects.Question;

/**
 * Functionality:
 */
public interface QuestionDao {
    //C
    Question save(Question q);
    Question persist(Question q);
    //R
    Question getById(int qid);
    Question loadById(int qid);

    void update(Question q);
    void merge(Question q);
}
