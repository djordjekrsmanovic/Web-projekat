package dto;

public class CreateCommentDTO {
	public String restaurantID;
	public String comment;
	public int rate;
	public String orderID;

	public CreateCommentDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreateCommentDTO(String restaurantID, String comment, int rate, String orderID) {
		super();
		this.restaurantID = restaurantID;
		this.comment = comment;
		this.rate = rate;
		this.orderID = orderID;
	}

}
