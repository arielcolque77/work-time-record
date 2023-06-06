import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";



export const NavbarMain = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href={`/`}>Control de Entrada / Salida</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={`/`}>Administrar</Nav.Link>
            <Nav.Link href={`/entrada`}>Entrada</Nav.Link>
            <Nav.Link href={`/salida`}>Salida</Nav.Link>
            <Nav.Link href={`/resumen`}>Resumen</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
