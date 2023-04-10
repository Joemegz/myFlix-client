import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
   


    const [token] = useState(storedToken ? storedToken : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState("");

    let favoriteMovies = movies.filter(movie => user.favoriteMovies.includes(movie.id));
    
    const handleSubmit = event => {
        event.preventDefault();

        

// Show updated user on the profile
const getUser = (token) => {
    fetch(`https://myflix2023.herokuapp.com/users/${user.Username}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    }).then(response => response.json())
    .then((response) => {
      console.log("getUser response", response)
      setUsername(response.Username);
      setEmail(response.Email);
      setPassword(response.Password);
      setBirthday(response.Birthday);
      setFavoriteMovies(response.FavoriteMovies)
    })
  }

  useEffect(()=> {
    getUser(token);
  },[])

};
  //Deregister
    const deleteAccount = () => {
        console.log("working")
        fetch(`https://myflix2023.herokuapp.com/users/${username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                alert("Your account has been deleted. Good Bye!");
                onLoggedOut();
            } else {
                alert("Could not delete account");
            }
        })
        .catch(e => {
            alert(e);
        });
    }

   

    return (
        <>
            <Col md={6}>           
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        <Card.Title >User Info</Card.Title>
                        <p>Username: {username}</p>
                        <p>Email: {email}</p>
                        <p>Birthday: {birthday}</p>
                    </Card.Body>
                </Card>
                <Button variant="danger" onClick={() => {
                    if (confirm("Are you sure?")) {
                        deleteAccount();
                    }
                }}>Delete user account</Button>
            </Col>
            <Col md={6}>
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        <Card.Title>Update User</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    minLength="5"
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength="8"
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="bg-light"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBirthday">
                             <Form.Label>Birthday:</Form.Label>
                                 <Form.Control
                                    type="date"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    />
                            </Form.Group>

                            <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={12}>
                <h3 className="mt-3 mb-3 text-light">Your favorite movies:</h3>
                </Col>
            {favoriteMovies.map(movie => (
                <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </>
    );
}
