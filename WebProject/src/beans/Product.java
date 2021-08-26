package beans;

//Artikal
public class Product {
	
	private String id;
	private String name;
	private double price;
	private ProductType type;
	private int amount;
	private String description;
	private String photoPath;
	private String restaurantID;
	
	

	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Product(String id, String name, double price, ProductType type, int amount, String description,
			String photoPath,String restaurantID) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.type = type;
		this.amount = amount;
		this.description = description;
		this.photoPath = photoPath;
		this.restaurantID=restaurantID;
	}

	public void setId(String i) {
		id = i;
	}

	public String getId() {
		return id;
	}

	public void setName(String n) {
		name = n;
	}

	public String getName() {
		return name;
	}

	public void setPrice(double p) {
		price = p;
	}

	public double getPrice() {
		return price;
	}

	public ProductType getType() {
		return type;
	}

	public void setType(ProductType type) {
		this.type = type;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPhotoPath() {
		return photoPath;
	}

	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}

	


	public String getRestaurantID() {
		return restaurantID;
	}



	public void setRestaurantID(String restaurantID) {
		this.restaurantID = restaurantID;
	}



	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", price=" + price + ", type=" + type + ", amount=" + amount
				+ ", description=" + description + ", photoPath=" + photoPath + "]";
	}
	
	
	
	

}
