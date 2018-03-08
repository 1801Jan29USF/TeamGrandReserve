package com.revature.dao;

import org.apache.log4j.Logger;
import org.hibernate.NonUniqueObjectException;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.revature.entities.dbobjects.Question;
import com.revature.util.SessionUtil;

/**
 * Functionality:
 */
@Repository
public class QuestionDaoClass implements QuestionDao{
    private Logger log = Logger.getRootLogger();
    private SessionUtil su = SessionUtil.getSessionUtil();

    public Question save(Question q){
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        int id = (int) se.save(q);
        log.info(id);
        tx.commit();
        se.close();
        return q;
    }
    public Question persist(Question q){
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        se.persist(q);
        log.info(q.getQid());
        //q.setCorrect(2);
        tx.commit();
        se.close();
        return q;
    }
    public Question getById(int qid){
        Session se = su.getSession();
        Question q = (Question) se.get(Question.class, qid);
        se.close();
        return q;
    }
    public Question loadById(int qid) throws ObjectNotFoundException {
        Session se = su.getSession();
        Question q = (Question) se.load(Question.class, qid);
        log.info(q.getBid());
        se.close();
        return q;
    }

    @Override
    public void update(Question q) throws NonUniqueObjectException {
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        se.update(q);
        tx.commit();
        se.close();
    }

    @Override
    public void merge(Question q) {
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        se.merge(q);
        tx.commit();
        se.close();
    }
}
