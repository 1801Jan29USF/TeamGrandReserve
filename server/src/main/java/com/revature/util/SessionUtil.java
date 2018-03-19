package com.revature.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.springframework.stereotype.Component;

/**
 * Functionality:
 */
@Component
public class SessionUtil implements SessionUtilInterface{
    private SessionFactory sf;
    {
        Configuration conf = new Configuration().configure();
        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(conf.getProperties())
                .build();

        sf = conf.buildSessionFactory(serviceRegistry);
    }

    public SessionUtil() {
        super();
    }

    public Session getSession() {
        return sf.openSession();
    }
}
