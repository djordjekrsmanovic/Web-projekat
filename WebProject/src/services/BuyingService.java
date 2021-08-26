package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Product;
import beans.Restaurant;
import beans.ShoppingCart;
import beans.CartItem;
import dao.CartDAO;
import dao.RestaurantDAO;
import dto.AddProductToCartDTO;
import dao.BuyerDAO;

@Path("/buying")
public class BuyingService {

	@Context
	ServletContext servletContext;
	
	public void BuyingService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (servletContext.getAttribute("cartDAO")==null) {
			servletContext.setAttribute("cartDAO", new CartDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("restaurantDAO")==null) {
			servletContext.setAttribute("restaurantDAO", new RestaurantDAO(servletContext.getInitParameter("path")));
		}
		
		if (servletContext.getAttribute("buyerDAO")==null) {
			servletContext.setAttribute("buyerDAO", new BuyerDAO(servletContext.getInitParameter("path")));
		}
	}
	
	
	@POST
	@Path("add-product-to-cart")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void addToCart(AddProductToCartDTO data) {
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("restaurantDAO");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("buyerDAO");
		CartDAO cartDAO=(CartDAO) servletContext.getAttribute("cartDAO");
		
		ShoppingCart userCart=cartDAO.getShoppingCartByID(data.BuyerUsername);
		Restaurant restaurant=restaurantDAO.getRestaurantByID(data.restaurantID);
		Product chosenProduct=new Product();
		for (Product product:restaurant.getProducts()) {
			if (product.getName().equals(data.productID)) {
				chosenProduct=product;
				break;
			}
		}
		
		CartItem cartItem=new CartItem(chosenProduct,data.amount);
		userCart.addCartItem(cartItem);
		cartDAO.createOrUpdate(userCart);
	}

}
