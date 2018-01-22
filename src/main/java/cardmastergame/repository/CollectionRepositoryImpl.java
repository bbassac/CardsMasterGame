package cardmastergame.repository;

import cardmastergame.bean.Card;
import cardmastergame.bean.Game;
import cardmastergame.bean.StackConstants;
import org.springframework.stereotype.Repository;

import java.util.Stack;

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
    public Stack<Card> getStack(StackConstants stackName) {
        switch (stackName){
            case ENVIRONNEMENT:
                return game.getCurrentEnvironnement();
            case ENVIRONNEMENTS:
                return game.getEnvironnments();
            case PIOCHE:
                return game.getPioche();
            case INVOCATIONS:
                return game.getInvocations();
            case CIMETIERE0:
                return game.getCimetieres()[0];
            case CIMETIERE1:
                return game.getCimetieres()[1];
            case MAIN0:
                return game.getMains()[0];
            case MAIN1:
                return game.getMains()[1];
            case PLATEAU0:
                return game.getPlateaux()[0];
            case PLATEAU1:
                return game.getPlateaux()[1];
            default:
                throw new UnsupportedOperationException();
        }
    }

    @Override
    public String getCardById(Integer id) {
        return game.getAllCards().get(id).getPath();
    }

    @Override
    public void pickCardFromStackToPlayer(int player) {
       game.pickCardFromStackToPlayer(player);
    }

    @Override
    public void updatePlayerPvs(int player, int newPvs) {
        game.updatePlayerPvs(player,newPvs);
    }

    @Override
    public int getPlayerPvs(int player) {
        return game.getPlayerPvs(player);
    }


}
