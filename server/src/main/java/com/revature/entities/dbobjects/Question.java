package com.revature.entities.dbobjects;

import javax.persistence.*;

/**
 * Functionality:
 */
@Entity
public class Question {
    @Id
    @Column(name = "QID")
    @SequenceGenerator(name = "question_seq", sequenceName = "question_seq")
    @GeneratedValue(generator = "question_seq", strategy = GenerationType.AUTO)
    private int qid;


    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "BID")
    private Bank bid;

    @Column(name = "TEXT")
    private String text;

    @Column(name = "OPTION1")
    private String option1;

    @Column(name = "OPTION2")
    private String option2;

    @Column(name = "OPTION3")
    private String option3;

    @Column(name = "OPTION4")
    private String option4;

    @Column(name = "CORRECT")
    private int correct;

    public Question(int qid, Bank bid, String text, String option1, String option2, String option3, String option4, int correct) {
        this.qid = qid;
        this.bid = bid;
        this.text = text;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.correct = correct;
    }

    public Question() {
    }

    public int getQid() {
        return qid;
    }

    public void setQid(int qid) {
        this.qid = qid;
    }

    public Bank getBid() {
        return bid;
    }

    public void setBid(Bank bid) {
        this.bid = bid;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getOption1() {
        return option1;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public String getOption4() {
        return option4;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }
}
