package cardmastergame.service;

import cardmastergame.FileUtils;
import cardmastergame.LogUtils;
import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Component
public class CardService {
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


    @Value("${game.trap.max}")
    private int MAX_TRAP;

    private Random rand = new Random();

    public int startNewGame(){
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

        int nbCards1 = loadStack(environnments, "/Back-Select");
        LogUtils.warn("Loaded " + nbCards1 + " environement");
        int nbCards2 = loadStack(invocations, "/Back-Select3");
        LogUtils.warn("Loaded " + nbCards2 + " invocations");
        int nbCards3 = loadStack(pioche, "/Back-Draw");
        LogUtils.warn("Loaded " + nbCards3 + " pioches");
        int nbCards4 = selectCurrentEnvironnement();
        LogUtils.warn("1 environnement selectionné ");
        return nbCards1+nbCards2+nbCards3+nbCards4;
    }

    private int selectCurrentEnvironnement() {
        int nombreAleatoire = getRandomPosition(environnments);
        currentEnvironnement.push(environnments.get(nombreAleatoire));
        return 1;
    }

    private int getRandomPosition(Deck<Card> stack) {
        return rand.nextInt(stack.size() );
    }



    public void moveCardFromDrawToPlayer(int player) {
            int randomPoition = getRandomPosition(pioche);
            mains[player].push( pioche.get(randomPoition));
            pioche.remove(randomPoition);
    }

    private int loadStack(Deck<Card> stack, String folder) {
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

    private Card findCardInStackById(Deck<Card> stack ,String deckName, int cardId) {
        for (Card c : stack){
            if(c.getId()== cardId){
                return c;
            }
        }

        throw new UnsupportedOperationException(" Card " + cardId +" not found in "+deckName);
    }

    public void moveSpecificCardFromInvocationToPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(invocations,"invocations", cardId);
        invocations.remove(c);
        mains[playerId].push(c);
    }

    public void moveCardFromHandToGameForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(mains[playerId],"main joueur " + playerId, cardId);
        mains[playerId].remove(c);
        plateaux[playerId].push(c);
    }

    public void moveCardFromHandToPiegeForPlayer(int playerId, int cardId) {
        if (pieges[playerId].size() < MAX_TRAP) {
            Card c = findCardInStackById(mains[playerId],"main joueur " + playerId, cardId);
            mains[playerId].remove(c);
            pieges[playerId].push(c);
        }
    }
    public void moveCardFromPiegeToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(pieges[playerId],"piege joueur " + playerId, cardId);
        pieges[playerId].remove(c);
        cimetieres[playerId].push(c);
    }


    public void moveCardFromGameToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(plateaux[playerId],"plateau joueur " + playerId ,cardId);
        cleanCard(c);
        plateaux[playerId].remove(c);
        cimetieres[playerId].push(c);
    }

    private void cleanCard(Card c) {
        c.setDammagePoints(0);
        c.setActivated(false);
        c.setUsed(false);
    }

    public void moveCardFromHandToGraveyardForPlayer(int playerId, int cardId) {
        Card c = findCardInStackById(mains[playerId],"main joueur " + playerId, cardId);
        cleanCard(c);
        mains[playerId].remove(c);
        cimetieres[playerId].push(c);
    }

    public int updateDmgPointsOnCard(int playerId, int cardId, int value) {
        findCardInStackById(plateaux[playerId],"plateaux joueur " + playerId,cardId).setDammagePoints(value);
        return value;
    }


    public int getDmgOnCard(int playerId, int cardId) {
        return  findCardInStackById(plateaux[playerId],"plateau joueur " + playerId,cardId).getDammagePoints();
    }

    public void moveCardFromGraveyardToPlayerHand(int playerId, int cardId) {
        Card c = findCardInStackById(cimetieres[playerId],"cimetière joueur " + playerId, cardId);
        cimetieres[playerId].remove(c);
        mains[playerId].push(c);
    }


    public void moveCardFromOtherGraveyardToHand(int playerId, int cardId, int oppPlayerId) {
        Card c = findCardInStackById(cimetieres[oppPlayerId],"cimetière joueur " + playerId, cardId);
        cimetieres[oppPlayerId].remove(c);
        mains[playerId].push(c);
    }

    public Map<Integer, Card> getAllCards() {
        return allCards;
    }

    public boolean updateActivatedOnCard(int playerId, int cardId, boolean value) {
        findCardInStackById(plateaux[playerId],"plateau joueur " + playerId,cardId).setActivated(value);
        return value;
    }

    public boolean getActivatedOnCard(int playerId, int cardId) {
        return findCardInStackById(plateaux[playerId],"plateau joueur " + playerId,cardId).isActivated();
    }

    public boolean updateUsedOnCard(int playerId, int cardId,boolean value) {
        findCardInStackById(plateaux[playerId],"plateau joueur " + playerId,cardId).setUsed(value);
        return value;
    }

    public boolean getUsedOnCard(int playerId, int cardId) {
        return  findCardInStackById(plateaux[playerId],"plateat joueur " + playerId,cardId).isUsed();
    }


    public void setAllcardsNonActive(int playerId) {
        for ( Card c : plateaux[playerId]) {
            c.setActivated(false);
        }
    }



    public Deck<Card> getStack(StackConstants stackName) {
        switch (stackName){
            case ENVIRONNEMENT:
                return currentEnvironnement;
            case ENVIRONNEMENTS:
                return environnments;
            case DRAW:
                return pioche;
            case INVOCATIONS:
                return invocations;
            case GRAVEYARD0:
                return cimetieres[0];
            case GRAVEYARD1:
                return cimetieres[1];
            case HAND0:
                return mains[0];
            case HAND1:
                return mains[1];
            case BOARD0:
                return plateaux[0];
            case BOARD1:
                return plateaux[1];
            case TRAP0:
                return pieges[0];
            case TRAP1:
                return pieges[1];
            default:
                throw new UnsupportedOperationException();
        }

    }
}
