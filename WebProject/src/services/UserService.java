package services;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Buyer;
import beans.Deliverer;
import beans.Manager;
import beans.UserRole;
import dao.AdminDAO;
import dao.BuyerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dto.ShowUsersDTO;

@Path("/users")
public class UserService {

	@Context
	ServletContext servletContext;
	
	public UserService() {
		
	}
	
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
	}
	
	@GET
	@Path("/load-users")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ShowUsersDTO> loggedUser() {
		List<ShowUsersDTO> allUsers=new ArrayList<ShowUsersDTO>();
		ManagerDAO managerDAO= (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO= (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");	
		
		for (Manager manager:managerDAO.getManagersList()) {
			allUsers.add(new ShowUsersDTO(manager.getUsername(),manager.getPassword(),manager.getFirstName(),manager.getLastName(),UserRole.MANAGER,manager.isBanned()));
		}
		
		for (Deliverer deliverer:delivererDAO.getDeliverers()) {
			allUsers.add(new ShowUsersDTO(deliverer.getUsername(),deliverer.getPassword(),deliverer.getFirstName(),deliverer.getLastName(),UserRole.DELIVERER,deliverer.isBanned()));
		}
		
		for (Buyer buyer:buyerDAO.getBuyersList()) {
			allUsers.add(new ShowUsersDTO(buyer.getUsername(),buyer.getPassword(),buyer.getFirstName(),buyer.getLastName(),UserRole.BUYER,buyer.isBanned()));
		}
		System.out.println(allUsers.size());
		return allUsers;
	}
	
	@DELETE
	@Path("{id}")
	public void deleteUser(@PathParam("id") String id) {
		ManagerDAO managerDAO= (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO= (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");	
		managerDAO.deleteManager(id);
		delivererDAO.deleteDeliverer(id);
		buyerDAO.deleteBuyer(id);
		
	}
	
	@PUT
	@Path("ban-user/{id}")
	public void banUser(@PathParam("id") String id) {
		ManagerDAO managerDAO= (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO= (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");	
		managerDAO.banManager(id);
		delivererDAO.banDeliverer(id);
		buyerDAO.banBuyer(id);
		
	}
	
	@GET
	@Path("/load-buyers")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Buyer> getBuyers(){
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");
		return buyerDAO.getBuyersList();
	}
}
