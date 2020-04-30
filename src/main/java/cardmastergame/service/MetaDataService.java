package cardmastergame.service;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

import cardmastergame.bean.MetaData;

import cardmastergame.FileUtils;
import cardmastergame.LogUtils;
import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

class MetaDataService {

    private HashMap<String, MetaData> jsCards;

    MetaDataService(final String jsonFileName) {
        String prop = FileUtils.getCurrentJarStaticPath();
        File path = new File(prop + "\\json");
        for (File file : path.listFiles()) {
            if ((file.isFile()) && (jsonFileName.equals(file.getName()))) {
                LogUtils.warn("json trouve");
                this.jsCards = extractJsCards2(file);
                break;
            }
        }
    }

    void update(Deck<Card> stack) {

        if (jsCards != null) {

            String name;
            MetaData metaData;

            int found = 0;
            int notFound = 0;

            for (Card card : stack) {

                name = getCardName(card.getPath());

                metaData = jsCards.get(name);

                if (metaData == null) {
                    notFound++;
                    LogUtils.warn("Non Trouve :" +  name);
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


    private HashMap<String, MetaData> extractJsCards2(File jsonFile) {
        HashMap<String, MetaData> toReturn = new HashMap<String, MetaData>();

        JSONParser jsonParser = new JSONParser();
        try {
            JSONObject obj = (JSONObject) jsonParser.parse(new FileReader(jsonFile));
            JSONArray cardList = (JSONArray) obj.get("Cards");

            //Iterate on cards
            cardList.forEach(card -> parseJsonCard(toReturn, (JSONObject) card));
        } catch (IOException | ParseException e) {
            LogUtils.warn(e.getMessage());
        }

        return toReturn;
    }

    private void parseJsonCard(HashMap<String, MetaData> toReturn, JSONObject card) {

        Long nb = (Long) card.get("Nb");

        for (int c = 1; c <= nb.intValue(); c++) {

            String name = card.get("Name") + "-" + c;

            MetaData metaData = new MetaData();
            metaData.setName(name);
            metaData.setKind(String.valueOf(card.get("Kind")));
            metaData.setAttack(String.valueOf(card.get("Attack")));
            metaData.setDefense(String.valueOf(card.get("Defense")));
            metaData.setChakra(String.valueOf(card.get("Chakra")));
            metaData.setCost(String.valueOf(card.get("Cost")));
            toReturn.put(name, metaData);
        }

    }


}
