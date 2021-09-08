package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import beans.DeliverRequest;
import beans.Deliverer;
import beans.Order;
import beans.OrderStatus;


public class DeliverRequestDAO extends GenericFileRepository<DeliverRequest, String> {

	private String contextPath;
	
	@Override
	protected String getPath() {
		// TODO Auto-generated method stub
		return contextPath + File.separator + "DataBase" + File.separator + "deliverrequest.json";
	}

	@Override
	protected String getKey(DeliverRequest entity) {
		// TODO Auto-generated method stub
		return entity.getRequestID();
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
		DeliverRequest request = new DeliverRequest(o.getId(), d, o, false);
		this.create(request);
		return "Successfully created request!";
	}
	
	public List<DeliverRequest> getRequestsForManager(String managerID) {
		List<DeliverRequest> ret = new ArrayList<DeliverRequest>();
		for(DeliverRequest dr : this.getDeliverRequestsList()) {
			if(dr.getOrder().getRestaurant().getManagerID().equals(managerID)) {
				if(!dr.isDeleted()) {
					ret.add(dr);
				}
			}
		}
		return ret;
	}
	
	public void odobri(String requestId, OrderDAO orderDAO, DelivererDAO delivererDAO) {				
				/*DeliverRequest dr = this.getRequestByID(requestId);			
				dr.getDeliverer().addOrder(dr.getOrder());
				Deliverer deliverer=delivererDAO.getDelivererByID(dr.getDeliverer().getUsername());
				deliverer.addOrder(dr.getOrder());
				dr.getOrder().setStatus(OrderStatus.U_TRANSPORTU);
				oDAO.prebaciUtransport(dr.getOrder().getId());			
				delivererDAO.createOrUpdate(dr.getDeliverer());
				dr.setDeleted(true);
				this.createOrUpdate(dr);
				delivererDAO.prebaciUTransport(dr.getDeliverer(), dr.getOrder());	*/
				DeliverRequest delivererRequest=this.getRequestByID(requestId);
				delivererRequest.setDeleted(true);
				this.createOrUpdate(delivererRequest);
				Deliverer deliverer=delivererDAO.getDelivererByID(delivererRequest.getDeliverer().getUsername());
				Order order=orderDAO.getOrderByID(delivererRequest.getOrder().getId());
				order.setStatus(OrderStatus.U_TRANSPORTU);
				orderDAO.update(order);
				deliverer.addOrder(order);
				delivererDAO.createOrUpdate(deliverer);
	}
	
	public void odbij(String requestId, OrderDAO oDAO, DelivererDAO dDAO) {
		for(DeliverRequest dr : this.getDeliverRequestsList()) {
			if(dr.getRequestID().equals(requestId)) {				
				dr.setDeleted(true);
				this.createOrUpdate(dr);
			}
		}
	}
	
}

