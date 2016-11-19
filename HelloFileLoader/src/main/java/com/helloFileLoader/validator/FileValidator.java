package com.helloFileLoader.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
 
import com.helloFileLoader.model.File;

@Component("fileValidator")
public class FileValidator implements Validator {
	
	@Override
	public boolean supports(Class<?> paramClass) {
		return File.class.equals(paramClass);
	}

	@Override
	public void validate(Object object, Errors errors) {
		File file = (File)object;
		if(file.getFile().getSize() == 0) {
		   errors.rejectValue("file", "valid.file");
		}
	}
	
}