package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.service.StackConstants;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(description = "Graveyard API used for all interractions")
public class GraveyardController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/graveyard",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Retrieve the gravewward of player",response = Deck.class)
    public Deck<Card> cimetary(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId)  {
        return playerId == 0 ? cardService.getStack(StackConstants.GRAVEYARD0) : cardService.getStack(StackConstants.GRAVEYARD1);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/graveyard/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Move the card from CardService to Graveyard for the specified player")
    public void moveCardFromGameToGraveyard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId)  {
        cardService.moveCardFromGameToGraveyardForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/hand-to-graveyard/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Move the card from hand to Graveyard for the specified player")
    public void moveCardFromHandToGraveyard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId)  {
        cardService.moveCardFromHandToGraveyardForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/graveyard/{cardId}",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Move the card from Graveyard to the hand of the specified player")
    public void moveCardFromGraveyardToHand(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId)  {
        cardService.moveCardFromGraveyardToPlayerHand(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/opponent/{oppPlayerId}/graveyard/{cardId}/player/{playerId}",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Move the card from opponent Graveyard to the hand of the specified player")
    public void moveCardFromOtherGraveyardToHand(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId,

            @ApiParam(value = "Opponent Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("oppPlayerId") int oppPlayerId) {
        cardService.moveCardFromOtherGraveyardToHand(playerId,cardId,oppPlayerId);
    }
}
