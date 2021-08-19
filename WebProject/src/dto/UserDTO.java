package dto;

import java.util.Date;

import beans.Gender;

public class UserDTO {
	public String username;
	public String password;
	public String firstName;
	public String lastName;
	public String gender;
	public String birthDate;
	
	public UserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserDTO(String username, String password, String firstName, String lastName, String gender,
			String birthDate) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birthDate;
	}
	
}
