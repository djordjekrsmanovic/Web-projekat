package beans;

public class Comment {
	
	private User buyer;
	//restoran
	private String comment;
	private int rate;
	
	public Comment(User buyer, String comment, int rate) {
		super();
		this.buyer = buyer;
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

	
	
}
