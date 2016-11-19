package com.hello.jdbc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.hello.jdbc.dao.CustomerDAO;
import com.hello.jdbc.transter.Customer;

@Controller
public class HelloJDBCController {

	@Autowired
	private CustomerDAO customerDAO;
	
	/** load the home page **/
	@RequestMapping(value = "/", method = RequestMethod.GET)
    public String loadHomePage(Model model) {
		List<Customer> customerList = customerDAO.getAllCustomers();
		model.addAttribute("listOfCustomers", customerList);
		return "home";
    }
}
