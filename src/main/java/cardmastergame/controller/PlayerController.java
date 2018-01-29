package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.StackConstants;
import org.jsondoc.core.annotation.Api;
import org.jsondoc.core.annotation.ApiMethod;
import org.jsondoc.core.annotation.ApiPathParam;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Stack;

@RestController
@Api(name = "Player API",description = "Player Centered Api")
public class PlayerController extends AbstractController{



    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/pvs",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Get Amount of PV of player")
    public int pvs(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
        return customRepo.getPlayerPvs(playerId);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/pvs/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiMethod(description = "Update Amount of PV of player")
    public int updatePlayerPvs(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                               @ApiPathParam(description = "new pv value", allowedvalues = "0-20") @PathVariable("value") int value) throws IOException {
        customRepo.updatePlayerPvs(playerId,value);
        return customRepo.getPlayerPvs(playerId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/chakra",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Get Amount of chakra of player")
    public int getChakra(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
        return customRepo.getChakras(playerId);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/chakra/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiMethod(description = "Update Amount of chakras of player")
    public int updateChakras(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                               @ApiPathParam(description = "new chakra value", allowedvalues = "0-20") @PathVariable("value") int value) throws IOException {
        return customRepo.updateChakras(playerId,value);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/hand",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Hand of player")
    public Stack<Card> hand(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
         return playerId == 0 ? customRepo.getStack(StackConstants.HAND0) : customRepo.getStack(StackConstants.HAND1);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/graveyard",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Cimetary of player")
    public Stack<Card> cimetary(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
        return playerId == 0 ? customRepo.getStack(StackConstants.GRAVEYARD0) : customRepo.getStack(StackConstants.GRAVEYARD1);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Plateau  of player")
    public Stack<Card> plateau(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
        return playerId == 0 ? customRepo.getStack(StackConstants.BOARD0) : customRepo.getStack(StackConstants.BOARD1);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/newcard",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Pick a new card from pioche")
    public void pickNewCard(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
       customRepo.moveCardFromDrawToPlayer(playerId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/invocations/{cardId}",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Pick a specific card from invocations")
    public void pickNamedCardFromDraw(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                                      @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId) throws IOException {

        customRepo.moveSpecificCardFromInvocationToPlayer(playerId,cardId);
    }


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiMethod(description = "Move a card from the hand of a player to the board")
    public void moveCardFromHandToGame(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                                       @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId) throws IOException {
       customRepo.moveCardFromHandToGameForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/graveyard/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiMethod(description = "Move a card from the board of a player to the graveyard")
    public void moveCardFromGameToGraveyard(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                                       @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId) throws IOException {
        customRepo.moveCardFromGameToGraveyardForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/dmg/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiMethod(description = "Move a card from the hand of a player to the board")
    public int updateDMGOnCard(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                               @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId,
                               @ApiPathParam(description = "New dmg counter", allowedvalues = "int") @PathVariable("value") int value) throws IOException {
        return customRepo.updateDmgPointsOnCard(playerId,cardId,value);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/dmg",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Move a card from the hand of a player to the board")
    public int getDMGOnCard(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                               @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId) throws IOException {
        return customRepo.getDmgOnCard(playerId,cardId);
    }
}