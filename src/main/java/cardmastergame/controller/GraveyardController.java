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
@Api(name = "Graveyard API",description = "Used for all graveyard actions")
public class GraveyardController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/graveyard",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Cimetary of player")
    public Stack<Card> cimetary(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
        return playerId == 0 ? customRepo.getStack(StackConstants.GRAVEYARD0) : customRepo.getStack(StackConstants.GRAVEYARD1);

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
    @RequestMapping(path = "/player/{playerId}/graveyard/{cardId}",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Move a card from the graveyard of a player to the hand")
    public void moveCardFromGraveyardToHand(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                                            @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId) throws IOException {
        customRepo.moveCardFromGraveyardToPlayerHand(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/opponent/{oppPlayerId}/graveyard/{cardId}/player/{playerId}",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Move a card from the graveyard of a player to the hand")
    public void moveCardFromOtherGraveyardToHand(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                                                 @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId,
                                                 @ApiPathParam(description = "The opponent player ID", allowedvalues = "0,1") @PathVariable("oppPlayerId") int oppPlayerId) throws IOException {
        customRepo.moveCardFromOtherGraveyardToHand(playerId,cardId,oppPlayerId);
    }
}
