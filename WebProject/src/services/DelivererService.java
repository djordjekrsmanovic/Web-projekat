package services;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Deliverer;
import beans.User;
import beans.Order;
import dao.AdminDAO;
import dao.BuyerDAO;
import dao.CommentDAO;
import dao.DeliverRequestDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dao.OrderDAO;
import dao.ProductDAO;
import dao.RestaurantDAO;

@Path("/deliverer")
public class DelivererService {
	
	@Context
	private ServletContext servletContext;
	
	public DelivererService() {}
	
	@PostConstruct
	public void init() {	
		if (servletContext.getAttribute("AdminDAO")==null) {
			servletContext.setAttribute("AdminDAO", new AdminDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("ManagerDAO")==null) {
			servletContext.setAttribute("ManagerDAO", new ManagerDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("DelivererDAO")==null) {
			servletContext.setAttribute("DelivererDAO", new DelivererDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("BuyerDAO")==null) {
			servletContext.setAttribute("BuyerDAO", new BuyerDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("ProductDAO")==null) {
			servletContext.setAttribute("ProductDAO", new ProductDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("RestaurantDAO")==null) {
			servletContext.setAttribute("RestaurantDAO", new RestaurantDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("OrderDAO")==null) {
			servletContext.setAttribute("OrderDAO", new OrderDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("CommentDAO")==null) {
			servletContext.setAttribute("CommentDAO", new CommentDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("DeliverRequestDAO")==null) {
			servletContext.setAttribute("DeliverRequestDAO", new DeliverRequestDAO(servletContext.getRealPath("")));
		}
	}
	
	@GET
	@Path("/delivererProfile")
	@Produces(MediaType.APPLICATION_JSON)
	public User delivererProfile() {
		return (User) servletContext.getAttribute("user");
	}
	
	@POST
	@Path("/editProfile")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String editProfile(User user) {
		Deliverer del = (Deliverer) servletContext.getAttribute("user");	
		DelivererDAO delDAO = (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		delDAO.updateProfile(del, user);
		return "Profil azuriran.";
	}
	
	@GET
	@Path("/getAllOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Order> getOrders(){
		
		OrderDAO oDAO = (OrderDAO) servletContext.getAttribute("OrderDAO");
		return oDAO.getOrders();
	}

	@POST
	@Path("/requireDeliver")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String deliver(String orderID) {
		DeliverRequestDAO req = (DeliverRequestDAO) servletContext.getAttribute("DeliverRequestDAO");
		Deliverer d = (Deliverer) servletContext.getAttribute("user");
		OrderDAO oDAO = (OrderDAO) servletContext.getAttribute("OrderDAO");
		Order o = oDAO.getOrderByID(orderID);
		req.createRequest(o, d);
		return "Success";
	}
	
	/*@POST
	@Path("/requireDeliver")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String requireDeliver(String orderID) {
		DeliverRequestDAO req = (DeliverRequestDAO) servletContext.getAttribute("DeliverRequestDAO");
		Deliverer d = (Deliverer) servletContext.getAttribute("user");
		OrderDAO oDAO = (OrderDAO) servletContext.getAttribute("OrderDAO");
		Order o = oDAO.getOrderByID(orderID);
		req.createRequest(o, d);
		return "Success";
	}*/
	
	@GET
	@Path("/getMyOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Order> getMyOrders(){
		
		DelivererDAO dDAO = (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		User user = (User) servletContext.getAttribute("user");
		return dDAO.getMyOrders(user);
	}
	
	@POST
	@Path("/deliverOrder")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String deliverOrder(Order o) {
		OrderDAO oDAO = (OrderDAO) servletContext.getAttribute("OrderDAO");
		oDAO.deliverOrder(o);
		return "Success";
	}
	
}
