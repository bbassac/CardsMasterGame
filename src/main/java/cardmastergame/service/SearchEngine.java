package cardmastergame.service;

import cardmastergame.LogUtils;
import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.bean.MetaData;
import cardmastergame.controller.SearchCriteria;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;
@Component
public class SearchEngine {


    public SearchEngine(CardService cardService) {

    }

    private static boolean isInteger(String s) {
        try {
            Integer.parseInt(s);
        } catch (NumberFormatException e) {
            return false;
        } catch (NullPointerException e) {
            return false;
        }
        // only got here if we didn't return false
        return true;
    }

    private String getAttributeValue(MetaData metaData, String attributeName){
        Class<?> c = metaData.getClass();

        Field f = null;
        try {
            f = c.getDeclaredField(attributeName);
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        }
        f.setAccessible(true);
        String valueOfMyColor="";
        try {
            valueOfMyColor = (String) f.get(metaData);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return valueOfMyColor;
    }

    Deck<Card> searchCards(List<SearchCriteria> params, Deck<Card> fullDeck) {

        for (SearchCriteria searchCriteria : params) {
            String key = searchCriteria.getKey();
            switch (searchCriteria.getOperation()) {
                case ":":
                    fullDeck = fullDeck.stream().filter(
                            p -> getAttributeValue(p.getMetaData(),key).toLowerCase().contains(searchCriteria.getValue().toLowerCase()))
                            .collect(Collectors.toCollection(Deck::new));
                    break;
                case "=":
                    fullDeck = fullDeck.stream().filter(
                            p -> getAttributeValue(p.getMetaData(),key).toLowerCase().equals(searchCriteria.getValue().toLowerCase()))
                            .collect(Collectors.toCollection(Deck::new));
                    break;
                case "<":
                    fullDeck = fullDeck.stream().filter(
                            p -> isInteger(getAttributeValue(p.getMetaData(),key)) && (Integer.valueOf(getAttributeValue(p.getMetaData(),key)) < Integer.valueOf(searchCriteria.getValue())))
                            .collect(Collectors.toCollection(Deck::new));
                    break;
                case ">":
                    fullDeck = fullDeck.stream().filter(
                            p -> isInteger(getAttributeValue(p.getMetaData(),key)) && (Integer.valueOf(getAttributeValue(p.getMetaData(),key)) > Integer.valueOf(searchCriteria.getValue())))
                            .collect(Collectors.toCollection(Deck::new));
                    break;
                default:
                    LogUtils.error("Opérator not recognised : " + searchCriteria.getOperation());
            }
        }
        return fullDeck;
    }


}