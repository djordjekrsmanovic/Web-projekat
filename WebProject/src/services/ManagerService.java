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

import beans.Buyer;
import beans.Comment;
import beans.Manager;
import beans.Order;
import beans.Product;
import beans.Restaurant;
import beans.User;
import dao.AdminDAO;
import dao.BuyerDAO;
import dao.CommentDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dao.OrderDAO;
import dao.ProductDAO;
import dao.RestaurantDAO;
<<<<<<< Updated upstream
import beans.Buyer;
import beans.Comment;
import beans.Manager;
import beans.Order;
import beans.Product;
import beans.Restaurant;
import beans.User;
=======
>>>>>>> Stashed changes

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
		if (servletContext.getAttribute("RestaurantDAO")==null) {
			servletContext.setAttribute("RestaurantDAO", new RestaurantDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("OrderDAO")==null) {
			servletContext.setAttribute("OrderDAO", new OrderDAO(servletContext.getRealPath("")));
		}
		if (servletContext.getAttribute("CommentDAO")==null) {
			servletContext.setAttribute("CommentDAO", new CommentDAO(servletContext.getRealPath("")));
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
		if(productDAO.getProductByName(product.getName())==null) {
			productDAO.create(product);
			ManagerDAO mDAO = (ManagerDAO) servletContext.getAttribute("ManagerDAO");
			RestaurantDAO rDAO = (RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
			User u = (User) servletContext.getAttribute("user");
			Manager m = mDAO.getManagerByUsername(u.getUsername());
			rDAO.addProductToRestaurant(m.getRestaurant(), product);
			
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
	public String rememberProductName(Product pname) {
		servletContext.setAttribute("productName", pname.getName());
		return "Success!";
	}
	
	@GET
	@Path("/productData")
	@Produces(MediaType.APPLICATION_JSON)
	public Product productData() {
		String name = (String) servletContext.getAttribute("productName");
		ProductDAO productDAO= (ProductDAO) servletContext.getAttribute("ProductDAO");
		
		return productDAO.getProductByName(name);
	}
	
	@GET
	@Path("/getBuyers")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Buyer> managerBuyers(){
		OrderDAO orderDAO = (OrderDAO) servletContext.getAttribute("OrderDAO");
		BuyerDAO bDAO = (BuyerDAO) servletContext.getAttribute("BuyerDAO");
		User u = (User) servletContext.getAttribute("user");
		ManagerDAO mDAO = (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		Manager m = mDAO.getManagerByUsername(u.getUsername());
		
		return orderDAO.getBuyersForManager(m.getUsername(), bDAO.getBuyersList());
	}
	
	@GET
	@Path("/getOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Order> managerOrders(){
		OrderDAO orderDAO = (OrderDAO) servletContext.getAttribute("OrderDAO");
		User u = (User) servletContext.getAttribute("user");		
		return orderDAO.getOrdersForManager(u.getUsername());

	}
	
	@POST
	@Path("/changeOrderStatus")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Order changeOrderStatus(Order order) {
		OrderDAO orderDAO=(OrderDAO) servletContext.getAttribute("OrderDAO");
		return orderDAO.changeStatus(order.getId());
	}
	
	@GET
	@Path("/getComments")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Comment> getComments(){
		User u = (User) servletContext.getAttribute("user");
		CommentDAO cDAO = (CommentDAO) servletContext.getAttribute("CommentDAO");
		return cDAO.getCommentsForManager(u.getUsername());
	}
	
	@POST
	@Path("/odobri")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String odobri(Comment komentar) {
		CommentDAO cDAO = (CommentDAO) servletContext.getAttribute("CommentDAO");
		cDAO.changeCommentStatus(komentar, "odobri");
		return "Odobren!";
	}
	
	@POST
	@Path("/odbij")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String odbij(Comment komentar) {
		CommentDAO cDAO = (CommentDAO) servletContext.getAttribute("CommentDAO");
		cDAO.changeCommentStatus(komentar, "odbij");
		return "Odbijen!";
	}
	
	@GET
	@Path("/get-managers")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Manager> getManagers(){
		
		ManagerDAO managerDAO = (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		List<Manager> managers=managerDAO.getManagersList();
		for(int i=0;i<managers.size();i++) {
			if(managers.get(i).getRestaurant()!=null) {
				managers.remove(i);
				i--;
			}
		}
		System.out.println(managers.size());
		return managers;
	}
}