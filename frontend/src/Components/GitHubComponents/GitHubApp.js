import React, {useEffect, useState} from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, Container ,Row, Col,Modal,ListGroup,ListGroupItem,Alert ,Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'




class GitHubApp extends React.Component{
    // const [repos, setRepos] = useState([]);
    // const [count, setCount] = useState("");
    // const [smShow, setSmShow] = useState(false);
    // const [repoName, setRepoName] = useState("");
    // const [description, setDescription] = useState("");
    // const [type, setType] = useState(false);

    constructor(props) {
        super(props);
        this.createRepo = this.createRepo.bind(this);
        this.state = {
            repos :[],
            name:"",
            smShow: false,
            repoName:"",
            description: "",
            type:false,
            error:"",



        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/github/get_user_data").then(res => {
            console.log(res)
            this.setState({name: res.data.newBody.name,repos:res.data.allRepo})
            // setRepos(res.data.allRepo)
        })
    }

    //
    // const [repo , setRepo] = useState({
    //     repoName: '',
    //     description: '',
    //     type: false
    // })

    // useEffect(() => {
    //     axios.get("http://localhost:5000/github/get_user_data").then(res => {
    //         console.log(res)
    //         setCount(res.data.newBody.name)
    //         setRepos(res.data.allRepo)
    //     })
    // })

   createRepo(){


       const details ={
            "name" : this.state.repoName,
           "description" : this.state.description,
           "private" : this.state.type
       }
       axios.post("http://localhost:5000/github/create_repo",details).then(res =>{

           // const Body = JSON.parse(res)
               console.log(res.data.statusCode)
           if (res.data.statusCode===400){
               this.setState({error:"Cannot Create Repository"})
           }else{

               axios.get("http://localhost:5000/github/get_user_data").then(res => {
                   console.log(res)
                   this.setState({name: res.data.newBody.name,repos:res.data.allRepo})
                   // setRepos(res.data.allRepo)
               })

               this.setState({smShow:false,error:""})

           }




       }


       );



    }
    render() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Github Center</Navbar.Brand>
                    {/*<Navbar.Brand>*/}

                    {/*    <img  width='10%' height='10%' src={gitLogo}/>*/}

                    {/*</Navbar.Brand>*/}
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#home">{`Hello ${this.state.name}`}</Nav.Link>
                        {/*<Nav.Link href="#features">Features</Nav.Link>*/}
                        {/*<Nav.Link href="#pricing">Pricing</Nav.Link>*/}
                    </Nav>
                </Container>
            </Navbar>

            <br/>


            <Container>
                <Row >
                    <Col xs={3} >

                    </Col>
                    <Col xs={6}>
                        <Alert  variant={"dark"}>
                           <h2  > Your All Github Repositories</h2>
                        </Alert>
                        <ListGroup>
                            {
                                this.state.repos.map(repo=>(
                                <ListGroupItem  key={repo}>
                                {repo.name}
                                </ListGroupItem>

                                    )
                                )
                            }

                        </ListGroup>


                    </Col>
                    <Col xs={3} >
                        <Button variant="success" onClick={() => this.setState({smShow:true})}>+ Create New Repo</Button>
                    </Col>
                </Row>
            </Container>



            <Modal
                size="sm"
                show={this.state.smShow}
                onHide={() => {
                    this.setState({
                        smShow:false,
                        type:false,
                        description:"",
                        repoName:""

                    })
                    // setSmShow(false)
                    // setType(false)
                    // setDescription("")
                    // setRepoName("")
                }}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Create a Repository
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                    <Form >

                        <Form.Group className="mb-3" >
                            <Form.Label>Enter Repo Name</Form.Label>
                            <Form.Control onChange={event => this.setState({ repoName:event.target.value})}  type="text" placeholder="Enter Repo Name" />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={event => this.setState({ description:event.target.value})}  as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check onChange={event => {
                                if (event.target.checked) this.setState({ type:true})
                                else this.setState({ type:false})
                            }} type="checkbox" label="Private" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Text className="text-muted" color="#FF0000" >
                                {this.state.error}
                            </Form.Text>

                        </Form.Group>
                        <Button variant="success" onClick={this.createRepo} >
                            Create Repo
                        </Button>

                    </Form>

                    </form>
                </Modal.Body>
            </Modal>


        </div>
    )
    }
}

export default GitHubApp
