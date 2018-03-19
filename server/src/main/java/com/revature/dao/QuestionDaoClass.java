package com.revature.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.NonUniqueObjectException;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.revature.entities.dbobjects.Question;
import com.revature.util.SessionUtil;
import com.revature.util.SessionUtilInterface;

/**
 * Functionality:
 */
@Repository
public class QuestionDaoClass implements QuestionDao{
    private Logger log = Logger.getRootLogger();
    @Autowired
    private SessionUtilInterface su;

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
    public List<Question> getByBid(int bid){
        Session se = su.getSession();
        String hql = "FROM Question WHERE bid.bid = :param_bid ";
//        Integer b = Integer.valueOf(bid);
        Query q = se.createQuery(hql);
        q.setParameter("param_bid", bid);
        List<Question> c = q.list();
        se.close();
        return c;
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
