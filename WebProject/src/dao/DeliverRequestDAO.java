package dao;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Address;
import beans.DeliverRequest;
import beans.Deliverer;
import beans.Gender;
import beans.Location;
import beans.Manager;
import beans.Order;
import beans.Restaurant;
import beans.RestaurantStatus;
import beans.RestaurantType;

public class DeliverRequestDAO extends GenericFileRepository<DeliverRequest, String> {

	private String contextPath;
	
	@Override
	protected String getPath() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected String getKey(DeliverRequest entity) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public DeliverRequestDAO() {
		generateDeliverRequests();
	}

	public void generateDeliverRequests() {
		System.out.println("Kreiram");
	
	}

	public List<DeliverRequest> getDeliverRequestsList() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<DeliverRequest> DeliverRequests = objectMapper.convertValue(getList(), new TypeReference<List<DeliverRequest>>() {
		});
		return DeliverRequests;
	}

	public DeliverRequest getRequestByID(String id) {
		ObjectMapper objectMapper = new ObjectMapper();
		DeliverRequest request = objectMapper.convertValue(getById(id), new TypeReference<DeliverRequest>() {
		});
		return request;
	}
	
	public DeliverRequestDAO(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public String createRequest(Order o, Deliverer d ) {
		DeliverRequest request = new DeliverRequest(o.getId(), d, o);
		this.create(request);
		return "Successfully created request!";
	}

}
