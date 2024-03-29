import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from "reactstrap";
import { changeErrorState, register } from "../../../store/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  let isError = useSelector((state) => state.auth.isError);

  const dispatch = useDispatch();

  useEffect(() => {
    if(isError){
      toast.error("There are some errors in your form submission");
      dispatch(changeErrorState());
    }
  }, [isError]);

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleOnChangeName = (e) => {
    setName(e.target.value );
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value );
  };

  const handleOnChangePassword = (e) => {
    setPassword( e.target.value );
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const registrationRequest = {
      name,
      email,
      password,
    };

    dispatch(register(registrationRequest));
    handleModal();
  };

  return (
    <div>
      <NavLink onClick={handleModal} href="#">
        Register
      </NavLink>

      <Modal isOpen={modalIsOpen} toggle={handleModal}>
        <ModalHeader toggle={handleModal}>Registration Form</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={handleOnChangeName}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={handleOnChangeEmail}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={handleOnChangePassword}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <ToastContainer/>
    </div>
  );
}
