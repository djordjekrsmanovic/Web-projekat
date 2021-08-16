package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Buyer;
import beans.Converter;
import beans.Gender;
import dao.AdminDAO;
import dao.BuyerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dto.UserDTO;

@Path("/registration")
public class RegistrationService {
	
	@Context
	private ServletContext servletContext;
	
	public RegistrationService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (servletContext.getAttribute("AdminDAO")==null) {
			servletContext.setAttribute("AdminDAO", new AdminDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("BuyerDAO")==null) {
			servletContext.setAttribute("BuyerDAO", new BuyerDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("DelivererDAO")==null) {
			servletContext.setAttribute("DelivererDAO", new DelivererDAO(servletContext.getRealPath("/")));
		}
		if (servletContext.getAttribute("ManagerDAO")==null) {
			servletContext.setAttribute("ManagerDAO", new ManagerDAO(servletContext.getRealPath("")));
		}
		
	}
	
	@GET
	@Path("/get-usernames/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean getUserNames(@PathParam("username")String username){
		AdminDAO adminDAO=(AdminDAO) servletContext.getAttribute("AdminDAO");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");
		DelivererDAO delivererDAO=(DelivererDAO) servletContext.getAttribute("DelivererDAO");
		ManagerDAO managerDAO=(ManagerDAO) servletContext.getAttribute("ManagerDAO");
		return adminDAO.validUserName(username) && buyerDAO.validUserName(username) && delivererDAO.validUserName(username) && managerDAO.validUserName(username);
		
	}
	
	@POST
	@Path("/register")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Buyer registerUser(UserDTO user) {
		/*public Buyer(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
				boolean deleted, boolean banned, int points) */
		Gender gender=Gender.other;
		if (user.gender.equalsIgnoreCase("muski")) {
			gender=Gender.male;
		}else {
			gender=Gender.female;
		}
		
		System.out.println("Vrsi se registracija");
		Buyer buyer=new Buyer(user.username,user.password,user.firstName,user.lastName,gender,Converter.convertStringtoDate(user.birthDate),false,false,0);
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");
		buyerDAO.create(buyer);
	
		return buyer;
	}
}
