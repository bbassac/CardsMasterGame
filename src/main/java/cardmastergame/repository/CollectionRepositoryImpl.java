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
            case DRAW:
                return game.getPioche();
            case INVOCATIONS:
                return game.getInvocations();
            case GRAVEYARD0:
                return game.getCimetieres()[0];
            case GRAVEYARD1:
                return game.getCimetieres()[1];
            case HAND0:
                return game.getMains()[0];
            case HAND1:
                return game.getMains()[1];
            case BOARD0:
                return game.getPlateaux()[0];
            case BOARD1:
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
    public void moveCardFromDrawToPlayer(int player) {
       game.moveCardFromDrawToPlayer(player);
    }

    @Override
    public void updatePlayerPvs(int player, int newPvs) {
        game.updatePlayerPvs(player,newPvs);
    }

    @Override
    public int getPlayerPvs(int player) {
        return game.getPlayerPvs(player);
    }

    @Override
    public void moveSpecificCardFromInvocationToPlayer(int playerId, int cardId) {
        game.moveSpecificCardFromInvocationToPlayer(playerId,cardId);
    }

    @Override
    public void moveCardFromHandToGameForPlayer(int playerId, int cardId) {
        game.moveCardFromHandToGameForPlayer(playerId,cardId);
    }

    @Override
    public void moveCardFromGameToGraveyardForPlayer(int playerId, int cardId) {
        game.moveCardFromGameToGraveyardForPlayer(playerId,cardId);
    }

    @Override
    public int updateDmgPointsOnCard(int playerId, int cardId, int value) {
        return game.updateDmgPointsOnCard(playerId,cardId,value);
    }

    @Override
    public int getChakras(int playerId) {
        return game.getChakras(playerId);
    }

    @Override
    public int updateChakras(int playerId, int value) {
        return game.updateChakras(playerId,value);
    }

     @Override
    public int getDmgOnCard(int playerId, int cardId) {
         return game.getDmgOnCard(playerId,cardId);
    }

    @Override
    public void moveCardFromGraveyardToPlayerHand(int playerId, int cardId) {
        game.moveCardFromGraveyardToPlayerHand(playerId,cardId);
    }


}
