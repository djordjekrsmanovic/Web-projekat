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
	}
	
	@POST
	@Path("/loginTry")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String loginTry(User userRequest) { 
		AdminDAO adminDAO= new AdminDAO();
		if(adminDAO.loginAdmin(userRequest.getUsername(), userRequest.getPassword())!=null) {
			servletContext.setAttribute("user",adminDAO.loginAdmin(userRequest.getUsername(), userRequest.getPassword()));
			return "Prijavljen Administrator";
		}		
		
		ManagerDAO managerDAO= new ManagerDAO();
		if(managerDAO.loginManager(userRequest.getUsername(), userRequest.getPassword())!=null) {
			servletContext.setAttribute("user",managerDAO.loginManager(userRequest.getUsername(), userRequest.getPassword()));
			return "Prijavljen menadzer";
		}
		
		DelivererDAO delivererDAO= new DelivererDAO();
		if(delivererDAO.loginDeliverer(userRequest.getUsername(), userRequest.getPassword())!=null) {
			servletContext.setAttribute("user",delivererDAO.loginDeliverer(userRequest.getUsername(), userRequest.getPassword()));
			return "Prijavljen dostavljac";
		}
		
		BuyerDAO buyerDAO= new BuyerDAO();
		if(buyerDAO.loginBuyer(userRequest.getUsername(), userRequest.getPassword())!=null) {
			servletContext.setAttribute("user",buyerDAO.loginBuyer(userRequest.getUsername(), userRequest.getPassword()));
			return "Prijavljen kupac";
		}
		
		return "Ne postoji korisnik sa unesenim korisnickim imenom i sifrom!";
		
	}

	@GET
	@Path("/registracija")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		System.out.println("test");
		return "OK";
	}
}
