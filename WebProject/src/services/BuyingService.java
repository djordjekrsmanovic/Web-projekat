package services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Buyer;
import beans.CartItem;
import beans.Order;
import beans.Product;
import beans.Restaurant;
import beans.ShoppingCart;
import beans.User;
import beans.OrderStatus;
import dao.BuyerDAO;
import dao.CartDAO;
import dao.OrderDAO;
import dao.RestaurantDAO;
import dto.AddProductToCartDTO;

@Path("/buying")
public class BuyingService {

	@Context
	ServletContext servletContext;

	public BuyingService() {
		
	}

	@PostConstruct
	public void init() {
		if (servletContext.getAttribute("cartDAO") == null) {
			servletContext.setAttribute("cartDAO", new CartDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("restaurantDAO") == null) {
			servletContext.setAttribute("restaurantDAO", new RestaurantDAO(servletContext.getInitParameter("path")));
		}

		if (servletContext.getAttribute("buyerDAO") == null) {
			servletContext.setAttribute("buyerDAO", new BuyerDAO(servletContext.getInitParameter("path")));
		}
		
		if (servletContext.getAttribute("orderDAO") == null) {
			servletContext.setAttribute("orderDAO", new OrderDAO(servletContext.getInitParameter("path")));
		}
	}

	@POST
	@Path("add-product-to-cart")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void addToCart(AddProductToCartDTO data) {
		RestaurantDAO restaurantDAO = (RestaurantDAO) servletContext.getAttribute("restaurantDAO");
		CartDAO cartDAO = (CartDAO) servletContext.getAttribute("cartDAO");

		ShoppingCart userCart = cartDAO.getShoppingCartByID(data.BuyerUsername);
		Restaurant restaurant = restaurantDAO.getRestaurantByID(data.restaurantID);
		Product chosenProduct = new Product();
		for (Product product : restaurant.getProducts()) {
			if (product.getName().equals(data.productID)) {
				chosenProduct = product;
				break;
			}
		}

		CartItem cartItem = new CartItem(chosenProduct, data.amount);
		userCart.addCartItem(cartItem);
		calculatePrice(userCart, (Buyer) servletContext.getAttribute("user"));
		cartDAO.createOrUpdate(userCart);
	}

	@GET
	@Path("get-cart/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ShoppingCart getCart(@PathParam("id") String id) {
		CartDAO cartDAO = (CartDAO) servletContext.getAttribute("cartDAO");
		return cartDAO.getShoppingCartByID(id);
	}

	@POST
	@Path("change-amount")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ShoppingCart changeValue(ShoppingCart cart) {
		CartDAO cartDAO = (CartDAO) servletContext.getAttribute("cartDAO");
		calculatePrice(cart, (Buyer) servletContext.getAttribute("user"));
		cartDAO.createOrUpdate(cart);
		return cart;
	}

	@DELETE
	@Path("delete-item")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ShoppingCart deleteItem(CartItem cartItem) {
		CartDAO cartDAO=(CartDAO) servletContext.getAttribute("cartDAO");
		User user=(User) servletContext.getAttribute("user");
		ShoppingCart shoppingCart=cartDAO.getShoppingCartByID(user.getUsername());
		for (int i=0;i<shoppingCart.getCartItems().size();i++) {
			if (shoppingCart.getCartItems().get(i).getProduct().getName().equals(cartItem.getProduct().getName()) && shoppingCart.getCartItems().get(i).getProduct().getRestaurantID().equals(cartItem.getProduct().getRestaurantID())){
				shoppingCart.getCartItems().remove(i);
				calculatePrice(shoppingCart, (Buyer) servletContext.getAttribute("user"));
				cartDAO.createOrUpdate(shoppingCart);
			}
		}
		return shoppingCart;
	}
	
	@POST
	@Path("form-order")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ShoppingCart createOrder(ShoppingCart cart) {
		HashMap<String, String> restaurantsID=new HashMap<String,String>();
		OrderDAO orderDAO=(OrderDAO) servletContext.getAttribute("orderDAO");
		CartDAO cartDAO=(CartDAO) servletContext.getAttribute("cartDAO");
		for (CartItem cartItem:cart.getCartItems()) {
			restaurantsID.put(cartItem.getProduct().getRestaurantID(), cartItem.getProduct().getName()); //done to get unique values of restaurants
		}
		List<String> keys = new ArrayList<String>(restaurantsID.keySet());
		for (String id:keys) {
			orderDAO.formOrder(id,cart);
		}
		
		cart.getCartItems().clear();
		User user=(User) servletContext.getAttribute("user");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("buyerDAO");
		Buyer buyer=buyerDAO.getBuyerByID(user.getUsername());
		buyer.earnPoints((cart.getPrice()/1000)*133);
		buyerDAO.createOrUpdate(buyer);
		calculatePrice(cart, (Buyer) servletContext.getAttribute("user"));
		cartDAO.createOrUpdate(cart);
		
		return cart;
	}
	
	private void calculatePrice(ShoppingCart cart,Buyer buyer) {
		double calculatedPrice=0;
		for (CartItem cartItem:cart.getCartItems()) {
			calculatedPrice+=cartItem.getAmount()*cartItem.getProduct().getPrice();
		}
		cart.setPrice(calculatedPrice*((100-buyer.getBuyerType().getDiscount())/100));
	}
	
	@GET
	@Path("get-orders/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Order> getOrders(@PathParam("id") String id) {
		OrderDAO orderDAO=(OrderDAO) servletContext.getAttribute("orderDAO");
		return orderDAO.getBuyerOrders(id);
	}
	
	@DELETE
	@Path("cancel-order/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Order> cancelOrder(@PathParam("id") String id){
		OrderDAO orderDAO=(OrderDAO) servletContext.getAttribute("orderDAO");
		Order order=orderDAO.getOrderByID(id);
		order.setStatus(OrderStatus.OTKAZANA);
		orderDAO.createOrUpdate(order);
		
		User user=(User) servletContext.getAttribute("user");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("buyerDAO");
		Buyer buyer=buyerDAO.getBuyerByID(user.getUsername());
		buyer.earnPoints(-(order.getPrice()/1000)*133*4);
		buyerDAO.createOrUpdate(buyer);
		return orderDAO.getBuyerOrders(buyer.getUsername());
	}
	
	@GET
	@Path("get-orders-for-review")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Order> getOrdersForReview(){
		OrderDAO orderDAO=(OrderDAO) servletContext.getAttribute("orderDAO");
		Buyer buyer=(Buyer) servletContext.getAttribute("user");
		
		List<Order> orders=new ArrayList<Order>();
		orders=orderDAO.getBuyerOrders(buyer.getUsername());
		for (int i=0;i<orders.size();i++) {
			if (orders.get(i).isReviewed()==true || orders.get(i).getStatus()!=OrderStatus.DOSTAVLJENA) {
				orders.remove(i);
				i--;
			}
		}
		return orders;
	}
}
