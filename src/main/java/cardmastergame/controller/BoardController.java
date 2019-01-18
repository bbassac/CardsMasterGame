package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.StackConstants;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Stack;

@RestController
@Api(value = "Board API",description = "Used for all board actions")
public class BoardController extends AbstractController{

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/hand",method = RequestMethod.GET)
    @ResponseBody
   
    @ApiOperation(value="Hand of player",response = Stack.class)
    public Stack<Card> displayHand( @PathVariable("playerId") int playerId) throws IOException {
         return playerId == 0 ? customRepo.getStack(StackConstants.HAND0) : customRepo.getStack(StackConstants.HAND1);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Plateau  of player")
    public Stack<Card> displayBoard( @PathVariable("playerId") int playerId) throws IOException {
        return playerId == 0 ? customRepo.getStack(StackConstants.BOARD0) : customRepo.getStack(StackConstants.BOARD1);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/newcard",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Pick a new card from pioche")
    public void pickNewCard(@PathVariable("playerId") int playerId) throws IOException {
       customRepo.moveCardFromDrawToPlayer(playerId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/invocations/{cardId}",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Pick a specific card from invocations")
    public void pickNamedCardFromDraw(@PathVariable("playerId") int playerId,
                                       @PathVariable("cardId") int cardId) throws IOException {

        customRepo.moveSpecificCardFromInvocationToPlayer(playerId,cardId);
    }


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Move a card from the hand of a player to the board")
    public void moveCardFromHandToGame( @PathVariable("playerId") int playerId,
                                        @PathVariable("cardId") int cardId) throws IOException {
       customRepo.moveCardFromHandToGameForPlayer(playerId,cardId);
    }


}