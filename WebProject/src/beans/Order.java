package beans;

import java.util.Date;
import java.util.List;
import java.util.UUID;

//porudzbina
public class Order {

	final int ID_LENGTH = 10;
	private String id;
	private List<CartItem> products;
	private Restaurant restaurant;
	private Date dateAndTime;
	private double price;
	private String buyerID;
	private OrderStatus status;
	private boolean reviewed;

	public Order() {
		super();
		this.id = UUID.randomUUID().toString().replace("-", "").substring(0, ID_LENGTH);
		this.reviewed=false;
	}

	public Order(List<CartItem> products, Restaurant restaurant, Date dateAndTime, double price, String buyerName,
			OrderStatus status) {
		super();
		this.id = UUID.randomUUID().toString().replace("-", "").substring(0, ID_LENGTH);
		this.products = products;
		this.restaurant = restaurant;
		this.dateAndTime = dateAndTime;
		this.price = price;
		this.buyerID = buyerName;
		this.reviewed=false;
		this.status = status;
	}

	public Order(String id, List<CartItem> products, Restaurant restaurant, Date dateAndTime, String buyerName,
			OrderStatus status) {
		super();
		this.id = id;
		this.products = products;
		this.restaurant = restaurant;
		this.dateAndTime = dateAndTime;
		this.buyerID = buyerName;
		this.status = status;
		double calculatedPrice = 0;
		for (CartItem cartItem : products) {
			calculatedPrice += cartItem.getAmount() * cartItem.getProduct().getPrice();
		}
		this.price = calculatedPrice;
		this.reviewed=false;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<CartItem> getProducts() {
		return products;
	}

	public void setProducts(List<CartItem> products) {
		this.products = products;
	}

	public Date getDateAndTime() {
		return dateAndTime;
	}

	public void setDateAndTime(Date dateAndTime) {
		this.dateAndTime = dateAndTime;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getBuyerName() {
		return buyerID;
	}

	public void setBuyerName(String buyerName) {
		this.buyerID = buyerName;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	
	

	public boolean isReviewed() {
		return reviewed;
	}

	public void setReviewed(boolean reviewed) {
		this.reviewed = reviewed;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", products=" + products + ", restaurant=" + restaurant + ", dateAndTime="
				+ dateAndTime + ", price=" + price + ", buyerID=" + buyerID + ", status=" + status + "]";
	}

}

	

