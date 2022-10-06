import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import AppNavbar from "../src/components/app-navbar/AppNavbar";
import ItemModal from "../src/components/item-modal/ItemModal";
import ShoppingList from "../src/components/shopping-list/ShoppingList";

export default function Index() {
  return (
    <>
      <AppNavbar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </>
  );
}
