package cardmastergame.controller;

import cardmastergame.LogUtils;
import cardmastergame.service.CardService;
import cardmastergame.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by b.bassac on 24/05/2016.
 */
public class AbstractController {

    @Autowired
    CardService cardService;

    @Autowired
    PlayerService playerService;

    protected List<SearchCriteria> convertFiltersToCriteria(String filters){
        List<SearchCriteria> params = new ArrayList<>();
        if (filters != null) {
            Pattern pattern = Pattern.compile("(\\w+?)(:|<|>|=)(\\w+?),");
            Matcher matcher = pattern.matcher(filters + ",");
            while (matcher.find()) {
                params.add(new SearchCriteria(matcher.group(1),
                        matcher.group(2), matcher.group(3)));
            }
        }
        params.forEach(p -> LogUtils.warn(p.toString()));
        return params;
    }
}
