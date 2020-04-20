package cardmastergame.service;

import java.io.File;
import java.util.Random;

import cardmastergame.FileUtils;
import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;

public class AffiniteService {

    private static Random rand = new Random();

    public static Card[] initialize(String folder) {
        Card result[] = new Card[2];

     

        Deck<Card> stack = new Deck<>();
        int lastIndex = 0;
        String prop = FileUtils.getCurrentJarImgPath();
        File path = new File(prop + folder);
        File[] listOfFiles = path.listFiles();
        for (File listOfFile : listOfFiles) {
            if (listOfFile.isFile()) {
                lastIndex++;
                Card c = new Card();
                c.setId(lastIndex);
                c.setPath(folder + "\\" + listOfFile.getName());
                //allCards.put(c.getId(), c);
                stack.push(c);
            }
        }

        result[0] = stack.get(rand.nextInt(stack.size()-1));
        result[1] = stack.get(rand.nextInt(stack.size()-1));


        return result;
    }
}
