package beans;

import java.util.Date;

public class Administrator extends User {
	private UserRole userRole;

	public Administrator() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Administrator(String username, String password, String firstName, String lastName, Gender gender,
			Date birthDate, boolean deleted, boolean banned) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned);
		this.setUserRole(UserRole.ADMIN);
	}

	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	
	
	
}
