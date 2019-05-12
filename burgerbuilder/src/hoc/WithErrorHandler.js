import React, { Component } from "react";
import Aux from "./Auxiliary";
import Modal from "../components/UI/Modal/Modal";

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    };
    componentWillMount() {
      this.resInterceptor = axios.interceptors.response.use(null, error => {
        debugger;
        this.setState({
          error: error
        });
      });
      this.reqInterceptor = axios.interceptors.request.use(null, error => {
        this.setState({
          error: null
        });
      });
    }
    componentWillUnmount() {
      axios.interceptors.response.eject(this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
    }
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : ""}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default WithErrorHandler;
