package beans;

public class DeliverRequest {
	
	private String requestID;
	private Deliverer deliverer;
	private Order order;
	
	
	
	public DeliverRequest(String requestID, Deliverer deliverer, Order order) {
		super();
		this.requestID = requestID;
		this.deliverer = deliverer;
		this.order = order;
	}
	
	public String getRequestID() {
		return requestID;
	}
	public void setRequestID(String requestID) {
		this.requestID = requestID;
	}
	public Deliverer getDeliverer() {
		return deliverer;
	}
	public void setDeliverer(Deliverer deliverer) {
		this.deliverer = deliverer;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	
	

}

