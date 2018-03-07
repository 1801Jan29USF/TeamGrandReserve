package com.revature.dao;

import com.revature.entities.dbobjects.Instructor;

/**
 * Functionality:
 */
public interface InstructorDao {
    //C
    Instructor save(Instructor i);
    Instructor persist(Instructor i);
    //R
    Instructor getByUsername(String username);
    Instructor loadByUsername(String username);
    //U
    void update(Instructor i);
    void merge(Instructor i);
}
