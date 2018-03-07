package com.revature.dao;

import com.revature.entities.dbobjects.Question;
import com.revature.util.SessionUtil;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 * Functionality:
 */
public class QuestionDaoClass implements QuestionDao{
    private Logger log = Logger.getRootLogger();
    private SessionUtil su = SessionUtil.getSessionUtil();

    public Question save(Question q){
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        //int id = (int) se.save(q);
        //log.warn(id);
        q.setCorrect(2);
        tx.commit();
        se.close();
        return q;
    }
    public Question persist(Question q){
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        se.persist(q);
        log.warn(q.getQid());
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
    public Question loadById(int qid){
        Session se = su.getSession();
        Question q = (Question) se.load(Question.class, qid);
        log.trace(q.getBid());
        se.close();
        return q;
    }
}
