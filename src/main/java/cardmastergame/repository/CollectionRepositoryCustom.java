package cardmastergame.repository;

import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.service.StackConstants;

import java.util.List;

/**
 * Created by b.bassac on 24/05/2016.
 */
public interface CollectionRepositoryCustom {

    /*CardService Zone*/
    int startNewGame();
    Deck<Card> getStack(StackConstants stackName);

    /*Player Zone*/
    int getChakras(int playerId);
    int updateChakras(int playerId, int value);

    int getMaxChakra();

    int getPlayerPvs(int player);
    void updatePlayerPvs(int player,int newPvs);

    String getExtra(int playerId);
    String updateExtra(int playerId, String value);

    /*Card Zone*/
    int updateDmgPointsOnCard(int playerId, int cardId, int value);

    int getDmgOnCard(int playerId, int cardId);

    String getCardById(Integer id);
    boolean updateActivatedOnCard(int playerId, int cardId, boolean value);

    boolean getActivatedOnCard(int playerId, int cardId);
    void moveCardFromOtherGraveyardToHand(int playerId, int cardId, int oppPlayerId);
    void moveCardFromDrawToPlayer(int player);
    void moveSpecificCardFromInvocationToPlayer(int playerId, int cardId);
    void moveCardFromHandToGameForPlayer(int playerId, int cardId);
    void moveCardFromGameToGraveyardForPlayer(int playerId, int cardId);
    void moveCardFromGraveyardToPlayerHand(int playerId, int cardId);
    void moveCardFromHandToTrapForPlayer(int playerId, int cardId);
    void moveCardFromTrapToGraveyard(int playerId, int cardId);

    void moveCardFromHandToGraveyardForPlayer(int playerId, int cardId);
    boolean updateUsedOnCard(int playerId, int cardId, boolean value);

    boolean getUsedOnCard(int playerId, int cardId);

    void setAllcardsNonActive(int playerId);

    Card getAffinite(int playerId);

    void filterDraw(int playerId, List<String> result);

    void moveCardFromHandToEquipmentForPlayer(int playerId, int cardId);

    void moveCardFromEquipmentToGraveyard(int playerId, int cardId);

    boolean updateActivatedOnEquipmentCard(int playerId, int cardId, boolean value);

    boolean updateUsedOnEquipmentCard(int playerId, int cardId, boolean value);

    boolean updateHiddendOnCard(int playerId, int cardId, boolean value);

    boolean updateStunedOnCard(int playerId, int cardId, boolean value);
}