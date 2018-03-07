package com.revature.dao;

import com.revature.entities.dbobjects.Bank;
import com.revature.util.SessionUtil;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 * Functionality:
 */
public class BankDaoClass implements BankDao{
    private Logger log = Logger.getRootLogger();
    private SessionUtil su = SessionUtil.getSessionUtil();
    @Override
    public Bank save(Bank b) {
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        int bid = (int)se.save(b);
        log.info(bid);
        tx.commit();
        se.close();
        return b;
    }

    @Override
    public Bank persist(Bank b) {
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        se.persist(b);
        log.info(b.getBid());
        tx.commit();
        se.close();
        return b;
    }

    @Override
    public Bank getById(int bid) {
        Session se = su.getSession();
        Bank b = (Bank) se.get(Bank.class, bid);
        se.close();
        return b;
    }

    @Override
    public Bank loadById(int bid) {
        Session se = su.getSession();
        Bank b = (Bank) se.load(Bank.class, bid);
        se.close();
        return b;
    }
}
