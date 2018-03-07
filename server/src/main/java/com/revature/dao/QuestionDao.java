package com.revature.dao;

import com.revature.entities.dbobjects.Question;
import org.hibernate.NonUniqueObjectException;
import org.hibernate.ObjectNotFoundException;

/**
 * Functionality:
 */
public interface QuestionDao {
    //C
    Question save(Question q);
    Question persist(Question q);
    //R
    Question getById(int qid);
    Question loadById(int qid) throws ObjectNotFoundException;

    void update(Question q) throws NonUniqueObjectException;
    void merge(Question q);
}
