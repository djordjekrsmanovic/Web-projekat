package beans;

public class Comment {
	
	private User buyer;
	private Restaurant restaurant;
	private String comment;
	private int rate;
	
	public Comment(User buyer, Restaurant restaurant, String comment, int rate) {
		super();
		this.buyer = buyer;
		this.restaurant=restaurant;
		this.comment = comment;
		this.rate = rate;
	}

	public User getBuyer() {
		return buyer;
	}

	public void setBuyer(User buyer) {
		this.buyer = buyer;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	
	
}
