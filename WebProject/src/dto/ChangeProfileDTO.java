package dto;

import java.util.Date;

import beans.Gender;

public class ChangeProfileDTO {
	public String username;
	public String password;
	public String firstName;
	public String lastName;
	public String gender;
	public String birthDate;
	public String oldUsername;
	public String role;
	
	
	public ChangeProfileDTO() {
		super();
		// TODO Auto-generated constructor stub
	}


	public ChangeProfileDTO(String username, String password, String firstName, String lastName, String gender,
			String birthDate, String oldUsername,String role) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birthDate;
		this.oldUsername = oldUsername;
		this.role=role;
	}


	
	
	
}
