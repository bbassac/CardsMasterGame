package cardmastergame.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.service.CardService;
import cardmastergame.service.PlayerService;
import cardmastergame.service.StackConstants;


/**
 * Created by b.bassac on 24/05/2016.
 */
@Repository

public class CollectionRepositoryImpl implements CollectionRepositoryCustom {

    @Autowired
    CardService cardService;

    @Autowired
    PlayerService playerService;

    @Override
    public int startNewGame() {
        playerService.startNewGame();
        return cardService.startNewGame();
    }

    @Override
    public Deck<Card> getStack(StackConstants stackName) {
       return cardService.getStack(stackName);
    }

    @Override
    public String getCardById(Integer id) {
        return cardService.getAllCards().get(id).getPath();
    }

    @Override
    public void moveCardFromDrawToPlayer(int player) {
       cardService.moveCardFromDrawToPlayer(player);
    }

    @Override
    public void updatePlayerPvs(int player, int newPvs) {
        playerService.updatePlayerPvs(player,newPvs);
    }

    @Override
    public String getExtra(int playerId) {
        return playerService.getExtra(playerId);
    }

    @Override
    public String updateExtra(int playerId, String value) {
        return playerService.updateExtra(playerId,value);
    }

    @Override
    public int getPlayerPvs(int player) {
        return playerService.getPlayerPvs(player);
    }

    @Override
    public void moveSpecificCardFromInvocationToPlayer(int playerId, int cardId) {
        cardService.moveSpecificCardFromInvocationToPlayer(playerId,cardId);
    }

    @Override
    public void moveCardFromHandToGameForPlayer(int playerId, int cardId) {
        cardService.moveCardFromHandToGameForPlayer(playerId,cardId);
    }

    @Override
    public void moveCardFromGameToGraveyardForPlayer(int playerId, int cardId) {
        cardService.moveCardFromGameToGraveyardForPlayer(playerId,cardId);
    }

    @Override
    public int updateDmgPointsOnCard(int playerId, int cardId, int value) {
        return cardService.updateDmgPointsOnCard(playerId,cardId,value);
    }

    @Override
    public int getChakras(int playerId) {
        return playerService.getChakras(playerId);
    }

    @Override
    public int updateChakras(int playerId, int value) {
        return playerService.updateChakras(playerId,value);
    }

     @Override
    public int getDmgOnCard(int playerId, int cardId) {
         return cardService.getDmgOnCard(playerId,cardId);
    }

    @Override
    public void moveCardFromGraveyardToPlayerHand(int playerId, int cardId) {
        cardService.moveCardFromGraveyardToPlayerHand(playerId,cardId);
    }

    @Override
    public boolean updateActivatedOnCard(int playerId, int cardId, boolean value) {
       return cardService.updateActivatedOnCard(playerId,cardId,value);
    }

    @Override
    public boolean getActivatedOnCard(int playerId, int cardId) {
        return cardService.getActivatedOnCard(playerId,cardId);
    }

    @Override
    public void moveCardFromOtherGraveyardToHand(int playerId, int cardId, int oppPlayerId) {
        cardService.moveCardFromOtherGraveyardToHand(playerId,cardId,oppPlayerId);
    }

    @Override
    public void moveCardFromHandToTrapForPlayer(int playerId, int cardId) {
        cardService.moveCardFromHandToPiegeForPlayer(playerId,cardId);
    }

    @Override
    public void moveCardFromTrapToGraveyard(int playerId, int cardId) {
        cardService.moveCardFromPiegeToGraveyardForPlayer(playerId,cardId);
    }

    @Override
    public int getMaxChakra() {
        return playerService.getMaxChakra();
    }

    @Override
    public void moveCardFromHandToGraveyardForPlayer(int playerId, int cardId) {
        cardService.moveCardFromHandToGraveyardForPlayer(playerId,  cardId);
    }

    @Override
    public boolean updateUsedOnCard(int playerId, int cardId, boolean value) {
        return cardService.updateUsedOnCard(playerId,cardId,value);
    }

    @Override
    public boolean getUsedOnCard(int playerId, int cardId) {
        return cardService.getUsedOnCard(playerId,cardId);
    }

    @Override
    public void setAllcardsNonActive(int playerId) {
        cardService.setAllcardsNonActive(playerId);
    }

    @Override
    public Card getAffinite(int playerId) {
        return playerService.getAffinite(playerId);
    }

    @Override
    public void filterDraw(int playerId, List<String> result) {
        cardService.filterDraw(playerId,result);
    }


}
