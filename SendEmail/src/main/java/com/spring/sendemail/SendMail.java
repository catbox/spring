package com.spring.sendemail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service("mailService")
public class SendMail {
	
	@Autowired
    private MailSender mailSender;
 
    /**
     * This method will send compose and send the message 
     * */
    public boolean sendMail(String to, String subject, String body) 
    {
    	try {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(to);
	        message.setSubject(subject);
	        message.setText(body);
	        mailSender.send(message);
	        return true;
    	}
    	catch(MailException mailException) {
    		System.err.println("ERROR: " + mailException.getMessage());
    		return false;
    	}
    }
}
