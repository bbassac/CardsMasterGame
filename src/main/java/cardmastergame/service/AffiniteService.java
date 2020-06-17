package cardmastergame.service;

import cardmastergame.FileUtils;
import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Random;

@Component
public class AffiniteService {

    private static Random rand = new Random();
    @Autowired
    private MetaDataService metaDataService ;

    public Card[] initialize(String folder) {
        Card[] result = new Card[2];
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
                stack.push(c);
            }
        }
        metaDataService.update(stack,folder);
        result[0] = stack.get(rand.nextInt(stack.size()-1));
        result[1] = stack.get(rand.nextInt(stack.size()-1));

        return result;
    }
}
