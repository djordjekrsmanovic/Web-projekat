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
import beans.Deliverer;
import beans.Gender;
import beans.Manager;
import beans.ShoppingCart;
import dao.AdminDAO;
import dao.BuyerDAO;
import dao.CartDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dto.AdminAddUserDTO;
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
			servletContext.setAttribute("AdminDAO", new AdminDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("BuyerDAO")==null) {
			servletContext.setAttribute("BuyerDAO", new BuyerDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("DelivererDAO")==null) {
			servletContext.setAttribute("DelivererDAO", new DelivererDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("ManagerDAO")==null) {
			servletContext.setAttribute("ManagerDAO", new ManagerDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("cartDAO")==null) {
			servletContext.setAttribute("cartDAO", new CartDAO(servletContext.getInitParameter("path")));
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
		if (user.gender.equalsIgnoreCase("musko")) {
			gender=Gender.male;
		}else {
			gender=Gender.female;
		}
		
		System.out.println("Vrsi se registracija");
		Buyer buyer=new Buyer(user.username,user.password,user.firstName,user.lastName,gender,Converter.convertStringtoDate(user.birthDate),false,false,0);
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");
		buyerDAO.create(buyer);
		ShoppingCart shoppingCart=new ShoppingCart(buyer.getUsername());
		CartDAO cartDAO=(CartDAO) servletContext.getAttribute("cartDAO");
		cartDAO.create(shoppingCart);
		return buyer;
	}
	
	@POST
	@Path("/add-deliverer")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Deliverer addDeliverer(AdminAddUserDTO user) {
		/*public Buyer(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
				boolean deleted, boolean banned, int points) */
		System.out.println("Admin dodaje korisnika");
		Gender gender=Gender.other;
		if (user.gender.equalsIgnoreCase("muski")) {
			gender=Gender.male;
		}else {
			gender=Gender.female;
		}
		
		if (user.userType.equalsIgnoreCase("DELIVERER")) {
			Deliverer deliverer=new Deliverer(user.username,user.password,user.firstName,user.lastName,gender,Converter.convertStringtoDate(user.birthDate),false,false);
			DelivererDAO delivererDAO=(DelivererDAO) servletContext.getAttribute("DelivererDAO");
			delivererDAO.create(deliverer);
			return deliverer;
		}
		
		return null;
		
	}
	
	@POST
	@Path("/add-manager")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Manager addManager(AdminAddUserDTO user) {
		System.out.println("Admin dodaje korisnika");
		Gender gender=Gender.other;
		if (user.gender.equalsIgnoreCase("muski")) {
			gender=Gender.male;
		}else {
			gender=Gender.female;
		}
		
		if (user.userType.equalsIgnoreCase("MANAGER")) {
			Manager manager=new Manager(user.username,user.password,user.firstName,user.lastName,gender,Converter.convertStringtoDate(user.birthDate),false,false);
			ManagerDAO managerDAO=(ManagerDAO) servletContext.getAttribute("ManagerDAO");
			managerDAO.create(manager);
			System.out.println("Kreiranje menadzera");
			return manager;
		}
		
		return null;
		
	}
}
