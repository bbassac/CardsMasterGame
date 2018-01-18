package cardmastergame.repository;

import cardmastergame.bean.Card;
import cardmastergame.bean.Game;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.util.*;

/**
 * Created by b.bassac on 24/05/2016.
 */
@Repository

public class CollectionRepositoryImpl implements CollectionRepositoryCustom {

    Game game;

    @Override
    public void startNewGame() {
       game = new Game();

        game.loadStack(game.getEnvironnments(), "/Back-Select");
        game.loadStack(game.getInvocations(), "/Back-Select3");
        game.loadStack(game.getPioche(), "/Back-Draw");
        game.selectCurrentEnvironnement();
    }



    @Override
    public Stack<Card> getStack(String stackName) {
        switch (stackName){
            case "environnement":
                return game.getCurrentEnvironnement();
            case "environnements":
                return game.getEnvironnments();
            case "pioche":
                return game.getPioche();
            case "invocations":
                return game.getInvocations();
            case "cimetiere0":
                return game.getCimetieres()[0];
            case "cimetiere1":
                return game.getCimetieres()[1];
            case "main0":
                return game.getMains()[0];
            case "main1":
                return game.getMains()[1];
            default:
                throw new UnsupportedOperationException();
        }
    }

    @Override
    public String getCardById(Integer id) {
        return game.getAllCards().get(id).getPath();
    }

    @Override
    public void pickCardFromStackToPlayer(String stackName, int player) {
       game.pickCardFromStackToPlayer(stackName,player);
    }




}
