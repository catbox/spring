package com.spring.sendemail;

import java.util.HashMap;
import java.util.Map;


//import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.ui.velocity.VelocityEngineUtils;
 
@SuppressWarnings("deprecation")
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
  
    public void sendEmail(final String subject, final String message, final String emailAddress) {
        	MimeMessagePreparator preparator = new MimeMessagePreparator() {
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
                message.setTo(emailAddress);
                message.setFrom(new InternetAddress("cocolekat@gmail.com"));
                User user = new User("Schwarze Katze", "derschwarzekatze@gmail.com");
                Map<String, Object> userModel = new HashMap<String, Object>();
                userModel.put("user", user);
				String text = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine,"emailTemplate2.vm", userModel);
                message.setSubject(subject);
                message.setText(text, true);
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
