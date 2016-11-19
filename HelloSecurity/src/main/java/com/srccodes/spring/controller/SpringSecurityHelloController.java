package com.srccodes.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SpringSecurityHelloController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String accessPublicPage(Model model) {
		model.addAttribute("message", "This page is publicly accessible. No authentication is required to view.");

		return "public";
	}
	
	@RequestMapping(value = "/secured/mypage", method = RequestMethod.GET)
	public String accessSecuredPage(Model model) {
		model.addAttribute("message", "Only you are authenticated and authorized to view this page.");

		return "/secured/mypage";
	}
}
