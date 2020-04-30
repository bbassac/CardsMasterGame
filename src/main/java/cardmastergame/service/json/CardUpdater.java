package cardmastergame.service.json;

import java.io.File;
import java.io.IOException;

import cardmastergame.bean.MetaData;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import cardmastergame.FileUtils;
import cardmastergame.LogUtils;
import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;

public class CardUpdater {

	public final JsCards jsCards;
	
    public CardUpdater(final String jsonFileName) {
    	jsCards = getCardsInfosFromJson(jsonFileName);
	}

    public void update(Deck<Card> stack) {
    	
    	if (jsCards != null) {
    		
    		String name;
    		MetaData metaData;
    		
    		int found = 0;
    		int notFound = 0;
    		
    		for(Card card : stack) {
    			
    			name = getCardName(card.getPath());
    			
    			metaData = jsCards.get(name);

    			if (metaData == null) {
    				notFound++;
    				LogUtils.warn(name);
    			} else {
    				card.setMetaData(metaData);
					found++;
    			}
    		}
    		
    		int percent = found * 100 / (found + notFound);
    		LogUtils.warn("Deck updated : " + percent + "%");
    	}
    	
    }
    
    private String getCardName(String path) {
    	
    	String[] words = path.split("\\\\");
    	
    	String name = words[words.length - 1];
    	name = name.substring(0, name.length() - 4);
    	
    	return name;
    }
    
	private JsCards getCardsInfosFromJson(final String jsonFileName) {
    	
        String prop = FileUtils.getCurrentJarStaticPath();
        File path = new File(prop + "\\json");
        
        for (File file : path.listFiles()) {
        	
            if ((file.isFile()) && (jsonFileName.equals(file.getName()))) {
            	LogUtils.warn("json trouve");
            	return extractJsCards(file);
            }
        }
        
        return null;
    }
	
	private JsCards extractJsCards(File jsonFile) {

		JsCards cards = null;
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			SimpleModule module = new SimpleModule();
			module.addDeserializer(JsCards.class, new JsonNarutoDeserializer());
			mapper.registerModule(module);

			cards = mapper.readValue(jsonFile, JsCards.class);			
			
		} catch(JsonMappingException e) {
			LogUtils.warn("Erreur : " + e);
		} catch(JsonParseException e) {
			LogUtils.warn("Erreur : " + e);
		} catch(IOException e) {
			LogUtils.warn("Erreur : " + e);
		}
		
		return cards;
	}

	
}
