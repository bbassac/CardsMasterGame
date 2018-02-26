package cardmastergame.bean;

import cardmastergame.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.*;

@Component
public class Game {
    private int lastIndex;
    private Map<Integer, Card> allCards;
    private Stack<Card> environnments;
    private Stack<Card> pioche;
    private Stack<Card> invocations;
    private Stack<Card>[] cimetieres;
    private Stack<Card>[] mains;
    private Stack<Card>[] plateaux;
    private Stack<Card> currentEnvironnement;
    private int[] pvs;
    private int[] chakras;

    @Value( "${game.chakra.max}" )
    private int MAX_CHAKRA;

    @Value( "${game.pv.max}" )
    private int MAX_PV;

    public void startNewGame(){
        lastIndex = 0;
        environnments = new Stack<>();
        currentEnvironnement = new Stack<>();
        pioche = new Stack<>();
        invocations = new Stack<>();
        cimetieres = new Stack[2];
        cimetieres[0] = new Stack<>();
        cimetieres[1] = new Stack<>();
        mains = new Stack[2];
        mains[0] = new Stack<>();
        mains[1] = new Stack<>();
        plateaux = new Stack[2];
        plateaux[0] = new Stack<>();
        plateaux[1] = new Stack<>();
        allCards = new HashMap<>();
        pvs = new int[]{MAX_PV, MAX_PV};
        chakras = new int[] {0,0};
    }

    public int selectCurrentEnvironnement() {
        int nombreAleatoire = getRandomPosition(environnments);
        currentEnvironnement.push(environnments.get(nombreAleatoire));
        return 1;
    }

    private int getRandomPosition(Stack<Card> stack) {
        Random rand = new Random();
        return rand.nextInt(stack.size() );
    }

    public void updatePlayerPvs(int playerId, int newPVs){
        pvs[playerId] = newPVs;
    }

    public int getPlayerPvs(int playerId){
        return pvs[playerId];
    }

    public void moveCardFromDrawToPlayer(int player) {
            int randomPoition = getRandomPosition(pioche);
            mains[player].push( pioche.get(randomPoition));
            pioche.remove(randomPoition);
    }

    public int loadStack(Stack<Card> stack, String folder) {
        String prop = FileUtils.getCurrentJarPath();
        File path = new File(prop + folder);
        File[] listOfFiles = path.listFiles();
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                lastIndex++;
                Card c = new Card();
                c.setId(lastIndex);
                c.setPath(folder+"\\"+listOfFiles[i].getName());
                allCards.put(c.getId(), c);
                stack.push(c);
            }
        }
        return listOfFiles.length;
    }

    private Card findCardInStackById(Stack<Card> stack , int cardId){
        for (Card c : stack){
            if(c.getId()== cardId){
                return c;
            }
        }
        throw new NoSuchElementException();
    }

    public void moveSpecificCardFromInvocationToPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(invocations, cardId);
        invocations.remove(c);
        mains[playerId].push(c);
    }

    public void moveCardFromHandToGameForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(mains[playerId], cardId);
        mains[playerId].remove(c);
        plateaux[playerId].push(c);
    }

    public void moveCardFromGameToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(plateaux[playerId], cardId);
        plateaux[playerId].remove(c);
        cimetieres[playerId].push(c);
    }

    public int updateDmgPointsOnCard(int playerId, int cardId, int value) {
        findCardInStackById(plateaux[playerId],cardId).setDammagePoints(value);
        return value;
    }

    public int getChakras(int playerId) {
        return chakras[playerId];
    }

    public int updateChakras(int playerId, int value) {
        if(value<= MAX_CHAKRA) {
            chakras[playerId] = value;
        }
        return  chakras[playerId];
    }

    public int getDmgOnCard(int playerId, int cardId) {
        return  findCardInStackById(plateaux[playerId],cardId).getDammagePoints();
    }

    public void moveCardFromGraveyardToPlayerHand(int playerId, int cardId) {
        Card c = findCardInStackById(cimetieres[playerId], cardId);
        cimetieres[playerId].remove(c);
        mains[playerId].push(c);
    }

    public void moveCardFromOtherGraveyardToHand(int playerId, int cardId, int oppPlayerId) {
        Card c = findCardInStackById(cimetieres[oppPlayerId], cardId);
        cimetieres[oppPlayerId].remove(c);
        mains[playerId].push(c);
    }

    public Map<Integer, Card> getAllCards() {
        return allCards;
    }

    public boolean updateActivatedOnCard(int playerId, int cardId, boolean value) {
        findCardInStackById(plateaux[playerId],cardId).setActivated(value);
        return value;
    }

    public boolean getActivatedOnCard(int playerId, int cardId) {
        return findCardInStackById(plateaux[playerId],cardId).isActivated();
    }

    public void setAllCards(Map<Integer, Card> allCards) {
        this.allCards = allCards;
    }

    public Stack<Card> getEnvironnments() {
        return environnments;
    }

    public void setEnvironnments(Stack<Card> environnments) {
        this.environnments = environnments;
    }

    public Stack<Card> getPioche() {
        return pioche;
    }

    public void setPioche(Stack<Card> pioche) {
        this.pioche = pioche;
    }

    public Stack<Card> getInvocations() {
        return invocations;
    }

    public void setInvocations(Stack<Card> invocations) {
        this.invocations = invocations;
    }

    public Stack<Card>[] getCimetieres() {
        return cimetieres;
    }

    public void setCimetieres(Stack<Card>[] cimetieres) {
        this.cimetieres = cimetieres;
    }

    public Stack<Card>[] getMains() {
        return mains;
    }

    public void setMains(Stack<Card>[] mains) {
        this.mains = mains;
    }

    public Stack<Card>[] getPlateaux() {
        return plateaux;
    }

    public void setPlateaux(Stack<Card>[] plateaux) {
        this.plateaux = plateaux;
    }

    public Stack<Card> getCurrentEnvironnement() {
        return currentEnvironnement;
    }

    public void setCurrentEnvironnement(Stack<Card> currentEnvironnement) {
        this.currentEnvironnement = currentEnvironnement;
    }


}
