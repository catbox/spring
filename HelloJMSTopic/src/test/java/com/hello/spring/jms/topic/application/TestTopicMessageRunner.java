package com.hello.spring.jms.topic.application;

import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hello.spring.jms.topic.core.Notification;
import com.hello.spring.jms.topic.core.NotificationRegistry;
import com.hello.spring.jms.topic.sender.TopicSender;

//In case that more than one xml file needs to be loaded, it can simply be done as follows:
//@ContextConfiguration(locations = {"/file1.xml","/file2.xml"})
@ContextConfiguration(locations = {"/beans.xml"})
@RunWith(SpringJUnit4ClassRunner.class)
public class TestTopicMessageRunner {
	
	@Autowired
	@Qualifier("topicSender")
	private TopicSender topicSender;
	
	@Autowired
	@Qualifier("notificationRegistry")
	private NotificationRegistry registry;
	
	@Before
	public void prepareTest() {
		registry.clear();
	}
	
	@Test
	public void testTopicSending() throws InterruptedException {
		
		// Create a message
		Notification notification = new Notification("R2-D2", "Hello Star World!");
		
		// Send the message
		topicSender.convertAndSendTopic(notification);
		
		// Halt for 2 seconds before performing the validation.
		// This gives time for the messages from the sender to reach the receiver.
		Thread.sleep(2000);
		
		// Validation
		assertEquals(2, registry.getReceivedNotifications().size());
		assertEquals("Hello Star World!", registry.getReceivedNotifications().get(0).getMessage());
		assertEquals("Hello Star World!", registry.getReceivedNotifications().get(1).getMessage());
	}

}
