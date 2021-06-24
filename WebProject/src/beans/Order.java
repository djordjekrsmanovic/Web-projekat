package beans;

import java.util.Date;
import java.util.List;

//porudzbina
public class Order {

	private int id;
	private List<Product> products;
	private Restaurant restaurant;
	private Date dateAndTime;
	private long price;
	private String buyerName;
	private OrderStatus status;
	
	
	public Order(int id, List<Product> products, Restaurant restaurant, Date dateAndTime, long price, String buyerName, OrderStatus status) {
		super();
		this.id = id;
		this.products = products;
		this.restaurant=restaurant;
		this.dateAndTime = dateAndTime;
		this.price = price;
		this.buyerName = buyerName;
		this.status = status;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public List<Product> getProducts() {
		return products;
	}


	public void setProducts(List<Product> products) {
		this.products = products;
	}


	public Date getDateAndTime() {
		return dateAndTime;
	}


	public void setDateAndTime(Date dateAndTime) {
		this.dateAndTime = dateAndTime;
	}


	public long getPrice() {
		return price;
	}


	public void setPrice(long price) {
		this.price = price;
	}


	public String getBuyerName() {
		return buyerName;
	}


	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
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
	
	
	
}
