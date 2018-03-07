package com.revature.dao;

import com.revature.entities.dbobjects.Bank;
import org.hibernate.NonUniqueObjectException;
import org.hibernate.ObjectNotFoundException;

/**
 * Functionality:
 */
public interface BankDao {
    //C
    Bank save(Bank b);
    Bank persist(Bank b);
    //R
    Bank getById(int bid);
    Bank loadById(int bid) throws ObjectNotFoundException;
    //U
    void update(Bank b) throws NonUniqueObjectException;
    void merge(Bank b);
}
