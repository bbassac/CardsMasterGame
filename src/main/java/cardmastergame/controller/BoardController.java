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
@Api(name = "Board API",description = "Used for all board actions")
public class BoardController extends AbstractController{

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/hand",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Hand of player")
    public Stack<Card> displayHand(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
         return playerId == 0 ? customRepo.getStack(StackConstants.HAND0) : customRepo.getStack(StackConstants.HAND1);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Plateau  of player")
    public Stack<Card> displayBoard(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
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


}