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
    public Question loadById(int qid){
        Session se = su.getSession();
        Question q = (Question) se.load(Question.class, qid);
        log.info(q.getBid());
        se.close();
        return q;
    }

    @Override
    public void update(Question q) {
        Session se = su.getSession();
        se.update(q);
        se.close();
    }

    @Override
    public void merge(Question q) {
        Session se = su.getSession();
        se.merge(q);
        se.close();
    }
}
