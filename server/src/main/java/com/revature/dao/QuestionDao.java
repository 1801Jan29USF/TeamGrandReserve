package com.revature.dao;

import com.revature.entities.dbobjects.Question;

import java.util.List;

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
    List<Question> getByBid(int bid);
    Question loadById(int qid) throws ObjectNotFoundException;

    void update(Question q) throws NonUniqueObjectException;
    void merge(Question q);
}
