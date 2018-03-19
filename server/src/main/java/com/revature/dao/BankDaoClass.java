package com.revature.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.NonUniqueObjectException;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.revature.entities.dbobjects.Bank;
import com.revature.util.SessionUtilInterface;

/**
 * Functionality:
 */
@Repository
public class BankDaoClass implements BankDao{
    private Logger log = Logger.getRootLogger();
    @Autowired
    private SessionUtilInterface su;
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
    public List<Bank> getAll() {
        Session se = su.getSession();
        Criteria c = se.createCriteria(Bank.class);
        List<Bank> bank = c.list();
        System.out.println(bank);
        se.close();
        return bank;
    }

    @Override
    public Bank loadById(int bid) throws ObjectNotFoundException {
        Session se = su.getSession();
        Bank b = (Bank) se.load(Bank.class, bid);
        se.close();
        return b;
    }

    @Override
    public void update(Bank b) throws NonUniqueObjectException {
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        se.update(b);
        tx.commit();
        se.close();
    }

    @Override
    public void merge(Bank b){
        Session se = su.getSession();
        Transaction tx = se.beginTransaction();
        se.merge(b);
        tx.commit();
        se.close();
    }
}
