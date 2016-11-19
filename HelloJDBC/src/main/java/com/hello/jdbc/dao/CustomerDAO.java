package com.hello.jdbc.dao;

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.hello.jdbc.transter.Customer;

@Component
public class CustomerDAO implements ICustomerDAO {

	private DataSource dataSource;
	private JdbcTemplate jdbcTemplate;
	 
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	@Override
	public List<Customer> getAllCustomers() {
		
		List <Customer> customers = new ArrayList<Customer>();
		String getEmAllQuery = "SELECT * FROM customer";
		jdbcTemplate = new JdbcTemplate(dataSource);
		customers = jdbcTemplate.query(getEmAllQuery, new BeanPropertyRowMapper<Customer>(Customer.class));	
		
		return customers;
	}

}
