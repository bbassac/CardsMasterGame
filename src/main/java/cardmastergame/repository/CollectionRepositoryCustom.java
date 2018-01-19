package cardmastergame.repository;

import cardmastergame.bean.StackConstants;
import cardmastergame.bean.Card;

import java.util.Stack;

/**
 * Created by b.bassac on 24/05/2016.
 */
public interface CollectionRepositoryCustom {


    void startNewGame();

    Stack<Card> getStack(StackConstants stackName);

    String getCardById(Integer id);

    void pickCardFromStackToPlayer(StackConstants stackName, int player);
}