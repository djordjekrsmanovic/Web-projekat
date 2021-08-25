package beans;

import java.util.Date;

public class Manager extends User{
	private Restaurant restaurant;
	private UserRole userRole;
	public Manager() {
		super();
		// TODO Auto-generated constructor stub
		userRole=UserRole.MANAGER;
	}
	public Manager(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			boolean deleted, boolean banned) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned,UserRole.MANAGER);
		// TODO Auto-generated constructor stub
		userRole=UserRole.MANAGER;
	}
	public Manager(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			boolean deleted, boolean banned,Restaurant restaurant) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned,UserRole.MANAGER);
		this.restaurant = restaurant;
		this.userRole = UserRole.MANAGER;
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	public UserRole getUserRole() {
		return userRole;
	}
	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}
	@Override
	public String toString() {
		return "Manager [restaurant=" + restaurant + ", userRole=" + userRole + "]";
	}
	
	
	
	
	
	
}
