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
@Api(name = "Card API",description = "Used for all Card actions")
public class CardController extends AbstractController{




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

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/activated/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiMethod(description = "Move a card from the hand of a player to the board")
    public boolean updateActivatedOnCard(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                               @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId,
                               @ApiPathParam(description = "activated", allowedvalues = "boolean") @PathVariable("value") boolean value) throws IOException {
        return customRepo.updateActivatedOnCard(playerId,cardId,value);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/activated",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Move a card from the hand of a player to the board")
    public boolean getActivatedOnCard(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                            @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId) throws IOException {
        return customRepo.getActivatedOnCard(playerId,cardId);
    }

}