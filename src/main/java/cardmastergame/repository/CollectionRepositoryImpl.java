package cardmastergame.repository;

import cardmastergame.LogUtils;
import cardmastergame.bean.AffiniteManager;
import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.bean.Game;
import cardmastergame.bean.StackConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;



/**
 * Created by b.bassac on 24/05/2016.
 */
@Repository

public class CollectionRepositoryImpl implements CollectionRepositoryCustom {

    @Autowired
    Game game;

    @Override
    public int startNewGame() {
        game.startNewGame();

        int nbCards1 = game.loadStack(game.getEnvironnments(), "/Back-Select");
        LogUtils.warn("Loaded " + nbCards1 + " environement");
        int nbCards2 = game.loadStack(game.getInvocations(), "/Back-Select3");
        LogUtils.warn("Loaded " + nbCards2 + " invocations");
        int nbCards3 = game.loadStack(game.getPioche(), "/Back-Draw");
        LogUtils.warn("Loaded " + nbCards3 + " pioches");
        int nbCards4 = game.selectCurrentEnvironnement();
        LogUtils.warn("1 environnement selectionné ");
        return nbCards1+nbCards2+nbCards3+nbCards4;
    }



    @Override
    public Deck<Card> getStack(StackConstants stackName) {
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
            case TRAP0:
                return game.getPieges()[0];
            case TRAP1:
                return game.getPieges()[1];
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
    public String getExtra(int playerId) {
        return game.getExtra(playerId);
    }

    @Override
    public String updateExtra(int playerId, String value) {
        return game.updateExtra(playerId,value);
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

    @Override
    public boolean updateActivatedOnCard(int playerId, int cardId, boolean value) {
       return game.updateActivatedOnCard(playerId,cardId,value);
    }

    @Override
    public boolean getActivatedOnCard(int playerId, int cardId) {
        return game.getActivatedOnCard(playerId,cardId);
    }

    @Override
    public void moveCardFromOtherGraveyardToHand(int playerId, int cardId, int oppPlayerId) {
        game.moveCardFromOtherGraveyardToHand(playerId,cardId,oppPlayerId);
    }

    @Override
    public void moveCardFromHandToTrapForPlayer(int playerId, int cardId) {
        game.moveCardFromHandToPiegeForPlayer(playerId,cardId);
    }

    @Override
    public void moveCardFromTrapToGraveyard(int playerId, int cardId) {
        game.moveCardFromPiegeToGraveyardForPlayer(playerId,cardId);
    }

    @Override
    public int getMaxChakra() {
        return game.getMaxChakra();
    }

    @Override
    public void moveCardFromHandToGraveyardForPlayer(int playerId, int cardId) {
        game.moveCardFromHandToGraveyardForPlayer(playerId,  cardId);
    }

    @Override
    public boolean updateUsedOnCard(int playerId, int cardId, boolean value) {
        return game.updateUsedOnCard(playerId,cardId,value);
    }

    @Override
    public boolean getUsedOnCard(int playerId, int cardId) {
        return game.getUsedOnCard(playerId,cardId);
    }

    @Override
    public void setAllcardsNonActive(int playerId) {
        game.setAllcardsNonActive(playerId);
    }

    @Override
    public Card getAffinite(int playerId) {
        return game.getAffinite(playerId);
    }


}
