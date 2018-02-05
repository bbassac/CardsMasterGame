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
@Api(name = "Player API",description = "Used for all player actions")
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

}
