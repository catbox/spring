package com.hello.jdbc.dao;

import java.util.List;

import com.hello.jdbc.transter.Customer;

public interface ICustomerDAO {
	
	public List<Customer> getAllCustomers();

}
