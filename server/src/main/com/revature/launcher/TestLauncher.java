package main.com.revature.launcher;


import main.com.revature.dao.QuestionDao;
import main.com.revature.dao.QuestionDaoClass;
import main.com.revature.entities.dbobjects.Question;
import main.com.revature.entities.dbobjects.Bank;
import main.com.revature.util.SessionUtil;
import org.apache.log4j.Logger;

/**
 * Functionality:
 */
public class TestLauncher {
    private static Logger log = Logger.getRootLogger();
    private static QuestionDao qdao = new QuestionDaoClass();
    private static SessionUtil su = SessionUtil.getSessionUtil();

    public static void main(String[] args) {
        //log.warn(qdao.getById(0));
        Bank qb = new Bank(1, 3, "pls");
        Question q = new Question(13, qb, "Why?", "1", "2", "3", "4", 1);
        qdao.save(q);
        log.warn(qdao.getById(13));
    }
}
