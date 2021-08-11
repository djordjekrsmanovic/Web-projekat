package dao;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public abstract class GenericFileRepository<Entity, KeyType> {
	protected abstract String getPath();

	protected abstract KeyType getKey(Entity entity);

	private HashMap<KeyType, Entity> readFile() {
		String path = getPath();
		HashMap<KeyType, Entity> entities = new HashMap<KeyType, Entity>();
		if (!Files.exists(Paths.get(path))) {
			return entities;
		}
		ObjectMapper objectMapper = new ObjectMapper();

		File file = new File(path);
		try {

			entities = objectMapper.readValue(file, new TypeReference<HashMap<KeyType, Entity>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
			System.out.println("Greska prilikom citanja fajla");
		} catch (JsonMappingException e) {
			e.printStackTrace();
			System.out.println("Greska prilikom citanja fajla");
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Greska prilikom citanja fajla");
		}

		return entities;
	}

	private void writeFile(HashMap<KeyType, Entity> entities) {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
		String path = getPath();

		try {
			objectMapper.writeValue(new FileOutputStream(path), entities);
		} catch (IOException e) {
			System.out.println("Greska prilikom pisanja u fajl");
			e.printStackTrace();
		}
	}

	public void create(Entity entity) {
		HashMap<KeyType, Entity> entities = readFile();
		if (entities.containsKey(getKey(entity))) {
			return;
		}
		entities.put(getKey(entity), entity);
		writeFile(entities);
	}

	public void update(Entity entity) {
		HashMap<KeyType, Entity> entities = readFile();
		if (!entities.containsKey(getKey(entity))) {
			return;
		}
		entities.put(getKey(entity), entity);
		writeFile(entities);
	}

	protected List<Entity> getList() {
		List<Entity> listValues = new ArrayList<Entity>(readFile().values());
		return listValues;
	}

	protected Entity getById(KeyType id) {
		HashMap<KeyType, Entity> entities = readFile();
		return entities.get(id);
	}

	public void createOrUpdate(Entity entity) {
		HashMap<KeyType, Entity> entities = readFile();
		entities.put(getKey(entity), entity);
		writeFile(entities);
	}

}
