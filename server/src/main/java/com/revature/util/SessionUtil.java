package com.revature.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

/**
 * Functionality:
 */
public class SessionUtil {
    private static SessionUtil su = new SessionUtil();
    private SessionFactory sf;
    {
        Configuration conf = new Configuration().configure();
        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(conf.getProperties())
                .build();

        sf = conf.buildSessionFactory(serviceRegistry);
    }

    private SessionUtil() {
        super();
    }

    public static SessionUtil getSessionUtil() {
        return su;
    }

    public Session getSession() {
        return sf.openSession();
    }
}
