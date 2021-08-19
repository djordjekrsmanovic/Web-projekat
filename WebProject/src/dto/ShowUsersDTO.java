package dto;

import beans.UserRole;

public class ShowUsersDTO {
	public String username;
	public String password;
	public String firstName;
	public String lastName;
	public UserRole userRole;
	public boolean banned;
	public ShowUsersDTO(String username, String password, String firstName, String lastName, UserRole userRole,boolean banned) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.userRole = userRole;
		this.banned=banned;
	}
	
	
}
