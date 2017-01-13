package com.spring.sendemail;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SendEmailRunner {
	
	public static void main(String[] args) {
		  Mail mail = new Mail();
		  mail.setMailFrom("cocolekat@gmail.com");
		  mail.setMailTo("derschwarzekatze@gmail.com");
		  mail.setMailSubject("Subject - Send Email using Spring Velocity Template");
		  mail.setTemplateName("emailTemplate.vm");
		  ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
		  Mailer mailer = (Mailer) context.getBean("mailer");
		  mailer.sendMail(mail);
	}

}
