package com.revature.dao;

import com.revature.entities.dbobjects.Instructor;
import org.hibernate.NonUniqueObjectException;
import org.hibernate.ObjectNotFoundException;

/**
 * Functionality:
 */
public interface InstructorDao {
    //C
    Instructor save(Instructor i);
    Instructor persist(Instructor i);
    //R
    Instructor getByUsername(String username);
    Instructor loadByUsername(String username) throws ObjectNotFoundException;
    //U
    void update(Instructor i) throws NonUniqueObjectException;
    void merge(Instructor i);
}
