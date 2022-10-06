import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { createItem } from "../../../store/itemSlice";

export default function ItemModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState(null);
  const dispatch = useDispatch();

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleOnChange = (e) => {
    console.log("In on chage",e.target.name);
    setName({ [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("In on click",name);
    dispatch(createItem(name));
    handleModal();
  };

  return (
    <div>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={handleModal}
      >
        Add Item
      </Button>

      <Modal isOpen={modalIsOpen} toggle={handleModal}>
        <ModalHeader toggle={handleModal}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={handleOnChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
