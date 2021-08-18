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
	@Path("/login/loggedUser")
	@Produces(MediaType.APPLICATION_JSON)
	public User loggedUser() {
		return (User) servletContext.getAttribute("user");
	}
	
	@GET
	@Path("/registracija")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		System.out.println("test");
		return "OK";
	}
	
}
