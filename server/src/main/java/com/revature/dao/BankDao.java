package com.revature.dao;

import com.revature.entities.dbobjects.Bank;

/**
 * Functionality:
 */
public interface BankDao {
    //C
    Bank save(Bank b);
    Bank persist(Bank b);
    //R
    Bank getById(int bid);
    Bank loadById(int bid);
    //U
    void update(Bank b);
    void merge(Bank b);
}
