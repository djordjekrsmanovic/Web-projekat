package services;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.AdminDAO;
import dao.BuyerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dao.RestaurantDAO;
import beans.Administrator;
import beans.Manager;
import beans.Restaurant;
import beans.User;
import beans.UserRole;

@Path("/login")
public class LoginService {
	@Context
	private ServletContext servletContext;

	public LoginService() {	}
	
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
	
	@POST
	@Path("/loginTry")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String loginTry(User userRequest) { 		
		AdminDAO adminDAO= (AdminDAO) servletContext.getAttribute("AdminDAO");
		ManagerDAO managerDAO= (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO= (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");	
		
		if(adminDAO.loginAdmin(userRequest.getUsername(), userRequest.getPassword())!=null) {			
			servletContext.setAttribute("user",adminDAO.loginAdmin(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else if(managerDAO.loginManager(userRequest.getUsername(), userRequest.getPassword())!=null) {
			servletContext.setAttribute("user",managerDAO.loginManager(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else if(delivererDAO.loginDeliverer(userRequest.getUsername(), userRequest.getPassword())!=null) {
			servletContext.setAttribute("user",delivererDAO.loginDeliverer(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else if(buyerDAO.loginBuyer(userRequest.getUsername(), userRequest.getPassword())!=null) {
			servletContext.setAttribute("user",buyerDAO.loginBuyer(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else
		
		return "f";
		
	}
	
	@GET
	@Path("/loggedUser")
	@Produces(MediaType.TEXT_PLAIN)
	public String loggedUser() {
	User user= (User) servletContext.getAttribute("user");
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
		servletContext.setAttribute("user", null);
		return "Loged out successfully!";
	}
	
}
