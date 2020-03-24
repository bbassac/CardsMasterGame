package cardmastergame.repository;

import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.bean.StackConstants;

/**
 * Created by b.bassac on 24/05/2016.
 */
public interface CollectionRepositoryCustom {


    int startNewGame();

    Deck<Card> getStack(StackConstants stackName);

    String getCardById(Integer id);

    void moveCardFromDrawToPlayer(int player);

    void updatePlayerPvs(int player,int newPvs);

    int getPlayerPvs(int player);

    void moveSpecificCardFromInvocationToPlayer(int playerId, int cardId);

    void moveCardFromHandToGameForPlayer(int playerId, int cardId);

    void moveCardFromGameToGraveyardForPlayer(int playerId, int cardId);

    int updateDmgPointsOnCard(int playerId, int cardId, int value);

    int getChakras(int playerId);

    int updateChakras(int playerId, int value);

    int getDmgOnCard(int playerId, int cardId);

    void moveCardFromGraveyardToPlayerHand(int playerId, int cardId);

    boolean updateActivatedOnCard(int playerId, int cardId, boolean value);

    boolean getActivatedOnCard(int playerId, int cardId);

    void moveCardFromOtherGraveyardToHand(int playerId, int cardId, int oppPlayerId);

    void moveCardFromHandToTrapForPlayer(int playerId, int cardId);

    void moveCardFromTrapToGraveyard(int playerId, int cardId);

    int getMaxChakra();

    void moveCardFromHandToGraveyardForPlayer(int playerId, int cardId);
}