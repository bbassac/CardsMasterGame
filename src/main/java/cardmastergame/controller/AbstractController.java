package cardmastergame.controller;

import cardmastergame.service.CardService;
import cardmastergame.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by b.bassac on 24/05/2016.
 */
public class AbstractController {

    @Autowired
    CardService cardService;

    @Autowired
    PlayerService playerService;


}
