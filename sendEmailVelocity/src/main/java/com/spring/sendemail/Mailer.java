package com.spring.sendemail;

import java.io.StringWriter;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
//import org.springframework.mail.MailSender;
//import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

public class Mailer {
	 private JavaMailSender mailSender;
	 private VelocityEngine velocityEngine;

	 public void setMailSender(JavaMailSender mailSender) {
	  this.mailSender = mailSender;
	 }

	 public void setVelocityEngine(VelocityEngine velocityEngine) {
	  this.velocityEngine = velocityEngine;
	 }

	 public void sendMail(Mail mail) {
	  /*
	  SimpleMailMessage message = new SimpleMailMessage();
	  
	  message.setFrom(mail.getMailFrom());
	  message.setTo(mail.getMailTo());
	  message.setSubject(mail.getMailSubject());
	  */
	  Template template = velocityEngine.getTemplate(mail.getTemplateName());

	  VelocityContext velocityContext = new VelocityContext();
	  velocityContext.put("firstName", "Coco");
	  velocityContext.put("lastName", "LeKat");
	  velocityContext.put("location", "Montreal");
	  
	  StringWriter stringWriter = new StringWriter();
	  
	  template.merge(velocityContext, stringWriter);
	  
	  String message = stringWriter.toString();
	  
	  try {
		  MimeMessage mimeMessage = mailSender.createMimeMessage();
		  MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
		  helper.setFrom(mail.getMailFrom());
		  helper.setTo(mail.getMailTo());
		  helper.setSubject(mail.getMailSubject());
		  helper.setText(message);
		  mailSender.send(mimeMessage);		  
	  } 
	  catch(MessagingException ex) {
		System.err.println("ERROR: " + ex.getMessage());
	  }

	 }
}