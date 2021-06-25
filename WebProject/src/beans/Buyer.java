package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Buyer extends User {
	private UserRole userRole; //vjerovatno nije potrebno jer imamo odvojene entitete
	private List<Order> orders;
	private ShoppingCart shoppingCart;
	private int points;
	private BuyerType buyerType;
	
	public Buyer() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Buyer(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			boolean deleted, boolean banned) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned);
		// TODO Auto-generated constructor stub
		userRole=UserRole.BUYER;
		this.buyerType=new BuyerType();
	}
	public Buyer(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			boolean deleted, boolean banned, List<Order> orders, ShoppingCart shoppingCart, int points) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned);
		this.userRole = UserRole.BUYER;
		this.orders = orders;
		this.shoppingCart = shoppingCart;
		this.points = points;
	}
	
	public Buyer(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			boolean deleted, boolean banned, ShoppingCart shoppingCart, int points) {
		super(username, password, firstName, lastName, gender, birthDate, deleted, banned);
		this.userRole = UserRole.BUYER;
		this.orders = new ArrayList<Order>();
		this.shoppingCart = shoppingCart;
		this.points = points;
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
	public ShoppingCart getShoppingCart() {
		return shoppingCart;
	}
	public void setShoppingCart(ShoppingCart shoppingCart) {
		this.shoppingCart = shoppingCart;
	}
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
	}
	
	
	
}
