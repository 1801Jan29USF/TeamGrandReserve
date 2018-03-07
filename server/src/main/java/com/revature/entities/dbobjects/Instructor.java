package com.revature.entities.dbobjects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Functionality:
 */
@Entity
public class Instructor {
    @Id
    @Column(name = "UNAME")
    private String uname;

    @Column(name = "PASSW")
    private String passw;

    public Instructor(String uname, String passw) {
        this.uname = uname;
        this.passw = passw;
    }

    public Instructor() {
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getPassw() {
        return passw;
    }

    public void setPassw(String passw) {
        this.passw = passw;
    }
}
