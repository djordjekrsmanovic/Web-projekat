package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Address;
import beans.Buyer;
import beans.Comment;
import beans.Converter;
import beans.Gender;
import beans.Location;
import beans.Restaurant;
import beans.RestaurantStatus;
import beans.RestaurantType;

public class CommentDAO extends GenericFileRepository<Comment, String> {

	private String contextPath;

	@Override
	protected String getPath() {
		// TODO Auto-generated method stub
		return contextPath + File.separator + "DataBase" + File.separator + "comment.json";
	}

	@Override
	protected String getKey(Comment entity) {
		// TODO Auto-generated method stub
		return entity.getBuyer().getUsername();// za kljuc jos potrebno dodati naziv restorana
	}

	public List<Comment> getComments() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<Comment> comments = objectMapper.convertValue(getList(), new TypeReference<List<Comment>>() {
		});
		return comments;
	}

	public Comment getCommentByID(String id) {
		ObjectMapper objectMapper = new ObjectMapper();
		Comment comment = objectMapper.convertValue(getById(id), new TypeReference<Comment>() {
		});
		return comment;
	}

	public void generateComments() {
		/*
		 * private User buyer; private Restaurant restaurant; private String comment;
		 * private int rate; private CommentState commentState; private boolean deleted;
		 */
		Buyer buyer = new Buyer("djordje", "djordje", "Djordje", "Krsmanovic", Gender.male,
				Converter.convertStringtoDate("14.01.1999."), false, false, 0);
		Address address = new Address("Spens", "5", "Novi Sad", "23000");
		Location location = new Location(45.24, 19.84, address);
		Restaurant restaurant = new Restaurant("Plava frajla", RestaurantType.ETNO, RestaurantStatus.OPEN, location,
				"","");
		Comment comment = new Comment(buyer, restaurant, "Najbolji restoran", 5);
		createOrUpdate(comment);
	}

	public CommentDAO(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public List<Comment> getRestaurantComments(String restaurantName){
		List<Comment> allComments=getComments();
		for (int i=0;i<allComments.size();i++) {
			if (!allComments.get(i).getRestaurant().getName().equalsIgnoreCase(restaurantName)) {
				allComments.remove(i);
				i--;
			}
		}
		return allComments;
	}

}
