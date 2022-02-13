import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { addComment } from "../redux/ActionCreators";
import { Control, LocalForm} from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderDish({dish}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} value={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments,postComment,dishId}) {
        if(comments != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return(
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    class CommentForm extends Component {
        constructor(props){
            super(props);
            this.state = {
                isNavOpen: false,
                isModalOpen: false
            }

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
                isModalOpen:!this.state.isModalOpen
            })
        }

        handleSubmit(value){
            this.toggleModal();
            this.props.postComment(this.props.dishId, value.rating, value.author, value.comment)
        }

        render(){
            return(
                <div>
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>     
                            <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="control-group">
                                <Label htmlFor="rating" md={10}>
                                    Rating
                                </Label>
                                <Control.select
                                    model=".rating"
                                    className="form-control m-2"
                                    id="rating"
                                    name="rating"
                                    defaultValue="1"                                 
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row>
                                <Label htmlFor="author" md={10}>
                                    Your Name
                                </Label>
                                <Control.text
                                    model=".author"
                                    className="form-control m-2"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                ></Control.text>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="comment" md={10}>
                                    Comments
                                </Label>
                                <Control.textarea
                                    model=".comment"
                                    className="form-control m-2"
                                    id="comment"
                                    name="comment"
                                    rows="10"
                                ></Control.textarea>
                                <Button color="primary">Submit</Button>
                            </Row>
                            </LocalForm>                       
                        </ModalBody>                        
                    </Modal>
                </div>
            )
        }
    }

    const DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>                
            )
        }
        else if(props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>                    
                </div>
            )
        }else{
            return(
                <div></div>
            );
        }
    }


export default DishDetail;