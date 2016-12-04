package com.hellocropit.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.hellocropit.model.ProfileImage;

@Component("profilePictureValidator")
public class ProfilePictureValidator implements Validator {

	@Override
	public boolean supports(Class<?> parameterClass) {
		return ProfileImage.class.equals(parameterClass);
	}

	@Override
	public void validate(Object object, Errors errors) {
		ProfileImage profileImage = (ProfileImage)object;

		if(profileImage.getSize() == 0) {
			System.out.println("profilePicture size: " + profileImage.getSize());
			errors.reject("IMG_ERR_0");
		}
		else {
			System.out.println("profilePicture size: " + profileImage.getSize());
		}

	}
	
}
