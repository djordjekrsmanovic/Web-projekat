package beans;

import java.util.Date;
import java.util.List;

//porudzbina
public class Order {

	private String id;
	private List<CartItem> products;
	private Restaurant restaurant;
	private Date dateAndTime;
	private double price;
	private String buyerID;
	private OrderStatus status;
	
	
	
	

	


	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Order(String id, List<CartItem> products, Restaurant restaurant, Date dateAndTime, double price,
			String buyerName, OrderStatus status) {
		super();
		this.id = id;
		this.products = products;
		this.restaurant = restaurant;
		this.dateAndTime = dateAndTime;
		this.price = price;
		this.buyerID = buyerName;
		this.status = status;
	}
	
	public Order(String id, List<CartItem> products, Restaurant restaurant, Date dateAndTime,
			String buyerName, OrderStatus status) {
		super();
		this.id = id;
		this.products = products;
		this.restaurant = restaurant;
		this.dateAndTime = dateAndTime;
		this.buyerID = buyerName;
		this.status = status;
		double calculatedPrice=0;
		for (CartItem cartItem:products) {
			calculatedPrice+=cartItem.getAmount()*cartItem.getProduct().getPrice();
		}
		this.price=calculatedPrice;
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


	@Override
	public String toString() {
		return "Order [id=" + id + ", products=" + products + ", restaurant=" + restaurant + ", dateAndTime="
				+ dateAndTime + ", price=" + price + ", buyerID=" + buyerID + ", status=" + status + "]";
	}
	
	
	
}
