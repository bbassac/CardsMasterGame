package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.service.StackConstants;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(description = "Board API Used for all board actions")
public class BoardController extends AbstractController{

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/hand",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value="Hand of player",response = Deck.class)
    public Deck<Card> displayHand(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId) {

         return playerId == 0 ? cardService.getStack(StackConstants.HAND0) : cardService.getStack(StackConstants.HAND1);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Plateau  of player",response = Deck.class)
    public Deck<Card> displayBoard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId) {
        return playerId == 0 ? cardService.getStack(StackConstants.BOARD0) : cardService.getStack(StackConstants.BOARD1);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/newcard",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Pick a new card from pioche")
    public void pickNewCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId) {
        cardService.moveCardFromDrawToPlayer(playerId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/invocations/{cardId}",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Pick a specific card from invocations")
    public void pickNamedCardFromDraw(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId) {

        cardService.moveSpecificCardFromInvocationToPlayer(playerId,cardId);
    }


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Move a card from the hand of a player to the board")
    public void moveCardFromHandToGame(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId) {

        cardService.moveCardFromHandToGameForPlayer(playerId,cardId);
    }


}