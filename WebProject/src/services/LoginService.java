package services;
import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.User;
import beans.UserRole;
import dao.AdminDAO;
import dao.BuyerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;

@Path("/login")
public class LoginService {
	@Context
	private ServletContext servletContext;

	public LoginService() {	}
	
	@PostConstruct
	public void init() {	
		if (servletContext.getAttribute("AdminDAO")==null) {
			servletContext.setAttribute("AdminDAO", new AdminDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("ManagerDAO")==null) {
			servletContext.setAttribute("ManagerDAO", new ManagerDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("DelivererDAO")==null) {
			servletContext.setAttribute("DelivererDAO", new DelivererDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("BuyerDAO")==null) {
			servletContext.setAttribute("BuyerDAO", new BuyerDAO(servletContext.getInitParameter("path")));
		}
		
		
	}
	
	@POST
	@Path("/loginTry")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String loginTry(User userRequest) {		
		AdminDAO adminDAO= (AdminDAO) servletContext.getAttribute("AdminDAO");
		ManagerDAO managerDAO= (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO= (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");	
		
		if(adminDAO.loginAdmin(userRequest.getUsername(), userRequest.getPassword())!=null) {			
			servletContext.setAttribute("user",adminDAO.loginAdmin(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else if(managerDAO.loginManager(userRequest.getUsername(), userRequest.getPassword())!=null) {
			servletContext.setAttribute("user",managerDAO.loginManager(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else if(delivererDAO.loginDeliverer(userRequest.getUsername(), userRequest.getPassword())!=null) {
			servletContext.setAttribute("user",delivererDAO.loginDeliverer(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else if(buyerDAO.loginBuyer(userRequest.getUsername(), userRequest.getPassword())!=null) {
			servletContext.setAttribute("user",buyerDAO.loginBuyer(userRequest.getUsername(), userRequest.getPassword()));
			return "s";
		} else
		
		return "f";
		
	}
	
	@GET
	@Path("/loggedUser")
	@Produces(MediaType.TEXT_PLAIN)
	public String loggedUser() {
	User user= (User) servletContext.getAttribute("user");
	if(user!=null) {
	  if(user.getRole()==UserRole.ADMIN) {
		  return "admin";
	  } 
	  else if(user.getRole()==UserRole.MANAGER) {
			  return "manager";
		  } 
	  else if(user.getRole()==UserRole.BUYER) {
			  return "buyer";
		  } 
	  else if(user.getRole()==UserRole.DELIVERER) {
		  return "deliverer";
	  } else return "notLoged";
	} 
	  else return "notLoged";
	}
	
	
	@GET
	@Path("/logout")
	@Produces(MediaType.TEXT_PLAIN)
	public String logout() {
		servletContext.setAttribute("user", null);
		return "Loged out successfully!";
	}
	
	@GET
	@Path("/get-loged-user")
	@Produces(MediaType.APPLICATION_JSON)
	public User getLogedUser() {
		User user=(User) servletContext.getAttribute("user");
		if(user==null) {
			return null;
		}
		AdminDAO adminDAO= (AdminDAO) servletContext.getAttribute("AdminDAO");
		ManagerDAO managerDAO= (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO= (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");
		if(adminDAO.getAdministratorsByID(user.getUsername())!=null) {
			return adminDAO.getAdministratorsByID(user.getUsername());
		}
		if(managerDAO.getManagerByID(user.getUsername())!=null) {
			return managerDAO.getManagerByID(user.getUsername());
		}
		if(delivererDAO.getDelivererByID(user.getUsername())!=null) {
			return delivererDAO.getDelivererByID(user.getUsername());
		}
		if(buyerDAO.getBuyerByID(user.getUsername())!=null) {
			return buyerDAO.getBuyerByID(user.getUsername());
		}
		return null;
	}
	
	@POST
	@Path("login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User login(@Context HttpServletRequest request,User userRequest) {
		AdminDAO adminDAO= (AdminDAO) servletContext.getAttribute("AdminDAO");
		ManagerDAO managerDAO= (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO= (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO=(BuyerDAO) servletContext.getAttribute("BuyerDAO");	
		User retVal=null;
		retVal=(User) request.getSession().getAttribute("user");
		if (retVal==null) {
			if(adminDAO.loginAdmin(userRequest.getUsername(), userRequest.getPassword())!=null) {
				retVal=adminDAO.loginAdmin(userRequest.getUsername(), userRequest.getPassword());
				request.getSession().setAttribute("user",retVal);
			} else if(managerDAO.loginManager(userRequest.getUsername(), userRequest.getPassword())!=null) {
				retVal=managerDAO.loginManager(userRequest.getUsername(), userRequest.getPassword());
				servletContext.setAttribute("user",retVal);
			} else if(delivererDAO.loginDeliverer(userRequest.getUsername(), userRequest.getPassword())!=null) {
				retVal=delivererDAO.loginDeliverer(userRequest.getUsername(), userRequest.getPassword());
				servletContext.setAttribute("user",retVal);
			} else if(buyerDAO.loginBuyer(userRequest.getUsername(), userRequest.getPassword())!=null) {
				retVal=buyerDAO.loginBuyer(userRequest.getUsername(), userRequest.getPassword());
				servletContext.setAttribute("user",retVal);
			}
		}
		
		return retVal;
		
		
	}
	
	@GET
	@Path("logged-user")
	@Produces(MediaType.APPLICATION_JSON)
	public User checkLogin(@Context HttpServletRequest request) {
		User retVal=null;
		retVal=(User) request.getSession().getAttribute("user");
		return retVal;
	}
	
	@GET
	@Path("logout-user")
	@Produces(MediaType.APPLICATION_JSON)
	public String logoutUser(@Context HttpServletRequest request) {
		User retVal=null;
		retVal=(User) request.getSession().getAttribute("user");
		if (retVal!=null) {
			request.getSession().invalidate();
			return "Log out succesfully";
		}else {
			return "Error";
		}
	}
	
}
