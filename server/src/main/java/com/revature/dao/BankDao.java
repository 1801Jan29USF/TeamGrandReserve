package com.revature.dao;

import java.util.List;

import org.hibernate.NonUniqueObjectException;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Repository;

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
    List<Bank> getAll();
    Bank loadById(int bid) throws ObjectNotFoundException;
    //U
    void update(Bank b) throws NonUniqueObjectException;
    void merge(Bank b);
}
