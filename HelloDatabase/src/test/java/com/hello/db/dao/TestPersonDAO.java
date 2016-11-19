package com.hello.db.dao;

import static org.junit.Assert.*;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.hello.db.transter.Person;

public class TestPersonDAO {

	private static PersonDAO personDAO;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		personDAO = new PersonDAO();
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Test
	public void validPersonTest() {
		Person person = new Person("Ged", "T");
		if(personDAO.isValid(person)) {
			assertTrue(true);
		}
		else {
			assertTrue(false);
		}
	}
	
	@Test
	public void validPersonTest2() {
		Person person = new Person("ged", "t");
		if(personDAO.isValid(person)) {
			assertTrue(true);
		}
		else {
			assertTrue(false);
		}
	}
	
	@Test(expected = AssertionError.class)
	public void invalidPersonTest() {
		Person person = new Person("Ged", "TheKat");
		if(personDAO.isValid(person)) {
			assertTrue(true);
		}
		else {
			assertTrue(false);
		}
	}

}
