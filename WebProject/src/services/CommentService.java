package services;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Comment;
import dao.CommentDAO;

@Path("/comments")
public class CommentService {
	@Context
	ServletContext servletContext;
	
	public CommentService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (servletContext.getAttribute("commentDAO")==null) {
			servletContext.setAttribute("commentDAO", new CommentDAO(servletContext.getRealPath("")));
		}
	}
	
	@GET
	@Path("/get-restaurant-comments/{restaurantName}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Comment> getComments(@PathParam("restaurantName") String restaurantName){
		CommentDAO commentDAO=(CommentDAO) servletContext.getAttribute("commentDAO");
		return commentDAO.getRestaurantComments(restaurantName);
	}
}
