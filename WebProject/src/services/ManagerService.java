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
import dao.ProductDAO;
import dao.RestaurantDAO;
import beans.Administrator;
import beans.Gender;
import beans.Manager;
import beans.Product;
import beans.Restaurant;
import beans.User;

@Path("/manager")
public class ManagerService {
	@Context
	private ServletContext servletContext;
	
	public ManagerService() {}
	
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
	}
	
	@GET
	@Path("/restaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant restoran() {
		Manager man = (Manager) servletContext.getAttribute("user");
		if(man.getRestaurant()!=null) {
			return man.getRestaurant();
		}
		return null;
	}
	
	@POST
	@Path("/newArticle")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String newArticle(Product product) {
		ProductDAO productDAO = (ProductDAO) servletContext.getAttribute("ProductDAO");
		if(productDAO.getProductByID(product.getId())==null) {
			productDAO.create(product);
			return "Novi artikal napravljen!";
		}
		return "Artikal vec postoji";
	}
	
	@POST
	@Path("/editArticle")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String editArticle(Product product) {
		ProductDAO productDAO = (ProductDAO) servletContext.getAttribute("ProductDAO");		
			productDAO.createOrUpdate(product);
			return "Artikal izmjenjen!";
	}
	
	@POST
	@Path("/editProfile")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String editProfile(User user) {
		Manager man = (Manager) servletContext.getAttribute("user");	
		ManagerDAO manDAO = (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		manDAO.updateProfile(man, user);
		return "Profil azuriran.";
	}
	
	@GET
	@Path("/managerProfile")
	@Produces(MediaType.APPLICATION_JSON)
	public User managerProfile() {
		return (User) servletContext.getAttribute("user");
	}
	
	@POST
	@Path("/productName")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String rememberProductName(String name) {
		servletContext.setAttribute("productName", name);
		return "Success!";
	}
}
