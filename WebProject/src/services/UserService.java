package services;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Administrator;
import beans.Buyer;
import beans.Converter;
import beans.Deliverer;
import beans.Manager;
import beans.User;
import beans.UserRole;
import dao.AdminDAO;
import dao.BuyerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dto.ChangeProfileDTO;
import dto.ShowUsersDTO;

@Path("/users")
public class UserService {

	@Context
	ServletContext servletContext;

	public UserService() {

	}

	@PostConstruct
	public void init() {
		if (servletContext.getAttribute("AdminDAO") == null) {
			servletContext.setAttribute("AdminDAO", new AdminDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("ManagerDAO") == null) {
			servletContext.setAttribute("ManagerDAO", new ManagerDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("DelivererDAO") == null) {
			servletContext.setAttribute("DelivererDAO", new DelivererDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("BuyerDAO") == null) {
			servletContext.setAttribute("BuyerDAO", new BuyerDAO(servletContext.getInitParameter("path")));
		}
	}

	@GET
	@Path("/load-users")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ShowUsersDTO> loggedUser() {
		List<ShowUsersDTO> allUsers = new ArrayList<ShowUsersDTO>();
		ManagerDAO managerDAO = (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO = (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO = (BuyerDAO) servletContext.getAttribute("BuyerDAO");

		for (Manager manager : managerDAO.getManagersList()) {
			allUsers.add(new ShowUsersDTO(manager.getUsername(), manager.getPassword(), manager.getFirstName(),
					manager.getLastName(), UserRole.MANAGER, manager.isBanned()));
		}

		for (Deliverer deliverer : delivererDAO.getDeliverers()) {
			allUsers.add(new ShowUsersDTO(deliverer.getUsername(), deliverer.getPassword(), deliverer.getFirstName(),
					deliverer.getLastName(), UserRole.DELIVERER, deliverer.isBanned()));
		}

		for (Buyer buyer : buyerDAO.getBuyersList()) {
			allUsers.add(new ShowUsersDTO(buyer.getUsername(), buyer.getPassword(), buyer.getFirstName(),
					buyer.getLastName(), UserRole.BUYER, buyer.isBanned()));
		}
		System.out.println(allUsers.size());
		return allUsers;
	}

	@DELETE
	@Path("{id}")
	public void deleteUser(@PathParam("id") String id) {
		ManagerDAO managerDAO = (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO = (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO = (BuyerDAO) servletContext.getAttribute("BuyerDAO");
		managerDAO.deleteManager(id);
		delivererDAO.deleteDeliverer(id);
		buyerDAO.deleteBuyer(id);

	}

	@PUT
	@Path("ban-user/{id}")
	public void banUser(@PathParam("id") String id) {
		ManagerDAO managerDAO = (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO = (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO = (BuyerDAO) servletContext.getAttribute("BuyerDAO");
		managerDAO.banManager(id);
		delivererDAO.banDeliverer(id);
		buyerDAO.banBuyer(id);

	}

	@GET
	@Path("/load-buyers")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Buyer> getBuyers() {
		BuyerDAO buyerDAO = (BuyerDAO) servletContext.getAttribute("BuyerDAO");
		return buyerDAO.getBuyersList();
	}

	@POST
	@Path("/change-user")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User changeUser(ChangeProfileDTO profileData) {
		System.out.println("USAO SAM U IZMJENU PROFILA");
		ManagerDAO managerDAO = (ManagerDAO) servletContext.getAttribute("ManagerDAO");
		DelivererDAO delivererDAO = (DelivererDAO) servletContext.getAttribute("DelivererDAO");
		BuyerDAO buyerDAO = (BuyerDAO) servletContext.getAttribute("BuyerDAO");
		AdminDAO adminDAO = (AdminDAO) servletContext.getAttribute("AdminDAO");

		if (profileData.role.equalsIgnoreCase("admin")) {
			Administrator admin = adminDAO.getAdministratorsByID(profileData.oldUsername);
			if (admin != null) {
				if (admin.getUsername().equals(profileData.username)) {
					admin.setBirthDate(Converter.convertStringtoDate(profileData.birthDate));
					admin.setFirstName(profileData.firstName);
					admin.setLastName(profileData.lastName);
					admin.setUsername(profileData.username);
					admin.setGender(Converter.getGender(profileData.gender));
					adminDAO.createOrUpdate(admin);
					servletContext.removeAttribute("user");
					servletContext.setAttribute("user", admin);
					return admin;
				} else {
					// must change username
					adminDAO.deletePhysical(admin.getUsername());
					admin.setBirthDate(Converter.convertStringtoDate(profileData.birthDate));
					admin.setFirstName(profileData.firstName);
					admin.setLastName(profileData.lastName);
					admin.setUsername(profileData.username);
					admin.setGender(Converter.getGender(profileData.gender));
					admin.setUsername(profileData.username);
					adminDAO.createOrUpdate(admin);
					servletContext.removeAttribute("user");
					servletContext.setAttribute("user", admin);
					return admin;
				}
			} else if (profileData.role.equalsIgnoreCase("manager")) {
				Manager manager = managerDAO.getManagerByID(profileData.oldUsername);
				if (manager != null) {
					if (manager.getUsername().equals(profileData.username)) {
						manager.setBirthDate(Converter.convertStringtoDate(profileData.birthDate));
						manager.setFirstName(profileData.firstName);
						manager.setLastName(profileData.lastName);
						manager.setUsername(profileData.username);
						manager.setGender(Converter.getGender(profileData.gender));
						managerDAO.createOrUpdate(manager);
						servletContext.removeAttribute("user");
						servletContext.setAttribute("user", manager);
						return manager;
					} else {
						// must change username
						managerDAO.deletePhysical(manager.getUsername());
						manager.setBirthDate(Converter.convertStringtoDate(profileData.birthDate));
						manager.setFirstName(profileData.firstName);
						manager.setLastName(profileData.lastName);
						manager.setUsername(profileData.username);
						manager.setGender(Converter.getGender(profileData.gender));
						manager.setUsername(profileData.username);
						managerDAO.createOrUpdate(manager);
						servletContext.removeAttribute("user");
						servletContext.setAttribute("user", manager);
						return manager;
					}
				}

			}else if(profileData.role.equalsIgnoreCase("buyer")) {
				Buyer buyer = buyerDAO.getBuyerByID(profileData.oldUsername);
				if (buyer != null) {
					if (buyer.getUsername().equals(profileData.username)) {
						buyer.setBirthDate(Converter.convertStringtoDate(profileData.birthDate));
						buyer.setFirstName(profileData.firstName);
						buyer.setLastName(profileData.lastName);
						buyer.setUsername(profileData.username);
						buyer.setGender(Converter.getGender(profileData.gender));
						buyerDAO.createOrUpdate(buyer);
						servletContext.removeAttribute("user");
						servletContext.setAttribute("user", buyer);
						return buyer;
					} else {
						// must change username
						buyerDAO.deletePhysical(buyer.getUsername());
						buyer.setBirthDate(Converter.convertStringtoDate(profileData.birthDate));
						buyer.setFirstName(profileData.firstName);
						buyer.setLastName(profileData.lastName);
						buyer.setUsername(profileData.username);
						buyer.setGender(Converter.getGender(profileData.gender));
						buyer.setUsername(profileData.username);
						buyerDAO.createOrUpdate(buyer);
						servletContext.removeAttribute("user");
						servletContext.setAttribute("user", buyer);
						return buyer;
					}
				}

			}else if(profileData.role.equalsIgnoreCase("deliverer")) {
				Deliverer deliverer = delivererDAO.getDelivererByID(profileData.oldUsername);
				if (deliverer != null) {
					if (deliverer.getUsername().equals(profileData.username)) {
						deliverer.setBirthDate(Converter.convertStringtoDate(profileData.birthDate));
						deliverer.setFirstName(profileData.firstName);
						deliverer.setLastName(profileData.lastName);
						deliverer.setUsername(profileData.username);
						deliverer.setGender(Converter.getGender(profileData.gender));
						delivererDAO.createOrUpdate(deliverer);
						servletContext.removeAttribute("user");
						servletContext.setAttribute("user", deliverer);
						return deliverer;
					} else {
						// must change username
						delivererDAO.deletePhysical(deliverer.getUsername());
						deliverer.setBirthDate(Converter.convertStringtoDate(profileData.birthDate));
						deliverer.setFirstName(profileData.firstName);
						deliverer.setLastName(profileData.lastName);
						deliverer.setUsername(profileData.username);
						deliverer.setGender(Converter.getGender(profileData.gender));
						deliverer.setUsername(profileData.username);
						delivererDAO.createOrUpdate(deliverer);
						servletContext.removeAttribute("user");
						servletContext.setAttribute("user", deliverer);
						return deliverer;
					}
				}

			}

		}

		System.out.println("IZASAO SAM U IZMJENU PROFILA");
		return null;
	}
}
