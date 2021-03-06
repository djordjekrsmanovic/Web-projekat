package beans;

import java.util.ArrayList;
import java.util.List;

public class Restaurant {
	private String name;
	private RestaurantType restaurantType;
	private List<Product> products;
	private RestaurantStatus restaurantStatus;
	private Location location;
	private String picturePath;//neka sad ovako ostane ne znam sta treba da bude
	private boolean deleted;
	private double raiting;
	private String managerID;
	
	public String getManagerID() {
		return managerID;
	}

	public void setManagerID(String managerID) {
		this.managerID = managerID;
	}

	public Restaurant() {
		super();
		// TODO Auto-generated constructor stub
		this.deleted=false;
	}

	public Restaurant(String name, RestaurantType restaurantType, List<Product> products,
			RestaurantStatus restaurantStatus, Location location, String pictureURL) {
		super();
		this.name = name;
		this.restaurantType = restaurantType;
		this.products = products;
		this.restaurantStatus = restaurantStatus;
		this.location = location;
		this.picturePath = pictureURL;
		this.deleted=false;
		this.raiting=0;
	}
	
	public Restaurant(String name, RestaurantType restaurantType,
			RestaurantStatus restaurantStatus, Location location, String pictureURL,String managerID) {
		super();
		this.name = name;
		this.restaurantType = restaurantType;
		this.products = new ArrayList<Product>();
		this.restaurantStatus = restaurantStatus;
		this.location = location;
		this.picturePath = pictureURL;
		this.deleted=false;
		this.raiting=0;
		this.managerID=managerID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public RestaurantType getRestaurantType() {
		return restaurantType;
	}

	public void setRestaurantType(RestaurantType restaurantType) {
		this.restaurantType = restaurantType;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public RestaurantStatus getRestaurantStatus() {
		return restaurantStatus;
	}

	public void setRestaurantStatus(RestaurantStatus restaurantStatus) {
		this.restaurantStatus = restaurantStatus;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getPicturePath() {
		return picturePath;
	}

	public void setPicturePath(String picturePath) {
		this.picturePath = picturePath;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public double getRaiting() {
		return raiting;
	}

	public void setRaiting(double raiting) {
		this.raiting = raiting;
	}

	@Override
	public String toString() {
		return "Restaurant [name=" + name + ", restaurantType=" + restaurantType + ", products=" + products
				+ ", restaurantStatus=" + restaurantStatus + ", location=" + location + ", picturePath=" + picturePath
				+ ", deleted=" + deleted + "]";
	}
	
	public void addProduct(Product p) {
		products.add(p);
	}
	
}
