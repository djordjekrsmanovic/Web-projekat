package services;
import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.User;
import beans.UserRole;
import dao.AdminDAO;
import dao.BuyerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;

@Path("/login")
public class LoginService {
	@Context
	private ServletContext request;

	public LoginService() {	}
	
	@PostConstruct
	public void init() {	
		if (request.getAttribute("AdminDAO")==null) {
			request.setAttribute("AdminDAO", new AdminDAO(request.getRealPath("")));
		}
		if (request.getAttribute("ManagerDAO")==null) {
			request.setAttribute("ManagerDAO", new ManagerDAO(request.getRealPath("")));
		}
		if (request.getAttribute("DelivererDAO")==null) {
			request.setAttribute("DelivererDAO", new DelivererDAO(request.getRealPath("")));
		}
		if (request.getAttribute("BuyerDAO")==null) {
			request.setAttribute("BuyerDAO", new BuyerDAO(request.getRealPath("")));
		}
		
		
	}
	
	@POST
	@Path("/loginTry")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String loginTry(User userRequest) { 		
		AdminDAO adminDAO= (AdminDAO) request.getAttribute("AdminDAO");
		ManagerDAO managerDAO= (ManagerDAO) request.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO= (DelivererDAO) request.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO=(BuyerDAO) request.getAttribute("BuyerDAO");	
		
		if(adminDAO.loginAdmin(userRequest.getUsername(), userRequest.getPassword())!=null) {			
			request.setAttribute("user",adminDAO.loginAdmin(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else if(managerDAO.loginManager(userRequest.getUsername(), userRequest.getPassword())!=null) {
			request.setAttribute("user",managerDAO.loginManager(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else if(delivererDAO.loginDeliverer(userRequest.getUsername(), userRequest.getPassword())!=null) {
			request.setAttribute("user",delivererDAO.loginDeliverer(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else if(buyerDAO.loginBuyer(userRequest.getUsername(), userRequest.getPassword())!=null) {
			request.setAttribute("user",buyerDAO.loginBuyer(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else
		
		return "f";
		
	}
	
	@GET
	@Path("/loggedUser")
	@Produces(MediaType.TEXT_PLAIN)
	public String loggedUser() {
	User user= (User) request.getAttribute("user");
	if(user!=null) {
	  if(user.getRole()==UserRole.ADMIN) {
		  return "admin";
	  } 
	  else if(user.getRole()==UserRole.MANAGER) {
			  return "manager";
		  } 
	  else if(user.getRole()==UserRole.BUYER) {
			  return "buyer";
		  } 
	  else if(user.getRole()==UserRole.DELIVERER) {
		  return "deliverer";
	  } else return "notLoged";
	} 
	  else return "notLoged";
	}
	
	
	@GET
	@Path("/logout")
	@Produces(MediaType.TEXT_PLAIN)
	public String logout() {
		request.setAttribute("user", null);
		return "Loged out successfully!";
	}
	
	@GET
	@Path("/get-loged-user")
	@Produces(MediaType.APPLICATION_JSON)
	public User getLogedUser() {
		User user=(User) request.getAttribute("user");
		return user;
	}
	
}
