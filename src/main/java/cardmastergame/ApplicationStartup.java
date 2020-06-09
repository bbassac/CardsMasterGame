package cardmastergame;


import cardmastergame.service.CardService;
import cardmastergame.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;


/**
 * Created by b.bassac on 23/06/2017.
 */
@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    CardService cardService;

    @Autowired
    PlayerService playerService;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        playerService.startNewGame();
        cardService.startNewGame();
    }
}
