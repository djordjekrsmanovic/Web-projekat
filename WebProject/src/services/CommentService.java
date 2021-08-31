package services;

import java.util.List;

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
import beans.Comment;
import beans.Order;
import dao.CommentDAO;
import dao.OrderDAO;
import dao.RestaurantDAO;
import dto.CreateCommentDTO;

@Path("/comments")
public class CommentService {
	@Context
	ServletContext servletContext;
	
	public CommentService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (servletContext.getAttribute("commentDAO")==null) {
			servletContext.setAttribute("commentDAO", new CommentDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("restaurantDAO")==null) {
			servletContext.setAttribute("restaurantDAO", new RestaurantDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("orderDAO")==null) {
			servletContext.setAttribute("orderDAO", new OrderDAO(servletContext.getInitParameter("path")));
		}
	}
	
	@GET
	@Path("/get-restaurant-comments/{restaurantName}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Comment> getComments(@PathParam("restaurantName") String restaurantName){
		CommentDAO commentDAO=(CommentDAO) servletContext.getAttribute("commentDAO");
		return commentDAO.getRestaurantComments(restaurantName);
	}
	
	@GET
	@Path("/get-comments")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Comment> getComments(){
		CommentDAO commentDAO=(CommentDAO) servletContext.getAttribute("commentDAO");
		System.out.println("USAO U UCITAVANJE KOMENTARA");
		return commentDAO.getComments();
	}
	
	@POST
	@Path("post-comment")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void createComment(CreateCommentDTO createCommentDTO) {
		CommentDAO commentDAO=(CommentDAO) servletContext.getAttribute("commentDAO");
		OrderDAO orderDAO=(OrderDAO) servletContext.getAttribute("orderDAO");
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("restaurantDAO");
		Buyer buyer=(Buyer) servletContext.getAttribute("user");
		Comment comment=new Comment(createCommentDTO.orderID,buyer,restaurantDAO.getRestaurantByID(createCommentDTO.restaurantID),createCommentDTO.comment,createCommentDTO.rate);
		commentDAO.create(comment);
		Order order=orderDAO.getOrderByID(createCommentDTO.orderID);
		order.setReviewed(true);
		orderDAO.createOrUpdate(order);
		
		
	}
}
