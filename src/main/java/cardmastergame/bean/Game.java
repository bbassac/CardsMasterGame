package cardmastergame.bean;

import java.io.File;
import java.util.*;

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

    public Game(){
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
        pvs = new int[]{20,20};
    }


    public void selectCurrentEnvironnement() {
        int nombreAleatoire = getRandomPosition(environnments);
        currentEnvironnement.push(environnments.get(nombreAleatoire));
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
    public void loadStack(Stack<Card> stack, String folder) {
        String prop = System.getProperty("path");
        File path = new File(prop + folder);
        File[] listOfFiles = path.listFiles();
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                lastIndex++;
                Card c = new Card();
                c.setId(lastIndex);
                //c.setPath(listOfFiles[i].getAbsolutePath());
                c.setPath(folder+"\\"+listOfFiles[i].getName());
                allCards.put(c.getId(), c);
                stack.push(c);
            }
        }
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

    public Map<Integer, Card> getAllCards() {
        return allCards;
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
