package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Buyer extends User {
	private UserRole userRole; //vjerovatno nije potrebno jer imamo odvojene entitete
	private List<Order> orders;
	private int points;
	private BuyerType buyerType;
	
	public Buyer() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Buyer(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			boolean deleted, boolean banned) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned,UserRole.BUYER);
		// TODO Auto-generated constructor stub
		userRole=UserRole.BUYER;
		this.buyerType=new BuyerType();
	}
	public Buyer(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			boolean deleted, boolean banned, List<Order> orders, int points) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned,UserRole.BUYER);
		this.userRole = UserRole.BUYER;
		this.orders = orders;
		this.points = points;
		this.buyerType=new BuyerType();
		
	}
	
	public Buyer(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			boolean deleted, boolean banned, int points) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned,UserRole.BUYER);
		this.userRole = UserRole.BUYER;
		this.orders = new ArrayList<Order>();
		this.points = points;
		this.buyerType=new BuyerType();
	}
	public UserRole getRole() {
		return userRole;
	}
	public void setRole(UserRole role) {
		this.userRole = role;
	}
	public List<Order> getOrders() {
		return orders;
	}
	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}
	
	
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
		
	}
	
	public void earnPoints(int points) {
		this.points+=points;
		buyerType.recalculateRank(this.points);
	}
	
	
	
	@Override
	public String toString() {
		return "Buyer [userRole=" + userRole + ", orders=" + orders + ", points=" + points + ", buyerType=" + buyerType
				+ ", getUsername()=" + getUsername() + ", getPassword()=" + getPassword() + ", getFirstName()="
				+ getFirstName() + ", getLastName()=" + getLastName() + ", getGender()=" + getGender()
				+ ", getBirthDate()=" + getBirthDate() + ", isDeleted()=" + isDeleted() + ", isBanned()=" + isBanned()
				+ ", toString()=" + super.toString() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ "]";
	}
	public UserRole getUserRole() {
		return userRole;
	}
	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}
	public BuyerType getBuyerType() {
		return buyerType;
	}
	public void setBuyerType(BuyerType buyerType) {
		this.buyerType = buyerType;
	}
	
	
	
}
