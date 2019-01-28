package cardmastergame.bean;

import cardmastergame.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Random;

@Component
public class Game {
    private int lastIndex;
    private Map<Integer, Card> allCards;
    private Deck<Card> environnments;
    private Deck<Card> pioche;
    private Deck<Card> invocations;
    private Deck<Card>[] cimetieres;
    private Deck<Card>[] mains;
    private Deck<Card>[] plateaux;

    private Deck<Card>[] pieges;

    private Deck<Card> currentEnvironnement;
    private int[] pvs;
    private int[] chakras;

    @Value( "${game.chakra.max}" )
    private int MAX_CHAKRA;

    @Value( "${game.pv.max}" )
    private int MAX_PV;

    @Value("${game.trap.max}")
    private int MAX_TRAP;

    private Random rand = new Random();

    public void startNewGame(){
        lastIndex = 0;
        environnments = new Deck<>();
        currentEnvironnement = new Deck<>();
        pioche = new Deck<>();
        invocations = new Deck<>();
        cimetieres = new Deck[2];
        cimetieres[0] = new Deck<>();
        cimetieres[1] = new Deck<>();
        pieges = new Deck[2];
        pieges[0] = new Deck<>();
        pieges[1] = new Deck<>();
        mains = new Deck[2];
        mains[0] = new Deck<>();
        mains[1] = new Deck<>();
        plateaux = new Deck[2];
        plateaux[0] = new Deck<>();
        plateaux[1] = new Deck<>();
        allCards = new HashMap<>();
        pvs = new int[]{MAX_PV, MAX_PV};
        chakras = new int[] {0,0};
    }

    public int selectCurrentEnvironnement() {
        int nombreAleatoire = getRandomPosition(environnments);
        currentEnvironnement.push(environnments.get(nombreAleatoire));
        return 1;
    }

    private int getRandomPosition(Deck<Card> stack) {
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

    public int loadStack(Deck<Card> stack, String folder) {
        String prop = FileUtils.getCurrentJarPath();
        File path = new File(prop + folder);
        File[] listOfFiles = path.listFiles();
        for (File listOfFile : listOfFiles) {
            if (listOfFile.isFile()) {
                lastIndex++;
                Card c = new Card();
                c.setId(lastIndex);
                c.setPath(folder + "\\" + listOfFile.getName());
                allCards.put(c.getId(), c);
                stack.push(c);
            }
        }
        return listOfFiles.length;
    }

    private Card findCardInStackById(Deck<Card> stack , int cardId){
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

    public void moveCardFromHandToPiegeForPlayer(int playerId, int cardId) {
        if (pieges[playerId].size() < MAX_TRAP) {
            Card c = findCardInStackById(mains[playerId], cardId);
            mains[playerId].remove(c);
            pieges[playerId].push(c);
        }
    }
    public void moveCardFromPiegeToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(pieges[playerId], cardId);
        pieges[playerId].remove(c);
        cimetieres[playerId].push(c);
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

        chakras[playerId] = value;
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

    public Deck<Card> getEnvironnments() {
        return environnments;
    }

    public Deck<Card> getPioche() {
        return pioche;
    }

    public Deck<Card> getInvocations() {
        return invocations;
    }

    public Deck<Card>[] getCimetieres() {
        return cimetieres;
    }

    public Deck<Card>[] getMains() {
        return mains;
    }

    public Deck<Card>[] getPlateaux() {
        return plateaux;
    }

    public Deck<Card> getCurrentEnvironnement() {
        return currentEnvironnement;
    }

    public Deck<Card>[] getPieges() {
        return pieges;
    }

    public int getMaxChakra() {
        return MAX_CHAKRA;
    }
}
