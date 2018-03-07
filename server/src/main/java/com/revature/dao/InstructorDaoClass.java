package com.revature.dao;

import com.revature.entities.dbobjects.Instructor;
import com.revature.util.SessionUtil;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 * Functionality:
 */
public class InstructorDaoClass implements InstructorDao {
    private Logger log = Logger.getRootLogger();
    private SessionUtil su = SessionUtil.getSessionUtil();
    @Override
    public Instructor save(Instructor i) {
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        String uname = (String)se.save(i);
        log.info(uname);
        tx.commit();
        se.close();
        return i;
    }

    @Override
    public Instructor persist(Instructor i) {
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        se.persist(i);
        log.info(i.getUname());
        tx.commit();
        se.close();
        return i;
    }

    @Override
    public Instructor getByUsername(String username) {
        Session se = su.getSession();
        Instructor b = (Instructor) se.get(Instructor.class, username);
        se.close();
        return b;
    }

    @Override
    public Instructor loadByUsername(String username) {
        Session se = su.getSession();
        Instructor b = (Instructor) se.load(Instructor.class, username);
        se.close();
        return b;
    }

    @Override
    public void update(Instructor i) {
        Session se = su.getSession();
        se.update(i);
        se.close();
    }

    @Override
    public void merge(Instructor i) {
        Session se = su.getSession();
        se.merge(i);
        se.close();
    }
}
