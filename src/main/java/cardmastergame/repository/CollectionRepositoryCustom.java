package cardmastergame.repository;

import cardmastergame.bean.Card;

import java.io.IOException;
import java.util.Stack;

/**
 * Created by b.bassac on 24/05/2016.
 */
public interface CollectionRepositoryCustom {


    void startNewGame();

    Stack<Card> getStack(String stackName);

    String getCardById(Integer id);

    void pickCardFromStackToPlayer(String stackName, int player);
}