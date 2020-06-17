package cardmastergame.service;

import cardmastergame.bean.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PlayerService {
    private int[] pvs;
    private int[] chakras;
    private String[] extraInfos;
    private Card[] affinite;

    @Value( "${game.chakra.max}" )
    private int MAX_CHAKRA;

    @Value( "${game.pv.max}" )
    private int MAX_PV;

    @Autowired
    AffiniteService affiniteService;

    public void startNewGame(){
        pvs = new int[]{MAX_PV, MAX_PV};
        chakras = new int[] {0,0};
        extraInfos = new String[] {"",""};
        affinite= affiniteService.initialize("/Back-Select2");
    }

    public void updatePlayerPvs(int playerId, int newPVs){
        pvs[playerId] = newPVs;
    }

    public int getPlayerPvs(int playerId){
        return pvs[playerId];
    }

    public String getExtra(int playerId) {
        return  extraInfos[playerId];
    }

    public String updateExtra(int playerId, String value) {
        extraInfos[playerId]=value;
        return value;
    }

    public int getChakras(int playerId) {
        return chakras[playerId];
    }

    public int updateChakras(int playerId, int value) {
        chakras[playerId] = value;
        return  chakras[playerId];
    }

    public int getMaxChakra() {
        return MAX_CHAKRA;
    }

    public Card getAffinite(int playerId) {
        return affinite[playerId];
    }

}
