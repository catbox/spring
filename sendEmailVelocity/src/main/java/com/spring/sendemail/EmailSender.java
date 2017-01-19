package com.spring.sendemail;

import java.io.StringWriter;
//import java.util.HashMap;
//import java.util.Map;



//import javax.mail.Message;
//import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
//import org.springframework.ui.velocity.VelocityEngineUtils;


import com.spring.sendemail.model.Receiver;
import com.spring.sendemail.model.Sender;
 
//@SuppressWarnings("deprecation")
public class EmailSender {
 
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private VelocityEngine velocityEngine;
    
    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    public void setVelocityEngine(VelocityEngine velocityEngine) {
        this.velocityEngine = velocityEngine;
    }
  
    public void sendEmail(final Sender sender, final Receiver receiver) {
        	MimeMessagePreparator preparator = new MimeMessagePreparator() {
            public void prepare(MimeMessage mimeMessage) throws Exception {               

				Template template = velocityEngine.getTemplate("emailTemplate.vm");

				VelocityContext velocityContext = new VelocityContext();
				velocityContext.put("firstName", receiver.getFirstName());
				velocityContext.put("lastName", receiver.getLastName());
				velocityContext.put("emailAddress", receiver.getEmailAddress());
				  
				StringWriter stringWriter = new StringWriter();
				  
				template.merge(velocityContext, stringWriter);
				  
				String messageContent = stringWriter.toString();
				
				MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
	            message.setTo(sender.getEmailAddressDestination());
	            message.setFrom(sender.getEmailAddress());
                message.setSubject(sender.getEmailSubject());
                message.setText(messageContent, true);
            }
        };
        try {
            mailSender.send(preparator);
            System.out.println("Email sent successfully.");
        } 
        catch(Exception ex) {
            System.err.println("ERROR: " + ex.getMessage());
        }
    }  
}
