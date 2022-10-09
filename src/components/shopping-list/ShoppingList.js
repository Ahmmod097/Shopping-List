import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { deleteItem, getItems } from "../../../store/itemSlice";

export default function ShoppingList() {
  let items = useSelector((state) => state.item.items);
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {}, [isAuthenticated]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);

  const handleDeleteItems = (name) => {
    dispatch(deleteItem(name));
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      handleDeleteItems(name);
                    }}
                  >
                    &times;
                  </Button>
                ) : null}

                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}
