package main.com.revature.entities.dbobjects;

import javax.persistence.*;

/**
 * Functionality:
 */
@Entity
public class Bank {
    @Id
    @Column(name = "BID")
    @SequenceGenerator(name = "bank_seq", sequenceName = "bank_seq")
    @GeneratedValue(generator = "bank_seq", strategy = GenerationType.AUTO)
    private int bid;

    @Column(name = "DIFFICULTY")
    private int difficulty;

    @Column(name = "SUBJECT")
    private String subject;

    public Bank(int id, int difficulty, String subject) {
        this.bid = id;
        this.difficulty = difficulty;
        this.subject = subject;
    }

    public Bank() {
    }

    public int getBid() {
        return bid;
    }

    public void setBid(int bid) {
        this.bid = bid;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
