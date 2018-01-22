package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.StackConstants;
import org.jsondoc.core.annotation.Api;
import org.jsondoc.core.annotation.ApiMethod;
import org.jsondoc.core.annotation.ApiPathParam;
import org.jsondoc.core.annotation.ApiResponseObject;
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
    public void updatePlayerPvs(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                               @ApiPathParam(description = "new pv value", allowedvalues = "0-20") @PathVariable("value") int value) throws IOException {
        customRepo.updatePlayerPvs(playerId,value);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/hand",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Hand of player")
    public Stack<Card> hand(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
         return playerId == 0 ? customRepo.getStack(StackConstants.MAIN0) : customRepo.getStack(StackConstants.MAIN1);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/cimetarry",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Cimetary of player")
    public Stack<Card> cimetary(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
        return playerId == 0 ? customRepo.getStack(StackConstants.CIMETIERE0) : customRepo.getStack(StackConstants.CIMETIERE1);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/plateau",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Plateau  of player")
    public Stack<Card> plateau(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
        return playerId == 0 ? customRepo.getStack(StackConstants.PLATEAU0) : customRepo.getStack(StackConstants.PLATEAU1);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/newcard",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "Pick a new card from pioche")
    public void pickNewCard(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
       customRepo.pickCardFromStackToPlayer(playerId);
    }


}