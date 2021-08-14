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
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User loginTry(User userRequest) { 
		AdminDAO adminDAO= new AdminDAO();
		return adminDAO.loginAdmin(userRequest.getUsername(),userRequest.getPassword());
	}

	@GET
	@Path("/registracija")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		System.out.println("test");
		return "OK";
	}
}
