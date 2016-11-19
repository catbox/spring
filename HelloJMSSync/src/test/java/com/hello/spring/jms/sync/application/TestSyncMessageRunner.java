package com.hello.spring.jms.sync.application;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.rmi.RemoteException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hello.spring.jms.sync.core.Notification;
import com.hello.spring.jms.sync.receiver.SyncReceiver;
import com.hello.spring.jms.sync.sender.SyncSender;

//In case that more than one xml file needs to be loaded, it can simply be done as follows:
//@ContextConfiguration(locations = {"/file1.xml","/file2.xml"})
@ContextConfiguration(locations = {"/beans.xml"})
@RunWith(SpringJUnit4ClassRunner.class)
public class TestSyncMessageRunner {

	@Autowired
	private SyncSender syncSender;
	
	@Autowired
	private SyncReceiver syncReceiver;
	
	@Test
	public void testSynchronizedReceiving() throws InterruptedException, RemoteException {
		
		// Create the notification
		Notification notification = new Notification("R2-D2", "Hello Star World!");
		
		// Send the notification
		syncSender.convertAndSendMessage(notification);
		
		// Receive the notification
		Notification receivedNotification = syncReceiver.receive();
		
		// Halt for 2 seconds before performing the validation.
		// This gives time for the messages from the sender to reach the receiver.
		Thread.sleep(2000);
				
		// Validation
		assertNotNull(receivedNotification);
		assertEquals("Hello Star World!", receivedNotification.getMessage());
	}

}
