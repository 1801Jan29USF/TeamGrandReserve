package com.revature.launcher;


import com.revature.dao.QuestionDao;
import com.revature.dao.QuestionDaoClass;
import com.revature.entities.dbobjects.Question;
import com.revature.entities.dbobjects.Bank;
import com.revature.util.SessionUtil;
import com.revature.util.SessionUtilInterface;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Functionality:
 */
public class TestLauncher {
    private static Logger log = Logger.getRootLogger();
    private static QuestionDao qdao = new QuestionDaoClass();
    @Autowired
    private SessionUtilInterface su;

    public static void main(String[] args) {
        //log.warn(qdao.getById(0));
        Bank qb = new Bank(1, 3, "pls");
        Question q = new Question(13, qb, "Why?", "1", "2", "3", "4", 1);
        qdao.save(q);
        log.warn(qdao.getById(13));
    }
}
