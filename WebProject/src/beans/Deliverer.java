package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Deliverer extends User {
	private UserRole userRole;
	private List<Order> oredersWaitingForDelivery;
	
	public Deliverer() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Deliverer(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			boolean deleted, boolean banned) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned);
		this.userRole=UserRole.DELIVERER;
		this.oredersWaitingForDelivery=new ArrayList<Order>();
	}
	public Deliverer(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			boolean deleted, boolean banned,UserRole userRole) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned);
		this.userRole = userRole;
		this.oredersWaitingForDelivery = new ArrayList<Order>();
	}
	public UserRole getUserRole() {
		return userRole;
	}
	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}
	public List<Order> getOredersWaitingForDelivery() {
		return oredersWaitingForDelivery;
	}
	public void setOredersWaitingForDelivery(List<Order> oredersWaitingForDelivery) {
		this.oredersWaitingForDelivery = oredersWaitingForDelivery;
	}
	
	
	
	
}
