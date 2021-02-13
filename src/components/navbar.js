import Navbar from 'react-bootstrap/Navbar';


export default function () {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">XMeme</Navbar.Brand>
            <div className="ml-auto">
                <Navbar.Text>Post your memes!</Navbar.Text>
            </div>
        </Navbar>
    );
}