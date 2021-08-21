package dto;

public class AdminAddUserDTO {
	/*username:name,password:password,firstName:name,lastName:surname,gender:gender,birthDate:newdate,userType:userType*/
	public String username;
	public String password;
	public String firstName;
	public String lastName;
	public String gender;
	public String birthDate;
	public String userType;
	
	
	public AdminAddUserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}


	public AdminAddUserDTO(String username, String password, String firstName, String lastName, String gender,
			String birtDate, String userType) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birtDate;
		this.userType = userType;
	}
	
	
	
	
	
}
