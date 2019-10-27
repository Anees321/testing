import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from 'react-loader-advanced';
import { Loader as LoaderAnim } from 'react-loaders';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import ListRow from './list';
import ListRow1 from './list2';
import Pagination from '../../../assets/utils/pagination';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle, Container,
    ListGroupItem, ListGroup,
    InputGroup, InputGroupAddon, CardHeader, CustomInput, CardFooter,
} from 'reactstrap';
import JwPagination from 'jw-react-pagination';


const contentBoxStyle = {
    backgroundColor: 'white',
    position: 'relative',
    padding: 20,
    border: '1px solid lightgrey',
    borderRadius: '5px',
    height: '500px'
};

export default class Party extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            compcode: 100,
            flag: 1,
            partycde: '0',
            Search: '',
            party: [],
            partyByID: [],
            loader: true,
            message: '',
            SearchText: '0',
            currentPage: 1,
            totalPages: null,
            totalRecords: null,
            partyBindbyID: false,
            isDisabled: false
        };
    }
    componentDidMount() {
        //function changed to OnPageChanged with PageNo 1 -- BY AS
        this.callService(0, this.state.compcode, this.state.flag, '0', '0');
    }

    callService(pageNo, compcode, flag, partycde, Search) {
        fetch('http://orbitserp.oracleapexservices.com/apex/sh1red61/party/' + compcode + '/' + flag + '/' + partycde + '/' + Search + '?page=' + pageNo)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    party: json.items,
                    loader: false,
                    totalRecords: json.items[0]
                })
            })
    }

    onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
        console.log(currentPage);
        this.setState({ currentPage: data.currentPage });
        var flag = 2;
        var SearchValue = this.state.Search;
        if (this.state.Search == '') {
            var flag = 1;
            var SearchValue = '0';
        }

        this.callService(data.currentPage - 1, this.state.compcode, flag, '0', SearchValue);
    }

    callbackFunction = (childData) => {
        this.setState({ message: childData, partyBindbyID: false })
        console.log(this.state.currentPage - 1);
        this.fuc(childData);
    }

    Search = (e) => {
        var flag = 2;
        var SearchValue = this.state.Search;
        this.setState({ partyBindbyID: false });
        if (this.state.Search == '') {
            var flag = 1;
            var SearchValue = '0';
        }
        this.callService(0, this.state.compcode, flag, '0', SearchValue);
    }

    listRow1() {
        return (
            <ListRow1 parentCallback={this.callbackFunction} party={this.state.party}></ListRow1>
        );

    }
    fuc(id) {
        var partyByID = this.state.party.filter(l => {
            return l.partycde.match(id);
        });
        if (partyByID.length > 0) {

            this.setState({
                isDisabled: true,
                PRTYNAME: partyByID[0].prtyname,
                PARTYAD1: partyByID[0].partyad1,
                PARTYAD2: partyByID[0].partyad2,
                PARTYAD3: partyByID[0].partyad3,
                PARTYAD4: partyByID[0].partyad4,
                PHONENUM: partyByID[0].phonenum,
                MOBILENO: partyByID[0].mobileno,
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    Edit() {
        this.clearControls();
        this.setState({
            isDisabled: false,
        });
    }
    clearControls = () => {
        this.setState({
            PRTYNAME: '',
            PARTYAD1: '',
            PARTYAD2: '',
            PARTYAD3: '',
            PARTYAD4: '',
            PHONENUM: '',
            MOBILENO: '',
        })
    }

    render() {
        var { isLoaded, party, loader } = this.state;
        const spinner3 = <LoaderAnim color="#ffffff" type="line-scale-pulse-out" />;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Container fluid>

                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle></CardTitle>
                                <Row>
                                    <Col md="4">
                                        <Form>
                                            <FormGroup>
                                                <InputGroup>
                                                    <Input type="text" name="Search" onChange={this.handleChange} value={this.state.Search}
                                                        placeholder="Search Employee" />
                                                    <InputGroupAddon addonType="append">
                                                        <Button color="secondary" onClick={this.Search}>Search</Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormGroup>
                                        </Form>
                                        {(isLoaded && this.state.party.length > 0) && (
                                            <Fragment>
                                                <ListGroup className="mt-3 todo-list-wrapper list-group ">
                                                    {this.listRow1()}
                                                </ListGroup>

                                                <br />
                                                <Col md={{ size: 10, offset: 1 }}>
                                                    <div className="d-flex flex-row py-4 align-items-center">
                                                        <Pagination totalRecords={this.state.party[0].cnt} pageLimit={5} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                                                    </div>
                                                </Col>
                                            </Fragment>
                                        )}
                                    </Col>
                                    <Col md="8">
                                        <Row>
                                            <Col md="8"></Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    <Button className="mb-2 mr-2 btn-square" color="info">Create</Button>
                                                    <Button className="mb-2 mr-2 btn-square" onClick={() => this.Edit()} color="primary">Edit</Button>
                                                    <Button className="mb-2 mr-2 btn-square" color="warning">Delete</Button>
                                                    <Button className="mb-2 mr-2 btn-square" color="success">Cancel</Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Card className="main-card mb-3">
                                            <CardBody>
                                                <AvForm>
                                                    <Row>
                                                        <Col md="6">
                                                            <AvGroup>
                                                                <Label for="PRTYNAME">Party Name</Label>
                                                                <AvInput name="PRTYNAME" disabled={this.state.isDisabled} value={this.state.PRTYNAME} id="PRTYNAME" required />
                                                                <AvFeedback>Party Name is required!</AvFeedback>
                                                            </AvGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <AvGroup>
                                                                <AvField type="select" name="PARTYCDE" disabled={this.state.isDisabled} value={this.state.PARTYAD1} label="Party Type">
                                                                    <option>1</option>
                                                                    <option>2</option>
                                                                    <option>3</option>
                                                                    <option>4</option>
                                                                    <option>5</option>
                                                                </AvField>
                                                            </AvGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="6">
                                                            <AvGroup>
                                                                <Label for="PARTYAD1">Address 1</Label>
                                                                <AvInput name="PARTYAD1" id="PARTYAD1" disabled={this.state.isDisabled} value={this.state.PARTYAD1} required />
                                                                <AvFeedback>Party Address 1 is required!</AvFeedback>
                                                            </AvGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <AvGroup>
                                                                <Label for="PARTYAD2">Address 2</Label>
                                                                <AvInput name="PARTYAD2" id="PARTYAD2" disabled={this.state.isDisabled} value={this.state.PARTYAD2} required />
                                                                <AvFeedback>Party Address 2 is required!</AvFeedback>
                                                            </AvGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="6">
                                                            <AvGroup>
                                                                <Label for="PARTYAD3">City</Label>
                                                                <AvInput name="PARTYAD3" disabled={this.state.isDisabled} value={this.state.PARTYAD3} id="PARTYAD3" />
                                                            </AvGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <AvGroup>
                                                                <Label for="PARTYAD3">State</Label>
                                                                <AvInput name="PARTYAD4" disabled={this.state.isDisabled} value={this.state.PARTYAD4} id="PARTYAD4" />
                                                            </AvGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="6">
                                                            <AvGroup>
                                                                <Label for="PHONENUM">Phone No</Label>
                                                                <AvInput name="PHONENUM" disabled={this.state.isDisabled} value={this.state.PHONENUM} id="PHONENUM" />
                                                            </AvGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <AvGroup>
                                                                <Label for="MOBILENO">Mobile No</Label>
                                                                <AvInput name="MOBILENO" disabled={this.state.isDisabled} value={this.state.MOBILENO} id="PHONENUM" />
                                                            </AvGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <AvGroup>
                                                                <Label for="NOTES">Notes</Label>
                                                                <AvInput name="NOTES" disabled={this.state.isDisabled} id="NOTES" />
                                                            </AvGroup>
                                                        </Col>
                                                    </Row>
                                                </AvForm>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Container>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}