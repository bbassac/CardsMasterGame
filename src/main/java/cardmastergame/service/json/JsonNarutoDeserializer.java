package cardmastergame.service.json;

import java.io.IOException;
import java.util.Iterator;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import cardmastergame.LogUtils;

public class JsonNarutoDeserializer extends StdDeserializer<JsCards> {

	private static final long serialVersionUID = 6495909692763148527L;
	
	protected JsonNarutoDeserializer() {
		this(null);
	}

    public JsonNarutoDeserializer(Class<?> c) { 
        super(c); 
    }

	@Override
	public JsCards deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {

		JsCards cards = new JsCards();

		JsonNode rootNode = jp.getCodec().readTree(jp);
        JsonNode cardsNode = rootNode.elements().next();
        
        Iterator<JsonNode> cardsIterator = cardsNode.elements();
        int i = 0;
        JsonNode cardNode = null;
        JsCard card = null;
        String name;
        int nb;
        
        while (cardsIterator.hasNext()) {
        	
        	cardNode = cardsIterator.next();
        	
        	nb = cardNode.get("Nb").asInt();
        	
        	for(int c = 1; c <= nb; c++) {
        	
	        	name = cardNode.get("Name").asText() + "-" + c;
	
	        	card = new JsCard();
	        	card.setName(name);
	        	card.setKind(cardNode.get("Kind").asText());
	        	
	        	cards.put(name, card);
        	
        	}
        	
        	i++;
        }
        LogUtils.warn("Nb JsCars = " + i);        

    	return cards;
	
	}
	
}
