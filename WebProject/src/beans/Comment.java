package beans;

public class Comment {
	
	private String commentID;
	private Buyer buyer;
	private Restaurant restaurant;
	private String comment;
	private int rate;
	private CommentState commentState;
	private boolean deleted;
	
	public Comment(String commentID,Buyer buyer,Restaurant restaurant, String comment, int rate) {
		super();
		this.commentID=commentID;
		this.buyer = buyer;
		this.restaurant=restaurant;
		this.comment = comment;
		this.rate = rate;
		this.commentState=CommentState.WAITING;
		this.deleted=false;
	}
	
	public Comment(String commentID,Buyer buyer,Restaurant restaurant, String comment, int rate,CommentState commentState) {
		super();
		this.commentID=commentID;
		this.buyer = buyer;
		this.restaurant=restaurant;
		this.comment = comment;
		this.rate = rate;
		this.commentState=commentState;
		this.deleted=false;
	}
	

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public Buyer getBuyer() {
		return buyer;
	}

	public void setBuyer(Buyer buyer) {
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

	public Comment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CommentState getCommentState() {
		return commentState;
	}

	public void setCommentState(CommentState commentState) {
		this.commentState = commentState;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "Comment [buyer=" + buyer + ", restaurant=" + restaurant + ", comment=" + comment + ", rate=" + rate
				+ ", commentState=" + commentState + ", deleted=" + deleted + "]";
	}

	public String getCommentID() {
		return commentID;
	}

	public void setCommentID(String commentID) {
		this.commentID = commentID;
	}

	
	
	
}
