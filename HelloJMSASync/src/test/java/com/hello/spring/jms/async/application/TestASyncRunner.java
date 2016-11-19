package com.hello.spring.jms.async.application;

import static org.junit.Assert.assertEquals;

import java.rmi.RemoteException;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hello.spring.jms.async.constants.Constants;
import com.hello.spring.jms.async.core.Notification;
import com.hello.spring.jms.async.core.NotificationRegistry;
import com.hello.spring.jms.async.sender.ASyncSender;

//In case that more than one xml file needs to be loaded, it can simply be done as follows:
//@ContextConfiguration(locations = {"/file1.xml","/file2.xml"})
@ContextConfiguration(locations = {"/beans.xml"})
@RunWith(SpringJUnit4ClassRunner.class)
public class TestASyncRunner {
	
	@Autowired
	private ASyncSender asyncSender;
	
	@Autowired
	private NotificationRegistry registry;
	
	@Before
	public void prepareTest() {
		registry.clear();
	}
	
	@Test
	public void testAsynchronizedReceiving() throws InterruptedException, RemoteException {
		
		// Create a message
		Notification notification = new Notification("1", "Hello R2-D2!");
		// Send the message
		asyncSender.convertAndSendMessage(Constants.ASYNC_QUEUE, notification);
		
		// Create a message
		notification = new Notification("2", "Hello C-3PO!");		
		// Send the message
		asyncSender.convertAndSendMessage(Constants.ASYNC_QUEUE, notification);
				
		// Halt for 2 seconds before performing the validation.
		// This gives time for the messages from the sender to reach the receiver.
		Thread.sleep(2000);
		
		// Validation
		assertEquals(2, registry.getReceivedNotifications().size());
		assertEquals("Hello R2-D2!", registry.getReceivedNotifications().get(0).getMessage());
		assertEquals("Hello C-3PO!", registry.getReceivedNotifications().get(1).getMessage());
	}

}
